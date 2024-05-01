const apiURL = process.env.EXPO_PUBLIC_API_URL;

export const getTours = async ({ token, search, level }) => {
  const nonEmptySearch = search ? search : "";
  const nonEmptyLevel = level ? level : "";
  console.log("search", level);
  const response = await fetch(
    apiURL + `/tours?query=${nonEmptySearch}&level=${nonEmptyLevel}`,
    {
      method: "GET",
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );

  return await response.json();
};
