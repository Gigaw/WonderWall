const apiURL = process.env.EXPO_PUBLIC_API_URL;

export const deleteTour = async (id, token) => {
  const response = await fetch(apiURL + `/tours/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};
