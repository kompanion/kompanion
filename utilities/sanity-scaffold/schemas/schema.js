import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import objects from './objects'
import documents from './documents'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    ...objects,
    ...documents
  ])
})
