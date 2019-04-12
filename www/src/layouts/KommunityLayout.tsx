import * as React from 'react'

import '../globalStyles/colors.css'
import '../globalStyles/common.css'
import '../globalStyles/helpers.css'
import '../globalStyles/media.css'
import '../globalStyles/shadows.css'
import '../globalStyles/transitions.css'
import '../globalStyles/typography.css'

// Component used solely for controlling global style variables
// In the future, a "dark mode" would come handy in here
export const KommunityLayout: React.SFC<{}> = ({ children }) => {
  return <>{children}</>
}

KommunityLayout.displayName = 'KommunityLayout'

export default KommunityLayout
