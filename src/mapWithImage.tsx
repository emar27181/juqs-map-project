// src/MapWithImage.tsx
import { MapContainer, ImageOverlay, TileLayer } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const bounds = new LatLngBounds(
  [35.658, 139.698], // 左下
  [35.660, 139.702]  // 右上
)

const MapWithImage = () => {
  return (
    <MapContainer
      center={[35.659, 139.7]}
      zoom={17}
      style={{ height: '100vh', width: '100%' }}
    >
      {/* これを追加！ */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ImageOverlay url="/juqs1.jpg" bounds={bounds} opacity={0.8} />
    </MapContainer>
  )
}

export default MapWithImage
