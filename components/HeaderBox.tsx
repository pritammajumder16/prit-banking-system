import React from "react";

const HeaderBox = ({ type, title, subtext, user }: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <span className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-bankGradient">&nbsp; {user}</span>
        )}
      </span>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
