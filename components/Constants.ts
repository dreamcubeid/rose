export const GRAPHQL_URI = (req) => {
  return process.env.GRAPHQL_URI || `https://${req.headers.host}/graphql`;
};
