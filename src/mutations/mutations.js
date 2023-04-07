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

export const GET_CATEGORIES = gql`
  query {
    getCategories {
      _id
      name
      order
    }
  }
`;

export const GET_TOPICS_BY_CATEGORY = gql`
  query GetTopicByCategory($category: ID!) {
    getTopicByCategory(category: $category) {
      _id
      category {
        _id
        name
      }
      name
      order
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($topic: ID!) {
    getComments(topic: $topic) {
      _id
      user {
        _id
        username
      }
      topic {
        _id
        name
      }
      comment
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($topic: ID!, $comment: String!) {
    addComment(topic: $topic, comment: $comment)
  }
`;
