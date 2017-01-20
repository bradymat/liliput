import request from 'superagent'

module.exports = ({getState, dispatch}) => {
  getState().liliputs.map((address) => {
    request
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}+Otago+New+Zealand&key=AIzaSyDNqZpfY5wCQjq78QqttpZJ05714XxQTuI`)
    .end((err, res) => {
      if (!err) {
        const response = res.body.results[0]
        const placeId = response.place_id
        const lat = response.geometry.location.lat
        const lng = response.geometry.location.lng
        const newMarker = buildMarker(lat, lng, placeId, address)
        dispatch({type: 'ADD_NEW_MARKER', payload: newMarker})
      }
    })
  })
}

  function buildMarker (lat, lng, placeId, address) {
    return {
      address,
      lat,
      lng,
      showInfo: false,
      placeId
    }
  }
