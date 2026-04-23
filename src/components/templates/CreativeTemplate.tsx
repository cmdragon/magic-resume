import React from "react";
import BaseInfo from "../preview/BaseInfo";
import ExperienceSection from "../preview/ExperienceSection";
import EducationSection from "../preview/EducationSection";
import SkillSection from "../preview/SkillPanel";
import ProjectSection from "../preview/ProjectSection";
import CustomSection from "../preview/CustomSection";
import { ResumeData } from "@/types/resume";
import { ResumeTemplate } from "@/types/template";

interface CreativeTemplateProps {
  data: ResumeData;
  template: ResumeTemplate;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
  data,
  template,
}) => {
  const { colorScheme } = template;
  const themeColor = data.globalSettings.themeColor || colorScheme.primary;
  const secondaryColor = colorScheme.secondary;
  const enabledSections = data.menuSections.filter(
    (section) => section.enabled,
  );
  const sortedSections = [...enabledSections].sort((a, b) => a.order - b.order);

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "basic":
        return (
          <BaseInfo
            basic={data.basic}
            globalSettings={data.globalSettings}
            template={template}
          />
        );
      case "experience":
        return (
          <ExperienceSection
            experiences={data.experience}
            globalSettings={data.globalSettings}
          />
        );
      case "education":
        return (
          <EducationSection
            education={data.education}
            globalSettings={data.globalSettings}
          />
        );
      case "skills":
        return (
          <SkillSection
            skill={data.skillContent}
            globalSettings={data.globalSettings}
          />
        );
      case "projects":
        return (
          <ProjectSection
            projects={data.projects}
            globalSettings={data.globalSettings}
          />
        );
      default:
        if (sectionId in data.customData) {
          const sectionTitle =
            data.menuSections.find((s) => s.id === sectionId)?.title ||
            sectionId;
          return (
            <CustomSection
              title={sectionTitle}
              key={sectionId}
              sectionId={sectionId}
              items={data.customData[sectionId]}
              globalSettings={data.globalSettings}
            />
          );
        }
        return null;
    }
  };

  const basicSection = sortedSections.find((s) => s.id === "basic");
  const contentSections = sortedSections.filter((s) => s.id !== "basic");

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        color: colorScheme.text,
        padding: "16px 20px",
      }}
    >
      {basicSection && (
        <div
          style={{
            background: `linear-gradient(135deg, ${themeColor} 0%, ${secondaryColor} 100%)`,
            borderRadius: "16px",
            padding: "28px 32px",
            color: "#ffffff",
            marginBottom: "20px",
            boxShadow: `0 8px 24px ${themeColor}33`,
          }}
        >
          {renderSection(basicSection.id)}
        </div>
      )}
      {contentSections.map((section) => (
        <div
          key={section.id}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "24px 28px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {renderSection(section.id)}
        </div>
      ))}
    </div>
  );
};

export default CreativeTemplate;
