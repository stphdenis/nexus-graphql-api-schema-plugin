# nexus-graphql-api-schema-plugin

Make's it possible to access to the nexus schema from anywhere in source definitions of Nexus.

Nexux schema is totally defined, even all queries, mutations with the args and even more.

## Examples

See [`graphql-api-schema`](https://github.com/stphdenis/graphql-api-schema) examples.

Other example :

```ts
import { apiSchema } from 'graphql-api-schema'

schema.objectType({
  name: 'Country',
  definition(t) {
    t.id('id', {nullable: false})
    t.string('name', {nullable: true})
  }
})

schema.extendType({
  type: 'Query',
  definition(t) {
    console.info({
      name: apiSchema.types['Country'].name,
      props: apiSchema.types['Country'].fieldList,
    }) // => { name: 'Country', props: [ 'id', 'nom' ] }
    const fields = apiSchema.types['Country'].fields
    for(const field of apiSchema.types['Country'].fieldList) {
      const fieldType = fields[field].type
      if(fieldType.isNullable === false) {
        console.info(`The ${field} is of type ${fieldType.of.name} and is mandatory`)
        // => The "id" is of type "ID" and is mandatory
      } else {
          console.info(`The ${field} is of type ${fieldType.of.name} and is optional`)
        // => The "nom" is of type "String" and is optional
      }
    }
  }
})
```

## Initialisation

```ts
import { graphqlApi } from 'nexus-graphql-api-schema-plugin'

schema.use(graphqlApi({
  dirName: 'api',
  fileName: 'apiSchema.json',
}))
```

Placing the file in a monitored part of the application updates `apiSchema` during recording.
