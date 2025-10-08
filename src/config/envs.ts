import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  port: get('PORT').required().asPortNumber(),
  microservices: {
    products: {
      host: get('PRODUCTS_MICROSERVICE_HOST').required().asString(),
      port: get('PRODUCTS_MICROSERVICE_PORT').required().asPortNumber(),
    },
  },
};
