import * as React from 'react'
import SubmitForm from '../components/SubmitForm'

export const SubmitPage: React.SFC<{}> = () => {
  return (
    <>
      <h1>Send your resource</h1>
      <p>
        By filling the form below, kompanion will automatically make a pull
        request in our{' '}
        <a
          href="https://github.com/kompanion/kommunity-content"
          target="_blank"
        >
          GitHub content repository
        </a>{' '}
        to be approved by the maintainers community and added to the kommunity
        directory!
      </p>
      <SubmitForm />
    </>
  )
}

SubmitPage.displayName = 'SubmitPage'

export default SubmitPage
