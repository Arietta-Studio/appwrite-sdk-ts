import { Client } from '../client';
import { Service } from '../service';

export declare class Graphql extends Service {
  constructor(client: Client);
  /**
   * GraphQL endpoint
   *
   * Execute a GraphQL mutation.
   *
   * @param {object} query
   * @throws {AppwriteException}
   * @returns {Promise}
   */
  query(query: object): Promise<{}>;
  /**
   * GraphQL endpoint
   *
   * Execute a GraphQL mutation.
   *
   * @param {object} query
   * @throws {AppwriteException}
   * @returns {Promise}
   */
  mutation(query: object): Promise<{}>;
}
