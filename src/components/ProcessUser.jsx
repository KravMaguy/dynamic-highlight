import { memo } from "react";
import HighLight from "./Highlight";

const ProcessUser = ({ user, depth, input }) => {
  return (
    <div>
      {Object.entries(user).map((val) => {
        const [key, prop] = val;
        if (typeof key !== "object" && typeof prop !== "object") {
          return (
            <div key={key + prop} style={{ marginLeft: `${depth * 10}px` }}>
              {key} :
              <HighLight value={prop} highlight={input} />
            </div>
          );
        }
        return (
          <div key={key + depth}>
            <div style={{ marginLeft: `${depth * 10}px` }} key={key}>
              {key} :
            </div>
            <ProcessUser depth={depth + 1} user={prop} input={input} />
          </div>
        );
      })}
    </div>
  );
};

export default memo(ProcessUser);
