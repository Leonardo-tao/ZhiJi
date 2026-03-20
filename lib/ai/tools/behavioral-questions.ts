import { tool } from "ai";
import { z } from "zod";

const BEHAVIORAL_QUESTIONS_URL = "https://raw.githubusercontent.com/mianshipai/mianshipai-web/refs/heads/main/docs/hr-exam/behavioral-test.md";

async function fetchBehavioralQuestions(): Promise<string> {
  try {
    const response = await fetch(BEHAVIORAL_QUESTIONS_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch behavioral questions: ${response.status} ${response.statusText}`
      );
    }
    const content = await response.text();
    return content;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Error fetching behavioral questions: ${errorMessage}`);
  }
}

export const getBehavioralQuestionsTool = tool({
  description:
    "获取 HR 行为面试题和答案。当用户提问到 HR 行为面试时，使用此工具从 GitHub 获取最新的行为面试题和答案列表。",
  inputSchema: z.object({}),
  execute: async () => {
    const content = await fetchBehavioralQuestions();
    return {
      content,
    };
  },
});
