import * as React from 'react'

import { boldString, italicizeString, keyFromString } from './strings'

export const textToParagraphs = (body?: string) => {
  if (body) {
    const formattedText = italicizeString(boldString(body))
    return formattedText.split('\n').map((p, i) =>
      React.createElement('p', {
        key: `${keyFromString(p, 5)}-${i}`,
        dangerouslySetInnerHTML: { __html: p }
      })
    )
  } else {
    return null
  }
}
