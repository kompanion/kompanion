// See Sanity's docs for more info on the structure builder:
// https://www.sanity.io/docs/structure-builder
import S from '@sanity/desk-tool/structure-builder'

const singleTypes = [
  'config'
]

const hiddenDocTypes = listItem => !singleTypes.includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .showIcons(true)
    .items([
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.listItem()
        .title('General Configuration')
        .child(
          S.editor()
            .id('config')
            .schemaType('config')
            .documentId('configId')
        )
    ])
