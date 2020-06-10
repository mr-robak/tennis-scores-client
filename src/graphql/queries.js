import gql from "graphql-tag";

export const GET_ALL_MATCHES = gql`
  query AllMatches {
    matches {
      id
      started_at
    }
  }
`;

export const GET_LIVE_MATCHES = gql`
  query LiveMatches {
    matches(
      order_by: { started_at: desc }
      where: { finished: { _eq: false } }
    ) {
      id
      started_at
      setts {
        p1_score
        p2_score
      }
      p2 {
        name
      }
      p1 {
        name
      }
    }
  }
`;

export const GET_FINISHED_MATCHES = gql`
  query FinishedMatches {
    matches(
      order_by: { started_at: desc }
      where: { finished: { _eq: true } }
    ) {
      id
      started_at
      setts {
        p1_score
        p2_score
      }
      p2 {
        name
      }
      p1 {
        name
      }
    }
  }
`;
