import { useMutation } from "@tanstack/react-query";

const apiURL = process.env.EXPO_PUBLIC_API_URL;
console.log(apiURL);
async function signUp({ email, password, name, phone }) {
  const response = await fetch(apiURL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, phone, name }),
  });
  if (!response.ok) throw new Error("Failed on sign up request", response);

  return await response.json();
}

export default function useSignUp() {
  const { mutate: signUpMutation } = useMutation(
    ({ email, password }) => signUp(email, password),
    {
      onSuccess: (data) => {
        console.log(data);
        // TODO: save the user in the state
        // navigate('/');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return signUpMutation;
}
