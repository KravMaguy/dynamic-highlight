import { memo } from "react";
import HighLight from "./Highlight";

const ProcessUser = ({
  user,
  depth,
  input,
  openedSubFolders,
  setOpenedSubFolders,
}) => {
  return (
    <div style={{ margin: "10px", border: "2px solid", padding: "10px" }}>
      {Object.entries(user).map((val) => {
        const [key, prop] = val;
        if (typeof key !== "object" && typeof prop !== "object") {
          return (
            <div key={key + prop} style={{ marginLeft: `${depth * 15}px` }}>
              {key} :
              <HighLight value={prop} highlight={input} />
            </div>
          );
        } else {
          const id = key + JSON.stringify(prop);
          return (
            <div key={id}>
              <div style={{ marginLeft: `${depth * 15}px` }}>
                <button
                  onClick={() => {
                    if (!openedSubFolders[id]) {
                      const copy = { ...openedSubFolders, [id]: true };
                      setOpenedSubFolders(copy);
                    } else {
                      setOpenedSubFolders((current) => {
                        const copy = { ...current };
                        delete copy[id];
                        return copy;
                      });
                    }
                  }}
                >
                  {openedSubFolders[id] ? "-" : "+"} {key} :
                </button>
              </div>
              {openedSubFolders[id] && (
                <ProcessUser
                  openedSubFolders={openedSubFolders}
                  setOpenedSubFolders={setOpenedSubFolders}
                  depth={depth + 1}
                  user={prop}
                  input={input}
                />
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default memo(ProcessUser);
