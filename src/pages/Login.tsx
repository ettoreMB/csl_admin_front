/* eslint-disable @typescript-eslint/no-misused-promises */

import { useMsal as UseMsal } from '@azure/msal-react'

export default function login () {
  const { instance, inProgress } = UseMsal()

  return (
      <>
      {inProgress === 'login' && <span>Login is currently in progress!</span>}
          <span>There are currently no users signed in!</span>
          <button onClick={async () => await instance.loginPopup()}>Login</button>
      </>
  )
}
