module.exports = (dispatch) => {
    navigator.geolocation.getCurrentPosition((position, options) => {
      const payload = {
        lat: position.latitude,
        lng: position.longitude
      }
    dispatch({type: 'SAVE_MY_LOCATION', payload})
  })
}
