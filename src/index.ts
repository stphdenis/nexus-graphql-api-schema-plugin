import * as NexusSchema from '@nexus/schema'
import { GraphQLApiSchema, GraphQLApiSchemaOptions } from 'graphql-api-schema'
//import { printSchema } from 'graphql'

export interface GraphQLApiSchemaPluginOptions extends GraphQLApiSchemaOptions {}
export const graphqlApiSchema = (args?: GraphQLApiSchemaPluginOptions) => {

  const options: GraphQLApiSchemaPluginOptions = {
    dirName: 'node_modules/@types/typegen-nexus',
    fileName: 'graphqlApiSchema.json',
    jsonSpace: 2,
    ...args,
  }

  return NexusSchema.plugin({
    name: 'nexus-graphql-api-schema-plugin',
    description: 'Generate Nexus Types',
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