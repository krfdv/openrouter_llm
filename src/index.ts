import { ChatOpenAI } from "@langchain/openai";

export function createChatOpenRouter(params: ConstructorParameters<typeof ChatOpenAI>[0] = {}) {
  const key = params.apiKey ?? process.env.OPENROUTER_API_KEY;

  if (!key) {
    throw new Error('OPENROUTER_API_KEY or apiKey is not set or provided');
  }

  return new ChatOpenAI({
    ...params,
    apiKey: key,
    configuration: {
      ...params.configuration,
      baseURL: params.configuration?.baseURL ?? "https://openrouter.ai/api/v1",
    },
  });
}
