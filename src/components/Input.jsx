import { memo } from "react";
function Input({ input, onChange }) {
  return <input value={input} onChange={onChange} />;
}

export default memo(Input);
