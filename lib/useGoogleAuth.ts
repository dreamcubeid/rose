import { getGoogleAuth } from "@sirclo/nexus";
import { GRAPHQL_URI } from './Constants';
import { IncomingMessage } from 'http';

export const useGoogleAuth = async (req: IncomingMessage) => {
  return await getGoogleAuth(GRAPHQL_URI(req));
}