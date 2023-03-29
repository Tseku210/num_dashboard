export const fetchSubjects = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/subjects").then((res) =>
    res.json()
  );
};
