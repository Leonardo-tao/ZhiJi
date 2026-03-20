export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "deepseek-chat",
    description:
      "Advanced multimodal model with deepseek and text capabilities",
  },
  {
    id: "chat-model-reasoning",
    name: "deepseek-reasoner",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems",
  },
];
