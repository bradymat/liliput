import React from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

import mapStyles from './mapStyles'

module.exports = ({ state, dispatch }) => {
  const { route, location, markers } = state
  return (
    <GoogleMapLoader
      containerElement={<div style={{height: '100%', width: '100%'}} />}
      googleMapElement={
        <GoogleMap
          defaultZoom={14}
          defaultCenter={location}
          defaultOptions={{
            styles: mapStyles(),
            streetViewControl: false,
            mapTypeControl: false,
            minZoom: 12
          }}
        >
          { makeMarkers(markers, dispatch) }
        </GoogleMap>
    } />
  )
}

function makeMarkers (markers, dispatch) {
  const Markers = markers.map((marker, i) => {
    const markerOnMap = buildMarker(marker)
    return <Marker
      onClick={() => dispatch({type: 'TOGGLE_MARKER_DISPLAY', payload: marker})}
      key={i} {...markerOnMap} >
      {marker.showInfo && (
        <InfoWindow className='marker'>
          <p>{marker.address}</p>
        </InfoWindow>
      )}
    </Marker>
  })
  return Markers
}

function buildMarker (marker) {
  const icon = buildIcon(marker)
  return {
    position: {
      lat: marker.lat,
      lng: marker.lng
    },
    icon
  }
}

function buildIcon () {
  return {
    // url: 'http',
    url: 'http://image.flaticon.com/icons/png/128/167/167755.png',
    scaledSize: new google.maps.Size(40, 40)
  }
}
