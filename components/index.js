import React, { Component } from 'react'
import Maps from '../services/map'

module.exports = ({ state, dispatch }) => <div style={{height: '100vh', width: '100%'}}><Maps state={state} dispatch={dispatch} /></div>
