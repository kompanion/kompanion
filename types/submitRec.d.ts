import { ICuratedContent } from './curatedContent'

export interface ISubmissionPayload extends Partial<ICuratedContent> {
  recommendations?: Array<{
    comment: string
    user: string
  }>
}

export type TSubmissionFormatErrors =
  | undefined
  | 'No body attached to the request'
  | 'No valid URL given'
  | 'No valid category given'
  | 'No valid format given'
  | 'No valid skill level given'
  | 'No title given'
  | 'Missing recommendations'
  | 'Recommendation is missing an user and/or comment'

export type TSubmissionInternalErrors =
  | undefined
  | 'Failed to get information on the repo'
  | 'Failed to create new branch'
  | 'Failed to create new file'
  | 'Failed to create new PR'
