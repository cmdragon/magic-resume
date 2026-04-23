import React from "react";
import BaseInfo from "../preview/BaseInfo";
import ExperienceSection from "../preview/ExperienceSection";
import EducationSection from "../preview/EducationSection";
import SkillSection from "../preview/SkillPanel";
import ProjectSection from "../preview/ProjectSection";
import CustomSection from "../preview/CustomSection";
import GithubContribution from "../shared/GithubContribution";
import { ResumeData } from "@/types/resume";
import { ResumeTemplate } from "@/types/template";

interface ClassicTemplateProps {
  data: ResumeData;
  template: ResumeTemplate;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({
  data,
  template,
}) => {
  const { colorScheme } = template;
  const themeColor = data.globalSettings.themeColor || colorScheme.primary;
  const enabledSections = data.menuSections.filter(
    (section) => section.enabled,
  );
  const sortedSections = [...enabledSections].sort((a, b) => a.order - b.order);

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "basic":
        return (
          <>
            <BaseInfo
              basic={data.basic}
              globalSettings={data.globalSettings}
              template={template}
            />
            {data.basic.githubContributionsVisible && (
              <GithubContribution
                className="mt-2"
                githubKey={data.basic.githubKey}
                username={data.basic.githubUseName}
              />
            )}
          </>
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

  return (
    <div
      style={{
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
        padding: "32px 40px",
      }}
    >
      {sortedSections.map((section, index) => (
        <div
          key={section.id}
          style={{
            marginBottom: index < sortedSections.length - 1 ? "24px" : "0",
            paddingLeft: "16px",
            borderLeft: `3px solid ${themeColor}`,
          }}
        >
          {renderSection(section.id)}
        </div>
      ))}
    </div>
  );
};

export default ClassicTemplate;
