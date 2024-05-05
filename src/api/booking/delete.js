const apiURL = process.env.EXPO_PUBLIC_API_URL;

export async function deleteBooking(id, token) {
  const response = await fetch(apiURL + "/bookings/" + id, {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  return response;
}
