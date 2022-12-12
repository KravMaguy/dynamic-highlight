import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import useFetchPromiseAll from "../hooks/useFetchPromiseAll";
import ProcessUser from "./ProcessUser";
import Input from "./Input";
const params = ["users", "posts"];

function Entries() {
  const { users, posts } = useFetchPromiseAll(params);
  const [input, setInput] = useState("");
  const [openedSubFolders, setOpenedSubFolders] = useState({});

  const entries = useMemo(() => {
    return users?.map((user) => {
      user[params[1]] = posts.filter((post) => post.userId === user.id);
      return user;
    });
  }, [users, posts]);

  const changeHandler = (event) => {
    setInput(event.target.value);
  };

  const debouncedChangeHandler = useMemo(() => {
    return debounce(changeHandler, 300);
  }, []);

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
      <Input value={input} onChange={debouncedChangeHandler} />
      {filtered?.map((userObj) => {
        return (
          <ProcessUser
            openedSubFolders={openedSubFolders}
            setOpenedSubFolders={setOpenedSubFolders}
            key={userObj.id}
            user={userObj}
            depth={0}
            input={input}
          />
        );
      })}
    </>
  );
}

export default Entries;
