/* eslint-disable  react/jsx-filename-extension */
import React from 'react'

// redux & middleware
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

// gecombineerde root reducer (combineReducers)
// import Sentry from 'sentry-expo'
import RootReducer from './Reducers'

// presentatie container rond app laadscherm
import GameContainer from './Containers/GameContainer'

// crash log reporter
// import Sentry from 'sentry-expo'
// // Sentry.enableInExpoDevelopment = true
// Sentry.config('https://22d6a0a3278d41b8a617663ad2a584b6@sentry.io/1253436', {
//   release: '0e4fdef81448dcfa0e16ecc4433ff3997aa53572',
// }).install()

// logger middleware enkel in dev
const loggerMiddleWare = createLogger(
  {
    // eslint-disable-next-line
    predicate: (getState, action) => true
  },
)

// bundel middleware in 1 enhancer, maak dan de store
const configureStore = (initState) => {
  const enhancer = compose(
    applyMiddleware(
      loggerMiddleWare,
      thunkMiddleware,
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
