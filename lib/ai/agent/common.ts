import {
  convertToModelMessages,
  createUIMessageStream,
  smoothStream,
  stepCountIs,
  streamText,
  type LanguageModelUsage,
  type UIMessageStreamWriter,
} from "ai";
import type { Session } from "next-auth";
import { unstable_cache as cache } from "next/cache";
import type { ModelCatalog } from "tokenlens/core";
import { fetchModels } from "tokenlens/fetch";
import { getUsage } from "tokenlens/helpers";

import type { ChatModel } from "@/lib/ai/models";
import { type RequestHints, systemPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { createDocument } from "@/lib/ai/tools/create-document";
import { getWeather } from "@/lib/ai/tools/get-weather";
import { requestSuggestions } from "@/lib/ai/tools/request-suggestions";
import { updateDocument } from "@/lib/ai/tools/update-document";
import { isProductionEnvironment } from "@/lib/constants";
import { classifyMessages } from "@/lib/ai/agent/classify";
import { createMockInterviewStream } from "@/lib/ai/agent/mock-interview";
import { createResumeOptStream } from "@/lib/ai/agent/resume-opt";
import { saveMessages, updateChatLastContextById } from "@/lib/db/queries";
import type { AppUsage } from "@/lib/usage";
import { generateUUID } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

export const getTokenlensCatalog = cache(
  async (): Promise<ModelCatalog | undefined> => {
    try {
      return await fetchModels();
    } catch (err) {
      console.warn(
        "TokenLens: catalog fetch failed, using default catalog",
        err
      );
      return; // tokenlens helpers will fall back to defaultCatalog
    }
  },
  ["tokenlens-catalog"],
  { revalidate: 24 * 60 * 60 } // 24 hours
);

export function createUsageFinishHandler({
  modelId,
  dataStream,
  onUsageUpdate,
}: {
  modelId: string | undefined;
  dataStream: UIMessageStreamWriter<ChatMessage>;
  onUsageUpdate: (usage: AppUsage) => void;
}) {
  return async ({ usage }: { usage: LanguageModelUsage }) => {
    let finalMergedUsage: AppUsage;

    try {
      const providers = await getTokenlensCatalog();

      if (!modelId || !providers) {
        finalMergedUsage = usage as AppUsage;
      } else {
        const summary = getUsage({ modelId, usage, providers });
        finalMergedUsage = {
          ...usage,
          ...summary,
          modelId,
        } as AppUsage;
      }
    } catch (err) {
      console.warn("TokenLens enrichment failed", err);
      finalMergedUsage = usage as AppUsage;
    }

    dataStream.write({
      type: "data-usage",
      data: finalMergedUsage,
    });
    onUsageUpdate(finalMergedUsage);
  };
}

type CreateAgentStreamParams = {
  uiMessages: ChatMessage[];
  selectedChatModel: ChatModel["id"];
  requestHints: RequestHints;
  session: Session;
  chatId: string;
};

export function createAgentStream({
  uiMessages,
  selectedChatModel,
  requestHints,
  session,
  chatId,
}: CreateAgentStreamParams) {
  let finalMergedUsage: AppUsage | undefined;

  return createUIMessageStream({
    execute: async ({ writer: dataStream }) => {
      const classification = await classifyMessages(uiMessages);

      console.log(classification);

      let result: any;

      if (classification.resume_opt) {
        result = createResumeOptStream({
          messages: uiMessages,
          dataStream,
          onUsageUpdate: (u) => {
            finalMergedUsage = u;
          },
        });
      } else if (classification.mock_interview) {
        result = createMockInterviewStream({
          messages: uiMessages,
          dataStream,
          onUsageUpdate: (u) => {
            finalMergedUsage = u;
          },
        });
      } else {
        result = streamText({
          model: myProvider.languageModel(selectedChatModel),
          system: systemPrompt({ selectedChatModel, requestHints }),
          messages: convertToModelMessages(uiMessages),
          stopWhen: stepCountIs(5),
          experimental_activeTools:
            selectedChatModel === "chat-model-reasoning"
              ? []
              : [
                  "getWeather",
                  "createDocument",
                  "updateDocument",
                  "requestSuggestions",
                ],
          experimental_transform: smoothStream({ chunking: "word" }),
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({
              session,
              dataStream,
            }),
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: "stream-text",
          },
          onFinish: createUsageFinishHandler({
            modelId: myProvider.languageModel(selectedChatModel).modelId,
            dataStream,
            onUsageUpdate: (u) => {
              finalMergedUsage = u;
            },
          }),
        });
      }

      result.consumeStream();

      dataStream.merge(
        result.toUIMessageStream({
          sendReasoning: true,
        })
      );
    },
    generateId: generateUUID,
    onFinish: async ({ messages }) => {
      await saveMessages({
        messages: messages.map((currentMessage) => ({
          id: currentMessage.id,
          role: currentMessage.role,
          parts: currentMessage.parts,
          createdAt: new Date(),
          attachments: [],
          chatId,
        })),
      });

      if (finalMergedUsage) {
        try {
          await updateChatLastContextById({
            chatId,
            context: finalMergedUsage,
          });
        } catch (err) {
          console.warn("Unable to persist last usage for chat", chatId, err);
        }
      }
    },
    onError: () => {
      return "Oops, an error occurred!";
    },
  });
}
