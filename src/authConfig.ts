/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Configuration, PopupRequest, LogLevel } from '@azure/msal-browser'
const clientId = String(process.env.REACT_APP_CLIENT_ID)
const authorityLink = process.env.REACT_APP_AUTH_LINK
export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: authorityLink,
    redirectUri: '/',
    postLogoutRedirectUri: 'https://csl-admin-front.vercel.app/login',
    navigateToLoginRequestUrl: false // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: ({ level, message, containsPii }: any) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
        }
      }
    }
  }
}

export const loginRequest: PopupRequest = {
  scopes: ['User.Read']
}

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
  scopes: ['openid', 'profile'],
  loginHint: 'example@domain.net'
}
