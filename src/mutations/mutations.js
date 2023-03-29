import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($input: RegisterInput!) {
    signUp(user: $input)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CONFIRMATION_MUTATION = gql`
  mutation ConfirmationMutation($_id: ID!) {
    confirmUser(_id: $_id)
  }
`;
