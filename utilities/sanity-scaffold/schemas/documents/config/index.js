import socialMedia from './socialMedia'

const configDoc = {
  name: 'config',
  title: 'General Configuration',
  type: 'document',
  fields: [
    {
      name: 'address',
      title: 'Address',
      description: 'Onyl street and number',
      type: 'string',
      validation: Rule => Rule.required().error('Required field')
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: Rule => Rule.required().error('Required field')
    },
    {
      name: 'headerMenu',
      title: "Header's menu",
      type: 'array',
      of: [{ type: 'titledLink' }],
      validation: Rule => Rule.min(1).max(4).error('Between 1 and 4 links')
    },
    {
      name: 'social',
      title: 'Social media Links',
      type: 'socialMedia'
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'General Configuration',
        subtitle: 'Info on address, phone number, menus and social media'
      }
    }
  }
}

export default [
  configDoc,
  socialMedia
]
