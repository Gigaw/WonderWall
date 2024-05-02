const apiURL = process.env.EXPO_PUBLIC_API_URL;
// console.log(apiURL);
export async function signUp({ email, password, name, phone }) {
  console.log('here')
  const response = await fetch(apiURL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, phone }),
  });
  // if (!response.ok) throw new Error("Failed on sign up request", response);

  return await response.json();
}
