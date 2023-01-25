import Contentstack from 'contentstack';
import {API_KEY, DELIVERY_TOKEN, ENVIRONMENT, HOST} from '@env';

const contentstack = () => {
  const stack = Contentstack.Stack({
    api_key: API_KEY,
    delivery_token: DELIVERY_TOKEN,
    environment: ENVIRONMENT,
  });

  if (HOST) {
    stack.setHost(HOST);
  }
  return stack;
};

export default contentstack();
