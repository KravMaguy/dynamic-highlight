const Base = "https://jsonplaceholder.typicode.com/";

const getFetchData = (params) => {
  const data = params.map((param) => {
    return fetch(Base + param).then((res) => res.json());
  });
  return data;
};

export default getFetchData;
