import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import Router from 'sheet-router'

import reducer from './reducer'
import createMarkerInfo from './services/map/createMarkerInfo'
import getMyPosition from './services/map/getMyPosition'

import Home from './components'

const store = createStore(reducer, require('./initialState'))
const { getState, dispatch, subscribe } = store
getMyPosition(dispatch)
createMarkerInfo(store)

const route = Router({ default: '/404' }, [
  ['/', (params) => Home]
])

subscribe(() => {
  const Component = route(getState().route)
  render(<Component state={getState()} dispatch={dispatch} />, document.querySelector('main'))
})

dispatch({type: 'INIT'})
