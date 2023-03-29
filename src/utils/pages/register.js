import { gql, useMutation } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($input: AddUserInput!) {
    signUp(user: $input)
  }
`;

const SignUp = () => {
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data } = await signUp({
      variables: {
        input: {
          username: "test",
          password: "test",
          email: "",
          confirmed: false,
        },
      },
    });
    console.log(data);
  };
};
