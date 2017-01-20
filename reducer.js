module.exports = (state, { type, payload }) => {
  const newState = require('clone')(state)
  switch (type) {
    case 'CHANGE_ROUTE':
      newState.routeHistory.push(newState.route)
      return { ...newState, route: payload }
    case 'BACK_BUTTON':
      newState.route = newState.routeHistory.pop()
      return newState
    case 'SAVE_MY_LOCATION':
      newState.location = payload
      return newState
    case 'ADD_NEW_MARKER':
      var markers = [ ...newState.markers ]
      markers.push(payload)
      return { ...newState, markers }
    case 'TOGGLE_MARKER_DISPLAY':
      const toggleMarker = newState.markers.find((marker) => payload.placeId === marker.placeId)
      const value = toggleMarker.showInfo
      newState.markers.map((marker) => {
        marker.showInfo = false
      })
      toggleMarker.showInfo = !value
      return newState
    default:
      return newState
  }
}
