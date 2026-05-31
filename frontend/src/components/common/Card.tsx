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
        bg-[#141927] rounded-xl
        border border-gray-700/50
        shadow-lg shadow-black/20
        transition-all duration-200
        ${hoverable ? "hover:scale-[1.02] hover:shadow-xl hover:border-gray-600/50 cursor-pointer" : ""}
        ${onClick && !hoverable ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
