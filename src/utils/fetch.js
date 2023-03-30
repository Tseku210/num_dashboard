export const fetchSubjects = async () => {
  return await fetch(process.env.REACT_APP_BACKEND_URL + "/subjects").then(
    (res) => res.json()
  );
};

export const fetchProfessors = async (subjectID) => {
  return await fetch(
    process.env.REACT_APP_BACKEND_URL + `/${subjectID}/professors`
  ).then((res) => res.json());
};
