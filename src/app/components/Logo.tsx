import React from "react";
import { Shirt } from "lucide-react";
import "../styles/fonts.css";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="bg-gradient-to-r from-primary-500 to-secondary-400 p-2 rounded-lg shadow-sm">
        <Shirt className="w-6 h-6 text-white" />
      </div>
      <div className="flex flex-col">
        <span
          className="text-xl bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent tracking-wide pl-1"
          style={{
            fontFamily: "Ananda Black",
            paddingLeft: "0.5em",
            marginLeft: "-0.5em",
            paddingRight: "0.5em",
            marginRight: "-0.5em",
          }}
        >
          TryMyLook AI
        </span>
      </div>
    </div>
  );
};

export default Logo;
