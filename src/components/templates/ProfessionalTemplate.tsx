import React from "react";
import BaseInfo from "../preview/BaseInfo";
import ExperienceSection from "../preview/ExperienceSection";
import EducationSection from "../preview/EducationSection";
import SkillSection from "../preview/SkillPanel";
import ProjectSection from "../preview/ProjectSection";
import CustomSection from "../preview/CustomSection";
import { ResumeData } from "@/types/resume";
import { ResumeTemplate } from "@/types/template";

interface ProfessionalTemplateProps {
  data: ResumeData;
  template: ResumeTemplate;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({
  data,
  template,
}) => {
  const { colorScheme } = template;
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

  const basicSection = sortedSections.find((section) => section.id === "basic");
  const otherSections = sortedSections.filter(
    (section) => section.id !== "basic",
  );

  return (
    <div
      style={{
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
      }}
    >
      {basicSection && (
        <div
          style={{
            backgroundColor: data.globalSettings.themeColor,
            color: "#ffffff",
            padding: "28px 36px",
          }}
        >
          {renderSection(basicSection.id)}
        </div>
      )}
      <div style={{ padding: "28px 36px" }}>
        {otherSections.map((section) => (
          <div key={section.id} style={{ marginBottom: "24px" }}>
            {renderSection(section.id)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
