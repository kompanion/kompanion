import * as React from 'react'

export interface ISidebarProps {
  t?: string
}

export const Sidebar: React.SFC<ISidebarProps> = props => {
  return (
    <>
      <h1>sidbar</h1>
    </>
  )
}

Sidebar.displayName = 'Sidebar'

export default Sidebar
