import { IContentCard } from '@kompanion/types'
import { extractDomain, textToParagraphs } from '@kompanion/utils'
import * as React from 'react'

import { formatCTAs } from '../../../reusableData'
import { formatIcons } from './formatIcons'
import { QuoteIcon } from './generalIcons'
import { SkillLevelIndicator } from './levelIcons'

import './styles/content.css'

export const ContentCard: React.SFC<IContentCard> = ({
  title,
  recommendations,
  topic,
  url,
  format,
  skillLevel
}) => {
  const { length } = recommendations
  const collaborator = recommendations[0]
  const {
    handle,
    fields: { name, avatarUrl }
  } = collaborator.user
  return (
    <article className="content__card">
      <header>
        <section className="content__meta">
          <span className="content__topic">{topic}</span>
          <SkillLevelIndicator level={skillLevel} />
        </section>
        <a href={url} target="_blank" rel="noopener" className="content__title">
          <h2>{title}</h2>
        </a>
        {/* TODO: Regex */}
        <span className="content__domain">
          {formatIcons[format]({})} <strong>{formatCTAs[format]}:</strong>{' '}
          <a href={url} target="_blank" rel="noopener">
            {extractDomain(url)}
          </a>
        </span>
      </header>
      <main>
        <span className="content__quote" aria-hidden={true}>
          <QuoteIcon />
        </span>
        {textToParagraphs(collaborator.comment)}
      </main>
      <address>
        <a className="content__author" href={`/users/${handle}`}>
          <img
            src={avatarUrl}
            alt={`Profile picture from ${name}`}
            className="content__photo"
          />
          {name}
        </a>
      </address>
      {length > 1 && (
        <footer>
          <span className="content__recommended-by">
            Recommended by
            {length === 1
              ? recommendations[0].user.fields.name
              : `${length} people`}
          </span>
        </footer>
      )}
    </article>
  )
}

ContentCard.displayName = 'ContentCard'

export default ContentCard
