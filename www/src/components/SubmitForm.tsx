import { TFormats, TSkillLevels, TTopics } from '@kompanion/types'
import * as React from 'react'
import { useFormState } from 'react-use-form-state'
import {
  contentFormats,
  contentLevels,
  contentTopics
} from '../../../reusableData'
const TITLE_MAX_LENGTH = 65

interface IFormFields {
  url: string
  user: string
  comment: string
  topic?: TTopics
  format?: TFormats
  skillLevel?: TSkillLevels
}

const initialState: IFormFields = {
  url: '',
  user: '',
  comment: ''
}

export const SubmitForm: React.SFC<{}> = () => {
  const [state, { text, textarea, radio, label, url }] = useFormState<
    IFormFields
  >(initialState, {
    withIds: true
  })
  const [isFetching, setFetching] = React.useState(false)
  const [isSubmitting, setSubmitting] = React.useState(false)
  const [title, setTitle] = React.useState('')

  console.log({ isSubmitting })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const { user, comment, ...formState } = state.values
    const finalState = {
      ...formState,
      title,
      lastUpdated: new Date().toISOString().split('T')[0],
      recommendations: [
        {
          user,
          comment
        }
      ]
    }
    try {
      const res = await window.fetch('http://localhost:3000/submit-resource', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalState),
        method: 'POST'
      })
      if (res.status === 200) {
        const json = await res.json()
        console.log(json)
      } else if (res.status === 400) {
        const formattingErr = await res.text()
        console.log(formattingErr)
      } else if (res.status === 500) {
        const internalErr = await res.text()
        console.log(internalErr)
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    }
    setSubmitting(false)
  }

  React.useEffect(() => {
    if (!isFetching) {
      return
    }
    if (!state.validity.url || !state.touched.url || state.values.url === '') {
      setFetching(false)
      return
    } else {
      fetchUrl(state.values.url)
    }
  }, [isFetching])

  const fetchUrl = async (targetUrl: string) => {
    try {
      const res = await window.fetch(
        `http://localhost:3000/fetch-url?url=${targetUrl}`
      )
      const newMeta = await res.json()
      if (newMeta && newMeta.title) {
        setTitle(newMeta.title)
      }
    } catch (err) {
      console.error(err)
    }
    setFetching(false)
  }

  const handleTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value) {
      setTitle(target.value)
    }
  }

  const canSend = (state.validity.url && state.values.url !== '') || false
  const hasUrl = canSend && state.touched.url
  const titleChars = TITLE_MAX_LENGTH - title.length
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label {...label('url')}>Resource URL / link</label>
          <input
            {...url({
              name: 'url',
              onBlur: () => setFetching(true)
            })}
            required={true}
          />
          <button type="button" disabled={!canSend}>
            {hasUrl ? 'Update' : 'Next'}
          </button>
        </fieldset>
        {hasUrl &&
          (isFetching ? (
            <h1>Loading</h1>
          ) : (
            <>
              <fieldset>
                <label htmlFor="submission_title">
                  Title for this resource
                </label>
                <input
                  id="submission_title"
                  onChange={handleTitle}
                  maxLength={TITLE_MAX_LENGTH}
                  required={true}
                  value={title}
                />
                {titleChars < 30 && (
                  <span>
                    Characters left: <b>{titleChars}</b>
                  </span>
                )}
              </fieldset>
              <fieldset>
                <label {...label('comment')}>Title for this resource</label>
                <textarea {...textarea('comment')} required={true} />
              </fieldset>
              <fieldset>
                <h2>What's the format of this content?</h2>
                {contentFormats.map(f => (
                  <div key={f}>
                    <label {...label('format', f)}>{f}</label>
                    <input {...radio('format', f)} />
                  </div>
                ))}
              </fieldset>
              <fieldset>
                <h2>Who is it for?</h2>
                {contentLevels.map(l => (
                  <div key={l}>
                    <label {...label('skillLevel', l)}>{l}</label>
                    <input {...radio('skillLevel', l)} />
                  </div>
                ))}
              </fieldset>
              <fieldset>
                <h2>Which topic does it fit in?</h2>
                {contentTopics.map(c => (
                  <div key={c}>
                    <label {...label('topic', c)}>{c}</label>
                    <input {...radio('topic', c)} />
                  </div>
                ))}
              </fieldset>
              <fieldset>
                <label {...label('user')}>
                  Finally, what is you GitHub handle?
                </label>
                <input {...textarea('user')} required={true} />
              </fieldset>
              <button type="submit">Send</button>
            </>
          ))}
      </form>
    </>
  )
}

SubmitForm.displayName = 'SubmitForm'

export default SubmitForm
