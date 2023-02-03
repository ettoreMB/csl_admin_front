import { Configuration, PopupRequest, LogLevel } from '@azure/msal-browser'

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: '595770f6-6214-4ba3-bbfd-0018c535b9c8', // This is the ONLY mandatory field that you need to supply.
    authority: 'https://login.microsoftonline.com/759021f9-a104-4f0d-87c8-465b3f9c204f', // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: 'https://csl-admin-front.vercel.app/', // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
    postLogoutRedirectUri: 'https://csl-admin-front.vercel.app/login', // Indicates the page to navigate after logout.
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
  scopes: []
}

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
  scopes: ['openid', 'profile'],
  loginHint: 'example@domain.net'
}
