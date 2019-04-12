import React from 'react'
import KommunityLayout from './src/layouts/KommunityLayout'

export const wrapPageElement = ({ element, props }) => (
  <KommunityLayout {...props}>{element}</KommunityLayout>
)
