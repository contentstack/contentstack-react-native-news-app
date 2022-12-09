import Contentstack from 'contentstack';
import {API_KEY, DELIVERY_TOKEN, ENVIRONMENT} from '@env';

export default Contentstack.Stack({
  api_key: API_KEY,
  delivery_token: DELIVERY_TOKEN,
  environment: ENVIRONMENT,
});
