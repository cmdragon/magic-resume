import { CSSProperties } from "react";

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  layout:
    | "classic"
    | "left-right"
    | "professional"
    | "timeline"
    | "minimal"
    | "creative"
    | "compact";
  colorScheme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    sectionGap: number;
    itemGap: number;
    contentPadding: number;
  };
  basic: {
    layout?: "left" | "center" | "right";
  };
}

export interface TemplateConfig {
  sectionTitle: {
    className?: string;
    styles: CSSProperties;
  };
}
