import { ICuratedContent } from './curatedContent'

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

export interface IContentCard extends ICuratedContent {
  recommendations: IRecommendation[]
}
