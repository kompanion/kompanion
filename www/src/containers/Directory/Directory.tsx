import { IContentCard, TFormats, TSkillLevels, TTopics } from '@kompanion/types'
import { capitalizeFirstLetter } from '@kompanion/utils'
import * as React from 'react'
import { useFormState } from 'react-use-form-state'

import {
  contentFormats,
  contentLevels,
  contentTopics
} from '../../../../reusableData'
import ContentCard from '../../components/ContentCard'
import { formatIcons } from '../../components/formatIcons'

import '../../components/styles/pill-checkbox.css'
import './directory.css'

export interface IDirectoryProps {
  content: Array<{
    node: IContentCard
  }>
}

interface IFilterFields {
  skillLevels: TSkillLevels[]
  topics?: TTopics[]
  formats?: TFormats[]
}

const initialState: IFilterFields = {
  skillLevels: ['advanced', 'beginner', 'intermediate']
}

// TODO: only load the first 20 contents and then fetch from a JSON file somewhere else if the user interacts with the filters ;)

// TODO: consider adding a button to remove all filters
export const Directory: React.SFC<IDirectoryProps> = ({
  content,
  children
}) => {
  const [filteredContent, setContent] = React.useState(content)
  const [filterState, { checkbox, label }] = useFormState<IFilterFields>(
    initialState,
    {
      withIds: true,
      onChange({ target: { name } }, currState, nextState) {
        if (['formats', 'topics', 'skillLevels'].indexOf(name) >= 0) {
          filterContent(nextState)
        }
      }
    }
  )

  const filterContent = async (nextState: IFilterFields) => {
    const { formats, skillLevels, topics } = nextState
    const newContent = await content.filter(({ node }) => {
      if (
        node.skillLevel !== 'allLevels' &&
        skillLevels.indexOf(node.skillLevel) < 0
      ) {
        console.log('skill level', node)
        return false
      }
      if (
        Array.isArray(formats) &&
        formats.length > 0 &&
        formats.indexOf(node.format) < 0
      ) {
        console.log('formats', node)
        return false
      }
      if (
        Array.isArray(topics) &&
        topics.length > 0 &&
        topics.indexOf(node.topic) < 0
      ) {
        console.log('topics', node)
        return false
      }
      return true
    })
    console.log({ new: newContent.length, content: content.length, formats })
    setContent(newContent)
  }

  return (
    <div className="directory__wrapper">
      <aside className="directory__sidebar">
        <fieldset aria-title="Define the topics you want to filter by">
          <h2>Topics</h2>
          <section className="pill-checkbox__wrapper">
            {contentTopics.map(t => (
              <div className="pill-checkbox text_center" key={t}>
                <input {...checkbox('topics', t)} />
                <label {...label('topics', t)}>{t}</label>
              </div>
            ))}
          </section>
        </fieldset>
        <fieldset aria-title="Which formats you want to filter by">
          <h2>Formats</h2>
          <section className="pill-checkbox__wrapper">
            {contentFormats.map(f => (
              <div className="pill-checkbox pill-checkbox_has-icon" key={f}>
                <input {...checkbox('formats', f)} />
                <label {...label('formats', f)}>
                  {capitalizeFirstLetter(f)} {formatIcons[f]()}
                </label>
              </div>
            ))}
          </section>
        </fieldset>
        <fieldset aria-title="Filter content by skill levels">
          <h2>Skill levels</h2>
          {contentLevels
            .filter(l => l !== 'allLevels')
            .map(l => (
              <div key={l}>
                <label {...label('skillLevels', l)}>{l}</label>
                <input {...checkbox('skillLevels', l)} />
              </div>
            ))}
        </fieldset>
      </aside>
      {/* Main -> contains props.children */}
      <main className="directory__main">
        {children}
        <section className="content__wrapper">
          {filteredContent.map(({ node }) => (
            <ContentCard key={node.url} {...node} />
          ))}
        </section>
      </main>
    </div>
  )
}

Directory.displayName = 'Directory'

export default Directory
