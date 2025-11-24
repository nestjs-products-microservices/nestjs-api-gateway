import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  port: get('PORT').required().asPortNumber(),
  microservices: {
    // products: {
    //   host: get('PRODUCTS_MICROSERVICE_HOST').required().asString(),
    //   port: get('PRODUCTS_MICROSERVICE_PORT').required().asPortNumber(),
    // },
    // orders: {
    //   host: get('ORDERS_MICROSERVICE_HOST').required().asString(),
    //   port: get('ORDERS_MICROSERVICE_PORT').required().asPortNumber(),
    // },
    nats: {
      servers: get('NATS_SERVERS').required().asString(),
    },
  },
};
