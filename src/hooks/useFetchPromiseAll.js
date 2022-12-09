import { useEffect, useState } from "react";
import getFetchData from "../utils/getFetchData";
function useFetchPromiseAll(params) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const Data = getFetchData(params);
    Promise.all([...Data]).then((res) => {
      const response = {};
      for (let i = 0; i < res.length; i++) {
        response[params[i]] = res[i];
      }
      setData(response);
    });
  }, [params]);
  return data;
}

export default useFetchPromiseAll;
