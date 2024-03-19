import { useState } from 'react'
import FormErrors from '../FormErrors'
import { reauthenticate, Flows } from '../lib/allauth'
import ReauthenticateFlow from './ReauthenticateFlow'

export default function Reauthenticate () {
  const [password, setPassword] = useState('')
  const [response, setResponse] = useState({ fetching: false, data: null })

  function submit () {
    setResponse({ ...response, fetching: true })
    reauthenticate({ password }).then((data) => {
      setResponse((r) => { return { ...r, data } })
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }
  return (
    <ReauthenticateFlow flow={Flows.REAUTHENTICATE}>
      <p>Enter your password:</p>

      <FormErrors errors={response.data?.form?.errors} />

      <div><label>Password: <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' required /></label>
        <FormErrors errors={response.data?.error?.detail?.password} />
      </div>
      <button disabled={response.fetching} onClick={() => submit()}>Confirm</button>
    </ReauthenticateFlow>
  )
}
