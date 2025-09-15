import React from "react";

interface IconOpenRouterProps {
  className?: string;
}

const IconOpenRouter: React.FC<IconOpenRouterProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 10L12 8L16 10V14L12 16L8 14V10Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="1.5"
        fill="white"
      />
    </svg>
  );
};

export default IconOpenRouter;