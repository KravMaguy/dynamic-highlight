import useFetchPromiseAll from "../hooks/useFetchPromiseAll";
import { useState } from "react";

function highlight(value, highlight) {
  const parts = value.toString().split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, index) => (
    <span key={index}>
      {part === highlight ? (
        <b style={{ backgroundColor: "#ADD8E6" }}>{part}</b>
      ) : (
        part
      )}
    </span>
  ));
}

function Entry({ entry, level, input }) {
  return (
    <div>
      {Object.values(entry).map((x) => {
        if (typeof x !== "object") {
          return (
            <div style={{ marginLeft: `${level * 10}px` }}>
              {highlight(x, input)}
            </div>
          );
        }
        return (
          <Entry level={level + 1} entry={Object.values(x)} input={input} />
        );
      })}
    </div>
  );
}

const params = ["users", "posts"];

function Entries() {
  const { users, posts } = useFetchPromiseAll(params);

  const entries = users?.map((user) => {
    user[params[1]] = posts.filter((post) => post.userId === user.id);
    return user;
  });

  const [input, setInput] = useState("");

  const searchEntry = (entry) => {
    const queue = [...Object.values(entry)];
    while (queue.length > 0) {
      const element = queue.shift();
      if (typeof element === "object") {
        queue.push(...Object.values(element));
      } else {
        if (element.toString().toLowerCase().includes(input.toLowerCase())) {
          return true;
        }
      }
    }
  };

  const filtered = entries?.filter((entry) => {
    return searchEntry(entry);
  });

  return (
    <>
      {entries && (
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      )}
      {filtered?.map((entry) => (
        <Entry key={entry.id} entry={entry} level={0} input={input} />
      ))}
    </>
  );
}

export default Entries;
