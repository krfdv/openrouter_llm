

export interface IOpenRouterLLM {
    chat: (prompt: string) => Promise<string>;
}