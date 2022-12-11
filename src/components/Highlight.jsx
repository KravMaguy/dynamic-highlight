import { memo } from "react";
const HighLight = ({ value, highlight }) => {
  if (!highlight) return value;
  const parts = value.toString().split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, index) => (
    <span key={index}>
      {part.toLowerCase() === highlight.toLowerCase() ? (
        <b style={{ backgroundColor: "#ADD8E6" }}>{part}</b>
      ) : (
        part
      )}
    </span>
  ));
};

export default memo(HighLight);
