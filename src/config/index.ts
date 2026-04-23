import { BasicFieldType } from "@/types/resume";
import { ResumeTemplate } from "@/types/template";
export const DEFAULT_FIELD_ORDER: BasicFieldType[] = [
  { id: "1", key: "name", label: "姓名", type: "text", visible: true },

  { id: "2", key: "title", label: "职位", type: "text", visible: true },
  {
    id: "3",
    key: "employementStatus",
    label: "状态",
    type: "text",
    visible: true,
  },
  { id: "4", key: "birthDate", label: "生日", type: "date", visible: true },
  { id: "5", key: "email", label: "邮箱", type: "text", visible: true },
  { id: "6", key: "phone", label: "电话", type: "text", visible: true },
  { id: "7", key: "location", label: "所在地", type: "text", visible: true },
];

export const DEFAULT_TEMPLATES: ResumeTemplate[] = [
  {
    id: "classic",
    name: "经典模板",
    description: "传统单列居中布局，信息从上到下排列，适合大多数求职场景",
    thumbnail: "classic",
    layout: "classic",
    colorScheme: {
      primary: "#000000",
      secondary: "#4b5563",
      background: "#ffffff",
      text: "#212529",
    },
    spacing: {
      sectionGap: 24,
      itemGap: 16,
      contentPadding: 32,
    },
    basic: {
      layout: "center",
    },
  },
  {
    id: "left-right",
    name: "左右分栏",
    description: "左侧 35% 栏放个人信息和技能，右侧 65% 展示工作经历和教育背景",
    thumbnail: "leftRight",
    layout: "left-right",
    colorScheme: {
      primary: "#1e3a5f",
      secondary: "#4a6fa5",
      background: "#ffffff",
      text: "#212529",
    },
    spacing: {
      sectionGap: 24,
      itemGap: 16,
      contentPadding: 32,
    },
    basic: {
      layout: "center",
    },
  },
  {
    id: "timeline",
    name: "时间线风格",
    description: "左侧带有圆点装饰线，突出经历的时间顺序感",
    thumbnail: "timeline",
    layout: "timeline",
    colorScheme: {
      primary: "#18181b",
      secondary: "#64748b",
      background: "#ffffff",
      text: "#212529",
    },
    spacing: {
      sectionGap: 1,
      itemGap: 12,
      contentPadding: 24,
    },
    basic: {
      layout: "right",
    },
  },
  {
    id: "minimal",
    name: "极简模板",
    description: "700px 居中窄幅排版，大量留白，适合 A4 打印输出",
    thumbnail: "minimal",
    layout: "minimal",
    colorScheme: {
      primary: "#374151",
      secondary: "#6b7280",
      background: "#ffffff",
      text: "#1f2937",
    },
    spacing: {
      sectionGap: 16,
      itemGap: 12,
      contentPadding: 24,
    },
    basic: {
      layout: "left",
    },
  },
  {
    id: "professional",
    name: "商务模板",
    description: "纯色头部信息栏 + 白色内容区，简洁专业，适合正式场合",
    thumbnail: "professional",
    layout: "professional",
    colorScheme: {
      primary: "#1e3a5f",
      secondary: "#4a6fa5",
      background: "#ffffff",
      text: "#1a1a2e",
    },
    spacing: {
      sectionGap: 20,
      itemGap: 16,
      contentPadding: 32,
    },
    basic: {
      layout: "center",
    },
  },
  {
    id: "creative",
    name: "创意设计",
    description: "渐变色头部信息栏 + 白色内容区，更有设计感和活力",
    thumbnail: "creative",
    layout: "creative",
    colorScheme: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      background: "#ffffff",
      text: "#1e1e2e",
    },
    spacing: {
      sectionGap: 24,
      itemGap: 16,
      contentPadding: 32,
    },
    basic: {
      layout: "center",
    },
  },
  {
    id: "compact",
    name: "紧凑模板",
    description: "12px 小字号 + 小间距，单页容纳更多内容，适合经验丰富者",
    thumbnail: "compact",
    layout: "compact",
    colorScheme: {
      primary: "#0f172a",
      secondary: "#475569",
      background: "#ffffff",
      text: "#0f172a",
    },
    spacing: {
      sectionGap: 8,
      itemGap: 6,
      contentPadding: 16,
    },
    basic: {
      layout: "left",
    },
  },
];

export const GITHUB_REPO_URL = "https://github.com/cmdragon/magic-resume";

export const PDF_EXPORT_CONFIG = {
  SERVER_URL: "https://api.magicv.art/generate-pdf",
  TIMEOUT: 30000, // 30秒超时
  MAX_RETRY: 3, // 最大重试次数
} as const;
