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

export interface ICuratedContent {
  title: string
  url: string
  category: TCategories
  format: TFormats
  skillLevel?: TSkillLevels // who is it for?
}
