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

export const fetchGeneratedSchedule = async (schedules) => {
  return await fetch(process.env.REACT_APP_BACKEND_URL + "/schedule", {
    method: "POST",
    body: JSON.stringify(schedules),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const fetchDifficulty = async (subjectName) => {
  return await fetch(
    process.env.REACT_APP_BACKEND_URL + `/${subjectName}/difficulty`
  )
    .then((res) => res.json())
    .catch(() => "N/A");
};
