import { TSkillLevels, TTopics, TFormats } from '@kompanion/types'

export const contentTopics: TTopics[] = [
  'CMS',
  'GraphQL',
  'Business',
  'Themes',
  'Workflow',
  'CSS',
  'SEO',
  'React',
  'PWA',
  'DevOps',
  'Design'
]

export const contentLevels: TSkillLevels[] = [
  'beginner',
  'intermediate',
  'advanced',
  'allLevels'
]

export const contentFormats: TFormats[] = [
  'video',
  'article',
  'audio',
  'tutorial',
  'course',
  'book',
  'tool'
]

export const readableLevels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  allLevels: 'For everyone'
}

export const formatCTAs = {
  video: 'Watch at',
  article: 'Read at',
  audio: 'Listen at',
  tutorial: 'Follow at',
  course: 'Start at',
  book: 'Read at',
  tool: 'Dive in'
}
