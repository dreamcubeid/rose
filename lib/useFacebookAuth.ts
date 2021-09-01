import { getFacebookAuth } from '@sirclo/nexus'
import { GRAPHQL_URI } from './Constants'
import { IncomingMessage } from 'http'

export const useFacebookAuth = async (req: IncomingMessage) => {
  return await getFacebookAuth(GRAPHQL_URI(req))
}