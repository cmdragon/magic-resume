import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AIModelType = "doubao" | "deepseek" | "openai" | "custom";

interface AIConfigState {
  selectedModel: AIModelType;
  doubaoApiKey: string;
  doubaoModelId: string;
  deepseekApiKey: string;
  deepseekModelId: string;
  openaiApiKey: string;
  openaiModelId: string;
  openaiApiEndpoint: string;
  customApiKey: string;
  customModelId: string;
  customApiEndpoint: string;
  customProviderName: string;
  setSelectedModel: (model: AIModelType) => void;
  setDoubaoApiKey: (apiKey: string) => void;
  setDoubaoModelId: (modelId: string) => void;
  setDeepseekApiKey: (apiKey: string) => void;
  setDeepseekModelId: (modelId: string) => void;
  setOpenaiApiKey: (apiKey: string) => void;
  setOpenaiModelId: (modelId: string) => void;
  setOpenaiApiEndpoint: (endpoint: string) => void;
  setCustomApiKey: (apiKey: string) => void;
  setCustomModelId: (modelId: string) => void;
  setCustomApiEndpoint: (endpoint: string) => void;
  setCustomProviderName: (name: string) => void;
}

export const useAIConfigStore = create<AIConfigState>()(
  persist(
    (set) => ({
      selectedModel: "doubao",
      doubaoApiKey: "",
      doubaoModelId: "",
      deepseekApiKey: "",
      deepseekModelId: "",
      openaiApiKey: "",
      openaiModelId: "",
      openaiApiEndpoint: "",
      customApiKey: "",
      customModelId: "",
      customApiEndpoint: "",
      customProviderName: "",
      setSelectedModel: (model: AIModelType) => set({ selectedModel: model }),
      setDoubaoApiKey: (apiKey: string) => set({ doubaoApiKey: apiKey }),
      setDoubaoModelId: (modelId: string) => set({ doubaoModelId: modelId }),
      setDeepseekApiKey: (apiKey: string) => set({ deepseekApiKey: apiKey }),
      setDeepseekModelId: (modelId: string) => set({ deepseekModelId: modelId }),
      setOpenaiApiKey: (apiKey: string) => set({ openaiApiKey: apiKey }),
      setOpenaiModelId: (modelId: string) => set({ openaiModelId: modelId }),
      setOpenaiApiEndpoint: (endpoint: string) => set({ openaiApiEndpoint: endpoint }),
      setCustomApiKey: (apiKey: string) => set({ customApiKey: apiKey }),
      setCustomModelId: (modelId: string) => set({ customModelId: modelId }),
      setCustomApiEndpoint: (endpoint: string) => set({ customApiEndpoint: endpoint }),
      setCustomProviderName: (name: string) => set({ customProviderName: name })
    }),
    {
      name: "ai-config-storage"
    }
  )
);
