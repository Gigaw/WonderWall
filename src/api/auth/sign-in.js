const apiURL = process.env.EXPO_PUBLIC_API_URL;
export async function signIn({ email, password }) {
  const response = await fetch(apiURL + "/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  // const res = await response.json();
  return response;
}
