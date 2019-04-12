import { IContentCard } from '@kompanion/types'
import * as React from 'react'
import './ContentCard.css'
import { textToParagraphs } from '../../../utilities/utils/lib'
import { formatIcons } from './formatIcons'

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
          <span className="content__skillLevel">{skillLevel}</span>
        </section>
        <h2 className="content__title">{title}</h2>
        {/* TODO: Regex */}
        <span className="content__domain">
          {formatIcons[format]({ fill: 'var(--grey)' })}{' '}
          {url.replace('https://', '')}
        </span>
      </header>
      <main>{textToParagraphs(collaborator.comment)}</main>
      <address>
        <a
          className="content__author"
          href={`https://github.com/${handle}`}
          target="_blank"
        >
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
