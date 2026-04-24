"use client";
import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

import { useResumeStore } from "@/store/useResumeStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
const ResumeTemplateComponent = dynamic(
  () => import("@/components/templates"),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <Skeleton className="w-full h-96" />
      </div>
    ),
  },
);
import { DEFAULT_TEMPLATES } from "@/config";
import { initialResumeState } from "@/config/initialResumeData";
import { ResumeTemplate } from "@/types/template";
import { ResumeData, GlobalSettings } from "@/types/resume";

import { cn } from "@/lib/utils";

import classic from "@/assets/images/template-cover/classic.svg";
import leftRight from "@/assets/images/template-cover/left-right.svg";
import timeline from "@/assets/images/template-cover/timeline.svg";
import minimal from "@/assets/images/template-cover/minimal.svg";
import professional from "@/assets/images/template-cover/professional.svg";
import creative from "@/assets/images/template-cover/creative.svg";
import compact from "@/assets/images/template-cover/compact.svg";

const templateImages: Record<string, string> = {
  classic: classic as string,
  "left-right": leftRight as string,
  timeline: timeline as string,
  minimal: minimal as string,
  professional: professional as string,
  creative: creative as string,
  compact: compact as string,
};

const getTemplateKey = (id: string): string => {
  const keyMap: Record<string, string> = {
    "left-right": "leftRight",
  };
  return keyMap[id] || id;
};

const buildPreviewData = (template: ResumeTemplate): ResumeData => {
  const sampleData = initialResumeState as unknown as ResumeData;
  return {
    ...sampleData,
    templateId: template.id,
    globalSettings: {
      ...sampleData.globalSettings,
      themeColor: template.colorScheme.primary,
      sectionSpacing: template.spacing.sectionGap,
      paragraphSpacing: template.spacing.itemGap,
      pagePadding: template.spacing.contentPadding,
    } as GlobalSettings,
    basic: {
      ...sampleData.basic,
      layout: template.basic.layout,
    },
  };
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const TemplateCard = ({
  template,
  t,
  onPreview,
  onCreate,
}: {
  template: (typeof DEFAULT_TEMPLATES)[number];
  t: (key: string) => string;
  onPreview: (id: string) => void;
  onCreate: (id: string) => void;
}) => {
  const templateKey = getTemplateKey(template.id);

  return (
    <motion.div variants={item}>
      <Card
        className={cn(
          "group cursor-pointer overflow-hidden transition-all hover:shadow-md max-w-[360px] mx-auto",
          "border border-gray-200 hover:border-primary/40 dark:border-gray-800 rounded-xl",
        )}
        onClick={() => onPreview(template.id)}
      >
        <CardContent className="p-0">
          <div className="relative aspect-[210/297] w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
            <div className="absolute top-0 right-0 z-10">
              <div className="flex items-center px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-l border-b border-gray-200 dark:border-gray-700 rounded-bl-md">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  {t(`${templateKey}.name`)}
                </span>
              </div>
            </div>

            <Image
              src={templateImages[template.id]}
              alt={t(`${templateKey}.name`)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-300 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <p className="text-sm text-gray-100 leading-snug">
                {t(`${templateKey}.description`)}
              </p>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-gray-950 flex space-x-2 border-t border-gray-100 dark:border-gray-800">
            <Button
              variant="outline"
              className="flex-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template.id);
              }}
            >
              {t("preview")}
            </Button>
            <Button
              className="flex-1 text-sm font-medium shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onCreate(template.id);
              }}
            >
              {t("useTemplate")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TemplatesPage = () => {
  const t = useTranslations("dashboard.templates");
  const router = useRouter();
  const createResume = useResumeStore((state) => state.createResume);
  const [previewTemplate, setPreviewTemplate] = useState<{
    id: string;
    open: boolean;
  } | null>(null);

  const previewResumeData = useMemo(() => {
    if (!previewTemplate) return null;
    const template = DEFAULT_TEMPLATES.find((t) => t.id === previewTemplate.id);
    if (!template) return null;
    return buildPreviewData(template);
  }, [previewTemplate]);

  const previewTemplateConfig = useMemo(() => {
    if (!previewTemplate) return null;
    return DEFAULT_TEMPLATES.find((t) => t.id === previewTemplate.id) || null;
  }, [previewTemplate]);

  const handleCreateResume = useCallback(
    (templateId: string) => {
      const template = DEFAULT_TEMPLATES.find((t) => t.id === templateId);
      if (!template) return;

      const resumeId = createResume(templateId);
      const { resumes, updateResume } = useResumeStore.getState();
      const resume = resumes[resumeId];

      if (resume) {
        updateResume(resumeId, {
          globalSettings: {
            ...resume.globalSettings,
            themeColor: template.colorScheme.primary,
            sectionSpacing: template.spacing.sectionGap,
            paragraphSpacing: template.spacing.itemGap,
            pagePadding: template.spacing.contentPadding,
          },
          basic: {
            ...resume.basic,
            layout: template.basic.layout,
          },
        });
      }

      router.push(`/app/workbench/${resumeId}`);
    },
    [createResume, router],
  );

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {DEFAULT_TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              t={t}
              onPreview={(id) => setPreviewTemplate({ id, open: true })}
              onCreate={handleCreateResume}
            />
          ))}
        </motion.div>

        <Dialog
          open={previewTemplate?.open || false}
          onOpenChange={(open) => {
            if (!open) setPreviewTemplate(null);
          }}
        >
          {previewTemplate && previewResumeData && previewTemplateConfig && (
            <DialogContent className="max-w-[900px] p-0 overflow-hidden border-0 shadow-lg rounded-xl bg-white dark:bg-gray-900 max-h-[90vh]">
              <div className="flex flex-col h-full max-h-[90vh]">
                <div className="border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex-shrink-0">
                  <DialogTitle className="text-lg font-medium">
                    {t(getTemplateKey(previewTemplate.id) + ".name")}
                  </DialogTitle>
                </div>
                <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 p-6 flex justify-center">
                  <div className="w-full max-w-[700px] bg-white shadow-lg">
                    <ResumeTemplateComponent
                      data={previewResumeData}
                      template={previewTemplateConfig}
                    />
                  </div>
                </div>
                <div className="p-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-center flex-shrink-0">
                  <Button
                    className="w-full max-w-[300px]"
                    onClick={() => {
                      setPreviewTemplate(null);
                      handleCreateResume(previewTemplate.id);
                    }}
                  >
                    {t("useTemplate")}
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default TemplatesPage;
