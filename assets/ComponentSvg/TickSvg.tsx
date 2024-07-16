import React from "react";

const TickSvg = ({
  stroke = "currentColor",
  fill = "none",
}: {
  stroke?: string;
  fill?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 size-4"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};

export default TickSvg;
