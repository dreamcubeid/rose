import { getBrand } from "@sirclo/nexus";
import { GRAPHQL_URI } from '../components/Constants';
import { IncomingMessage } from 'http';

export const useBrand = async (req: IncomingMessage) => {
  try {
    return await getBrand(GRAPHQL_URI(req));
  } catch (e) {
    console.log('Error while request brand: ', e);
  }
}