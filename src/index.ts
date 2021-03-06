import * as NexusSchema from '@nexus/schema'
import { GraphQLApiSchema, GraphQLApiSchemaOptions } from 'graphql-api-schema'

declare module 'graphql-api-schema' {
  export interface ApiSchema {
    stage: 'walk'|'build'
  }
}
export interface GraphQLApiSchemaPluginOptions extends GraphQLApiSchemaOptions {}
export const graphqlApi = (args?: GraphQLApiSchemaPluginOptions) => {

  const options: GraphQLApiSchemaPluginOptions = {
    dirName: 'node_modules/@types/typegen-nexus',
    fileName: 'graphqlApiSchema.json',
    ...args,
  }

  return NexusSchema.plugin({
    name: 'nexus-graphql-api-schema-plugin',
    description: 'Generate Nexus Types',

    onInstall(builder) {
      GraphQLApiSchema.init(options)
      GraphQLApiSchema.apiSchema.stage = 'walk'
      return {types: []}
    },

    onBeforeBuild() {
      GraphQLApiSchema.apiSchema.stage = 'build'
    },

    onAfterBuild(graphQLSchema) {
      GraphQLApiSchema.setGraphQLSchema(graphQLSchema)
    }
  })
}
