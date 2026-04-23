import { TemplateConfig } from "@/types/template";

export const templateConfigs: Record<string, TemplateConfig> = {
  default: {
    sectionTitle: {
      styles: {
        fontSize: 18,
      },
    },
  },
  classic: {
    sectionTitle: {
      className: "border-b pb-2",
      styles: {
        fontSize: 18,
        borderColor: "var(--theme-color)",
      },
    },
  },
  "left-right": {
    sectionTitle: {
      className: "pl-1 flex items-center",
      styles: {
        fontSize: 18,
        backgroundColor: "var(--theme-color)",
        opacity: 0.1,
        color: "var(--theme-color)",
        borderLeftWidth: "3px",
        borderLeftStyle: "solid",
        borderLeftColor: "var(--theme-color)",
      },
    },
  },
  minimal: {
    sectionTitle: {
      className: "font-medium",
      styles: {
        fontSize: 16,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "#e5e7eb",
        paddingBottom: "4px",
        marginBottom: "8px",
      },
    },
  },
  professional: {
    sectionTitle: {
      className: "font-bold uppercase tracking-wide",
      styles: {
        fontSize: 16,
        color: "#ffffff",
        backgroundColor: "var(--theme-color)",
        padding: "6px 12px",
        marginBottom: "12px",
      },
    },
  },
  creative: {
    sectionTitle: {
      className: "font-semibold relative",
      styles: {
        fontSize: 18,
        color: "var(--theme-color)",
        paddingBottom: "8px",
      },
    },
  },
  compact: {
    sectionTitle: {
      className: "font-bold",
      styles: {
        fontSize: 14,
        borderBottomWidth: "1px",
        borderBottomStyle: "dashed",
        borderBottomColor: "#d1d5db",
        paddingBottom: "3px",
        marginBottom: "6px",
      },
    },
  },
};
