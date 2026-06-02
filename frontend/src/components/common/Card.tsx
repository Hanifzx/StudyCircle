import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  children,
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl
        transition-all duration-300
        glass-panel
        ${hoverable ? "glass-panel-hover cursor-pointer hover:-translate-y-1" : ""}
        ${onClick && !hoverable ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
