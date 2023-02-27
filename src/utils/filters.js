export const filterType = (data, type) => {
  return data.filter((d) => d["research_type"] === type);
};

export const getTypes = (data) => {
  let types = new Set();
  data.forEach((d) => types.add(d["research_type"]));
  return Array.from(types);
};
