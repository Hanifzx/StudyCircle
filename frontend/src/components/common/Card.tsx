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
        bg-dark-card rounded-2xl
        border border-dark-border
        shadow-lg
        transition-all duration-300
        ${hoverable ? "hover:-translate-y-1 hover:shadow-xl hover:border-white/10 hover:bg-dark-border/40 cursor-pointer" : ""}
        ${onClick && !hoverable ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
