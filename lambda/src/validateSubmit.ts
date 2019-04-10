import {
  contentCategories,
  contentFormats,
  contentLevels,
  ISubmissionPayload,
  TSubmissionFormatErrors
} from '@kompanion/types'
import { isUrl } from '@kompanion/utils'

interface IValidateSubmitReturn {
  error?: TSubmissionFormatErrors
  payload?: ISubmissionPayload
  user?: string
}

export const validateSubmit = (
  payload: ISubmissionPayload
): IValidateSubmitReturn => {
  if (!payload) {
    return { error: 'No body attached to the request' }
  }
  // TODO: run a regex match in the URL to ensure proper
  // formatting
  if (typeof payload.url !== 'string' || !isUrl(payload.url)) {
    return { error: 'No valid URL given' }
  }
  if (typeof payload.title !== 'string') {
    return { error: 'No title given' }
  }
  if (
    typeof payload.category !== 'string' ||
    contentCategories.indexOf(payload.category) < 0
  ) {
    return { error: 'No valid category given' }
  }
  if (
    typeof payload.format !== 'string' ||
    contentFormats.indexOf(payload.format) < 0
  ) {
    return { error: 'No valid format given' }
  }
  if (
    typeof payload.skillLevel === 'string' &&
    contentLevels.indexOf(payload.skillLevel) < 0
  ) {
    return { error: 'No valid skill level given' }
  }
  if (
    !Array.isArray(payload.recommendations) ||
    payload.recommendations.length < 1
  ) {
    return { error: 'Missing recommendations' }
  }
  if (
    typeof payload.recommendations[0].user !== 'string' ||
    typeof payload.recommendations[0].comment !== 'string'
  ) {
    return { error: 'Recommendation is missing an user and/or comment' }
  }
  return {
    payload,
    user: payload.recommendations[0].user
  }
}
