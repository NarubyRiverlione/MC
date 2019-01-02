/* eslint-disable  react/jsx-filename-extension */
import React from 'react'

// redux & middleware
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

// gecombineerde root reducer (combineReducers)
// import Sentry from 'sentry-expo'
import Sentry from '@sentry/browser'
import RootReducer from './Reducers'

// presentatie container rond app laadscherm
import GameContainer from './Containers/GameContainer'

// crash log reporter
// Sentry.enableInExpoDevelopment = true
Sentry.config('https://e8a6b969bee045ada485d4781c91589b@sentry.io/1363121').install()

// logger middleware enkel in dev
const loggerMiddleWare = createLogger(
  {
    // eslint-disable-next-line
    predicate: (getState, action) => process.env.NODE_ENV,
    collapsed: (getState, action, logEntry) => !logEntry.error,
  },
)

// bundel middleware in 1 enhancer, maak dan de store
const configureStore = (initState) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleWare,
    ),
  )
  return createStore(RootReducer, initState, enhancer)
}

// maak normale redux store met de config die de root reducer en middleware bevat
const store = configureStore({})

// Provider = container rond App Component om store mee te geven
const App = () => (
  <Provider store={store}>
    <GameContainer />
  </Provider>
)

export default App
