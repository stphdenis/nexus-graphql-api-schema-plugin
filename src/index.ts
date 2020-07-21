import * as NexusSchema from '@nexus/schema'
import { GraphQLApiSchema, GraphQLApiSchemaOptions as NexusGraphQLApiSchemaPluginOptions } from 'graphql-api-schema'
//import { printSchema } from 'graphql'

export interface NexusGraphQLApiSchemaPlugin extends NexusGraphQLApiSchemaPluginOptions {}
export const nexusGraphQLApiSchemaPlugin = (args?: NexusGraphQLApiSchemaPlugin) => {

  const options: NexusGraphQLApiSchemaPluginOptions = {
    dirName: 'node_modules/@types/typegen-nexus',
    fileName: 'graphqlApiSchema.json',
    jsonSpace: 2,
    ...args,
  }

  return NexusSchema.plugin({
    name: 'graphqlApiSchemaGeneratorPlugin',
    description: 'Generate Nexus types in json format',
    onInstall(builder) {
      GraphQLApiSchema.init(options)
      return {types: []}
    },
/*    onBeforeBuild(builder) {
      GraphQLApiSchema.init(options)
    },*/
    onAfterBuild(graphQLSchema) {
      GraphQLApiSchema.setGraphQLSchema(graphQLSchema)
    },
  })
}
