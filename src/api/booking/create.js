const apiURL = process.env.EXPO_PUBLIC_API_URL;

export const createBooking = async (data, token) => {
  console.log(data);
  const response = await fetch(apiURL + "/bookings", {
    method: "POST",
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error();
  return await response.json();
};
