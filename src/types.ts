import { GraphQLApiSchemaOptions, ApiSchema } from "graphql-api-schema";
import { GraphQLSchema } from "graphql";

declare module 'graphql-api-schema' {
  export interface ApiSchema {
    stage: 'walk'|'build'
  }
  /*export class GraphQLApiSchema {
    static stage: 'walk'|'build'
    //static get apiSchema(): ApiSchema
    static setGraphQLSchema(graphqlSchema: GraphQLSchema): void
    static init(options: GraphQLApiSchemaOptions): GraphQLApiSchema
    public constructor(options: GraphQLApiSchemaOptions)
    public setGraphQLSchema(graphqlSchema: GraphQLSchema): any
  }*/
}
