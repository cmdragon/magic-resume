"use client";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  Download,
  Loader2,
  FileJson,
  Printer,
  ChevronDown,
  FileText,
  FileType,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { PDF_EXPORT_CONFIG } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getOptimizedStyles = () => {
  const styleCache = new Map();
  const startTime = performance.now();

  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .filter((rule) => {
            const ruleText = rule.cssText;
            if (styleCache.has(ruleText)) return false;
            styleCache.set(ruleText, true);

            if (rule instanceof CSSFontFaceRule) return false;
            if (ruleText.includes("font-family")) return false;
            if (ruleText.includes("@keyframes")) return false;
            if (ruleText.includes("animation")) return false;
            if (ruleText.includes("transition")) return false;
            if (ruleText.includes("hover")) return false;
            return true;
          })
          .map((rule) => rule.cssText)
          .join("\n");
      } catch (e) {
        console.warn("Style processing error:", e);
        return "";
      }
    })
    .join("\n");

  console.log(`Style processing took ${performance.now() - startTime}ms`);
  return styles;
};

const optimizeImages = async (element: HTMLElement) => {
  const startTime = performance.now();
  const images = element.getElementsByTagName("img");

  const imagePromises = Array.from(images)
    .filter((img) => !img.src.startsWith("data:"))
    .map(async (img) => {
      try {
        const response = await fetch(img.src);
        const blob = await response.blob();
        return new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            img.src = reader.result as string;
            resolve();
          };
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Image conversion error:", error);
        return Promise.resolve();
      }
    });

  await Promise.all(imagePromises);
  console.log(`Image processing took ${performance.now() - startTime}ms`);
};

const PdfExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingJson, setIsExportingJson] = useState(false);
  const [isExportingHtml, setIsExportingHtml] = useState(false);
  const [isExportingMarkdown, setIsExportingMarkdown] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const { activeResume } = useResumeStore();
  const { globalSettings = {}, title } = activeResume || {};
  const t = useTranslations("pdfExport");
  const printFrameRef = useRef<HTMLIFrameElement>(null);

  const handleExport = async () => {
    const exportStartTime = performance.now();
    setIsExporting(true);

    try {
      const pdfElement = document.querySelector<HTMLElement>("#resume-preview");
      if (!pdfElement) {
        throw new Error("PDF element not found");
      }

      const clonedElement = pdfElement.cloneNode(true) as HTMLElement;

      const pageBreakLines =
        clonedElement.querySelectorAll<HTMLElement>(".page-break-line");
      pageBreakLines.forEach((line) => {
        line.style.display = "none";
      });

      const [styles] = await Promise.all([
        getOptimizedStyles(),
        optimizeImages(clonedElement),
      ]);

      const response = await fetch(PDF_EXPORT_CONFIG.SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: clonedElement.outerHTML,
          styles,
          margin: globalSettings.pagePadding,
        }),
        // 允许跨域请求
        mode: "cors",
        signal: AbortSignal.timeout(PDF_EXPORT_CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`PDF generation failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);
      console.log(`Total export took ${performance.now() - exportStartTime}ms`);
      toast.success(t("toast.success"));
    } catch (error) {
      console.error("Export error:", error);
      toast.error(t("toast.error"));
    } finally {
      setIsExporting(false);
    }
  };

  const handleJsonExport = () => {
    try {
      setIsExportingJson(true);
      if (!activeResume) {
        throw new Error("No active resume");
      }

      const jsonStr = JSON.stringify(activeResume, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.json`;
      link.click();

      window.URL.revokeObjectURL(url);
      toast.success(t("toast.jsonSuccess"));
    } catch (error) {
      console.error("JSON export error:", error);
      toast.error(t("toast.jsonError"));
    } finally {
      setIsExportingJson(false);
    }
  };

  const handleExportHtml = () => {
    try {
      setIsExportingHtml(true);
      const resumeContent = document.getElementById("resume-preview");
      if (!resumeContent) {
        throw new Error("Resume content not found");
      }

      const clone = resumeContent.cloneNode(true) as HTMLElement;
      const pageBreakLines = clone.querySelectorAll(".page-break-line");
      pageBreakLines.forEach((line) => {
        (line as HTMLElement).style.display = "none";
      });

      const actualContent = clone;

      const styles = Array.from(document.styleSheets)
        .map((sheet) => {
          try {
            return Array.from(sheet.cssRules)
              .map((rule) => rule.cssText)
              .join("\n");
          } catch (e) {
            return "";
          }
        })
        .join("\n");

      const pagePadding = globalSettings?.pagePadding || 32;
      const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  @page { size: A4; margin: ${pagePadding}px; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: sans-serif; }
  ${styles}
</style>
</head>
<body>
${actualContent.innerHTML}
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.html`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success(t("toast.htmlSuccess"));
    } catch (error) {
      console.error("HTML export error:", error);
      toast.error(t("toast.htmlError"));
    } finally {
      setIsExportingHtml(false);
    }
  };

  const handleExportMarkdown = () => {
    try {
      setIsExportingMarkdown(true);
      if (!activeResume) {
        throw new Error("No active resume");
      }

      const {
        basic,
        experience,
        education,
        projects,
        skillContent,
        customData,
        menuSections,
      } = activeResume;
      let md = "";

      // Header - Name
      if (basic?.name) {
        md += `# ${basic.name}\n\n`;
      }
      // Title
      if (basic?.title) {
        md += `**${basic.title}**\n\n`;
      }

      // Contact info as blockquote
      const contactInfo: string[] = [];
      if (basic) {
        if (basic.employementStatus) contactInfo.push(basic.employementStatus);
        if (basic.birthDate)
          contactInfo.push(new Date(basic.birthDate).toLocaleDateString());
        if (basic.email) contactInfo.push(basic.email);
        if (basic.phone) contactInfo.push(basic.phone);
        if (basic.location) contactInfo.push(basic.location);
        basic.customFields?.forEach((field) => {
          if (field.value && field.visible !== false) {
            contactInfo.push(field.value);
          }
        });
      }
      if (contactInfo.length > 0) {
        md += `> ${contactInfo.join(" | ")}\n\n`;
      }

      md += `---\n\n`;

      // Sections
      const enabledSections = menuSections
        .filter((s) => s.enabled)
        .sort((a, b) => a.order - b.order);

      enabledSections.forEach((section) => {
        if (section.id === "basic") return;

        md += `## ${section.title}\n\n`;

        switch (section.id) {
          case "experience":
            experience?.forEach((exp) => {
              const headerParts: string[] = [];
              if (exp.company) headerParts.push(exp.company);
              if (exp.position) headerParts.push(exp.position);
              if (exp.date) {
                headerParts.push(exp.date);
              }
              if (headerParts.length > 0) {
                md += `**${headerParts.join(" | ")}**\n\n`;
              }
              if (exp.details) {
                const items = exp.details
                  .split(/<br\s*\/?>|<li>|<\/li>/i)
                  .filter((item) => item.trim());
                items.forEach((item) => {
                  const clean = item.replace(/<\/?[^>]+(>|$)/g, "").trim();
                  if (clean) md += `- ${clean}\n`;
                });
                md += "\n";
              }
            });
            break;

          case "education":
            education?.forEach((edu) => {
              const headerParts: string[] = [];
              if (edu.school) headerParts.push(edu.school);
              if (edu.major) headerParts.push(edu.major);
              if (edu.startDate || edu.endDate) {
                headerParts.push(
                  `${edu.startDate || ""} - ${edu.endDate || ""}`,
                );
              }
              if (headerParts.length > 0) {
                md += `**${headerParts.join(" | ")}**\n\n`;
              }
              if (edu.description) {
                const items = edu.description
                  .split(/<br\s*\/?>|<li>|<\/li>/i)
                  .filter((item) => item.trim());
                items.forEach((item) => {
                  const clean = item.replace(/<\/?[^>]+(>|$)/g, "").trim();
                  if (clean) md += `- ${clean}\n`;
                });
                md += "\n";
              }
            });
            break;

          case "projects":
            projects?.forEach((project) => {
              const headerParts: string[] = [];
              if (project.name) headerParts.push(project.name);
              if (project.role) headerParts.push(project.role);
              if (project.date) {
                headerParts.push(project.date);
              }
              if (headerParts.length > 0) {
                md += `**${headerParts.join(" | ")}**\n\n`;
              }
              if (project.description) {
                const items = project.description
                  .split(/<br\s*\/?>|<li>|<\/li>/i)
                  .filter((item) => item.trim());
                items.forEach((item) => {
                  const clean = item.replace(/<\/?[^>]+(>|$)/g, "").trim();
                  if (clean) md += `- ${clean}\n`;
                });
                md += "\n";
              }
            });
            break;

          case "skills":
            if (skillContent) {
              const skillItems = skillContent
                .split(/\n|<br\s*\/?>/i)
                .filter((item) => item.trim());
              skillItems.forEach((item) => {
                const clean = item.replace(/<\/?[^>]+(>|$)/g, "").trim();
                if (clean) {
                  const colonIdx = clean.indexOf(":");
                  if (colonIdx > 0 && colonIdx < 20) {
                    const category = clean.substring(0, colonIdx).trim();
                    const content = clean.substring(colonIdx + 1).trim();
                    md += `- **${category}**: ${content}\n`;
                  } else {
                    md += `- ${clean}\n`;
                  }
                }
              });
              md += "\n";
            }
            break;

          default:
            // Custom sections
            if (section.id in customData) {
              const items = customData[section.id];
              items?.forEach((item) => {
                const headerParts: string[] = [];
                if (item.title) headerParts.push(item.title);
                if (item.subtitle) headerParts.push(item.subtitle);
                if (item.dateRange) headerParts.push(item.dateRange);
                if (headerParts.length > 0) {
                  md += `**${headerParts.join(" | ")}**\n\n`;
                }
                if (item.description) {
                  const descItems = item.description
                    .split(/<br\s*\/?>|<li>|<\/li>/i)
                    .filter((descItem) => descItem.trim());
                  descItems.forEach((descItem) => {
                    const clean = descItem
                      .replace(/<\/?[^>]+(>|$)/g, "")
                      .trim();
                    if (clean) md += `- ${clean}\n`;
                  });
                  md += "\n";
                }
              });
            }
            break;
        }
      });

      md = md.replace(/\n{3,}/g, "\n\n").trim();

      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.md`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success(t("toast.markdownSuccess"));
    } catch (error) {
      console.error("Markdown export error:", error);
      toast.error(t("toast.markdownError"));
    } finally {
      setIsExportingMarkdown(false);
    }
  };

  const handleExportImage = async () => {
    try {
      setIsExportingImage(true);
      const resumeContent = document.getElementById("resume-preview");
      if (!resumeContent) {
        throw new Error("Resume content not found");
      }

      if (typeof window === "undefined") return;
      const { default: html2canvas } = await import("html2canvas");

      const canvas = await html2canvas(resumeContent, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        ignoreElements: (element) =>
          element.classList.contains("page-break-line"),
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error(t("toast.imageError"));
          return;
        }
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.png`;
        link.click();
        window.URL.revokeObjectURL(url);
        toast.success(t("toast.imageSuccess"));
      }, "image/png");
    } catch (error) {
      console.error("Image export error:", error);
      toast.error(t("toast.imageError"));
    } finally {
      setIsExportingImage(false);
    }
  };

  const handlePrint = () => {
    if (!printFrameRef.current) {
      console.error("Print frame not found");
      return;
    }

    const resumeContent = document.getElementById("resume-preview");
    if (!resumeContent) {
      console.error("Resume content not found");
      return;
    }

    const clone = resumeContent.cloneNode(true) as HTMLElement;
    const pageBreakLines = clone.querySelectorAll(".page-break-line");
    pageBreakLines.forEach((line) => {
      (line as HTMLElement).style.display = "none";
    });

    const actualContent = clone;

    console.log("Found content:", actualContent);

    const pagePadding = globalSettings?.pagePadding;
    const iframeWindow = printFrameRef.current.contentWindow;
    if (!iframeWindow) {
      console.error("IFrame window not found");
      return;
    }

    try {
      iframeWindow.document.open();
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print Resume</title>
            <style>
              @font-face {
                font-family: "MiSans VF";
                src: url("/fonts/MiSans-VF.ttf") format("woff2");
                font-weight: normal;
                font-style: normal;
                font-display: swap;
              }

              @page {
                size: A4;
                margin: ${pagePadding}px;
                padding: 0;
              }
              * {
                box-sizing: border-box;
              }
              html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                background: white;
              }
              body {
                font-family: sans-serif;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }

              #resume-preview {
                padding: 0 !important;
                margin: 0 !important;
                font-family: "MiSans VF", sans-serif !important;
              }

              #print-content {
                width: 210mm;
                min-height: 297mm;
                margin: 0 auto;
                padding: 0;
                background: white;
                box-shadow: none;
              }
              #print-content * {
                box-shadow: none !important;
                transform: none !important;
                scale: 1 !important;
              }
              .scale-90 {
                transform: none !important;
              }
              
              .page-break-line {
                display: none;
              }

              ${Array.from(document.styleSheets)
                .map((sheet) => {
                  try {
                    return Array.from(sheet.cssRules)
                      .map((rule) => rule.cssText)
                      .join("\n");
                  } catch (e) {
                    console.warn("Could not copy styles from sheet:", e);
                    return "";
                  }
                })
                .join("\n")}
            </style>
          </head>
          <body>
            <div id="print-content">
              ${actualContent.innerHTML}
            </div>
          </body>
        </html>
      `;

      iframeWindow.document.write(htmlContent);
      iframeWindow.document.close();

      setTimeout(() => {
        try {
          iframeWindow.focus();
          iframeWindow.print();
        } catch (error) {
          console.error("Error  print:", error);
        }
      }, 1000);
    } catch (error) {
      console.error("Error setting up print:", error);
    }
  };

  const isLoading =
    isExporting ||
    isExportingJson ||
    isExportingHtml ||
    isExportingMarkdown ||
    isExportingImage;
  const loadingText = isExporting
    ? t("button.exporting")
    : isExportingJson ||
        isExportingHtml ||
        isExportingMarkdown ||
        isExportingImage
      ? t("button.exportingJson")
      : "";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2
              disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{loadingText}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{t("button.export")}</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleExport} disabled={isLoading}>
            <Download className="w-4 h-4 mr-2" />
            {t("button.exportPdf")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePrint} disabled={isLoading}>
            <Printer className="w-4 h-4 mr-2" />
            {t("button.print")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleJsonExport} disabled={isLoading}>
            <FileJson className="w-4 h-4 mr-2" />
            {t("button.exportJson")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportHtml} disabled={isLoading}>
            <FileText className="w-4 h-4 mr-2" />
            {t("button.exportHtml")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportMarkdown} disabled={isLoading}>
            <FileType className="w-4 h-4 mr-2" />
            {t("button.exportMarkdown")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportImage} disabled={isLoading}>
            <ImageIcon className="w-4 h-4 mr-2" />
            {t("button.exportImage")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <iframe
        ref={printFrameRef}
        style={{
          position: "absolute",
          width: "210mm",
          height: "297mm",
          visibility: "hidden",
          zIndex: -1,
        }}
        title="Print Frame"
      />
    </>
  );
};

export default PdfExport;
