import * as React from 'react'
import './index.css'

export type TSkillLevels =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'allLevels'
export type TCategories =
  | 'CMS'
  | 'GraphQL'
  | 'Business'
  | 'Themes'
  | 'Workflow'
  | 'CSS'
  | 'SEO'
  | 'React'
  | 'PWA'
  | 'DevOps'
  | 'Design'
export type TFormats =
  | 'video'
  | 'article'
  | 'audio'
  | 'tutorial'
  | 'course'
  | 'book'
  | 'tool'

export interface IUser {
  handle: string
  fields: {
    avatarUrl?: string
    name: string
  }
}

export interface IRecommendation {
  comment: string // why is it important - max. 140char
  user: IUser // the handle of the user in GitHub
}

export interface IContentCardProps {
  title: string
  url: string
  recommendations: IRecommendation[]
  category: TCategories
  skillLevel?: TSkillLevels // who is it for?
  format?: TFormats
}

export const ContentCard: React.SFC<IContentCardProps> = ({
  title,
  recommendations,
  category,
  url,
  format,
  skillLevel
}) => {
  const { length } = recommendations
  const collaborator = recommendations[0]
  return (
    <div className="content__card">
      <div className="content__container">
        <span className="content__title">
          Recommended by
          {length === 1
            ? recommendations[0].user.fields.name
            : `${length} people`}
        </span>
        <span className="content__category">{category}</span>
        <h2 className="content__title">{title}</h2>
        {/* TODO: Regex */}
        <span className="content__domain">{url.replace('https://', '')}</span>
        <p className="content__comment">{collaborator.comment}</p>
        <p className="text_right content__author">
          <img
            src={collaborator.user.fields.avatarUrl}
            alt=""
            className="content__photo"
          />
          {collaborator.user.fields.name}
        </p>
        }
        <div className="content__footer">
          <span>{format}</span>
          <span>{skillLevel}</span>
        </div>
      </div>
    </div>
  )
}

ContentCard.displayName = 'ContentCard'

export default ContentCard
