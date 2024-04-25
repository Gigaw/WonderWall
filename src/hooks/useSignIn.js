import { useMutation } from "@tanstack/react-query";

export default function useSignIn() {
  const { mutate: signInMutation } = useMutation(
    ({ email, password }) => signIn(email, password),
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

  return signInMutation;
}
