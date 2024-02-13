import { useMap } from 'react-leaflet'

const MapMarkersComponent = ({ selectedCity }) => {
  const { lat, lon } = selectedCity
  const map = useMap()

  if (map && lat !== undefined && lon !== undefined) {
    map.flyTo([lat, lon], 8)
  }

  return null
}

export default MapMarkersComponent
