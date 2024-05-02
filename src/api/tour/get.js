const apiURL = process.env.EXPO_PUBLIC_API_URL;

export const getTours = async ({ token, search, level }) => {
  // const params = new URLSearchParams({
  //   var1: "value",
  //   var2: "value2",
  //   arr: "foo",
  // });
  // console.log("params", params);
  // const nonEmptySearch = search ? search : "";
  // const nonEmptyLevel = level ? level : "";
  const searchQuery = search ? `query=${search}` : "";
  const levelQuery = level ? `level=${level}` : "";
  console.log(levelQuery)
  const response = await fetch(apiURL + `/tours?${levelQuery}&${searchQuery}`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });

  return await response.json();
};
