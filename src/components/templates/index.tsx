import React from "react";
import ClassicTemplate from "./ClassicTemplate";
import LeftRightTemplate from "./LeftRightTemplate";
import TimelineTemplate from "./TimelineTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import CreativeTemplate from "./CreativeTemplate";
import CompactTemplate from "./CompactTemplate";
import { ResumeData } from "@/types/resume";
import { ResumeTemplate } from "@/types/template";

interface TemplateProps {
  data: ResumeData;
  template: ResumeTemplate;
}

const ResumeTemplateComponent: React.FC<TemplateProps> = ({
  data,
  template,
}) => {
  const renderTemplate = () => {
    switch (template.layout) {
      case "left-right":
        return <LeftRightTemplate data={data} template={template} />;
      case "timeline":
        return <TimelineTemplate data={data} template={template} />;
      case "minimal":
        return <MinimalTemplate data={data} template={template} />;
      case "professional":
        return <ProfessionalTemplate data={data} template={template} />;
      case "creative":
        return <CreativeTemplate data={data} template={template} />;
      case "compact":
        return <CompactTemplate data={data} template={template} />;
      default:
        return <ClassicTemplate data={data} template={template} />;
    }
  };

  return renderTemplate();
};

export default ResumeTemplateComponent;
