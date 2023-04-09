import { gql } from "@apollo/client";

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
      name
      order
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($topic: ID!) {
    getComments(topic: $topic) {
      _id
      # user {
      #   _id
      #   username
      # }
      # topic {
      #   _id
      #   name
      # }
      comment
      createdAt
    }
  }
`;
