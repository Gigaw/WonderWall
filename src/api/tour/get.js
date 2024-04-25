const apiURL = process.env.EXPO_PUBLIC_API_URL;

export const getTours = async (token) => {
  try {
    const response = await fetch(apiURL + "/tours", {
      method: "GET",
      headers: {
        authorization: "Bearer " + token,
        // "Content-Type": "application/json",
      },
    });
    // if (!response.ok) throw new Error("Failed on sign up request", response);

    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
