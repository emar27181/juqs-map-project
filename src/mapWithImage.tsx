// MapWithFixedSizeImages.tsx
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'

const photos = [
  {
    id: 'photo1',
    title: '渋谷のJUQS',
    lat: 35.6595,
    lng: 139.7005,
    image_url: '/juqs1.jpg',
    description: '渋谷駅近くで見つけたJUQSのグラフィティ。',
    date_taken: '2025-05-20'
  },
  {
    id: 'photo2',
    title: '原宿のJUQS',
    lat: 35.6675,
    lng: 139.708,
    image_url: '/juqs1.jpg',
    description: '竹下通り近くで見つけた作品。',
    date_taken: '2025-05-21'
  }
]

const FixedSizeImageOverlay = ({ photo }: { photo: typeof photos[0] }) => {
  const map = useMap()
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePosition = () => {
      if (!map || !divRef.current) return

      const point = map.latLngToContainerPoint([photo.lat, photo.lng])
      divRef.current.style.left = `${point.x - 32}px`
      divRef.current.style.top = `${point.y - 32}px`
    }

    updatePosition()
    map.on('move', updatePosition)
    map.on('zoom', updatePosition)

    return () => {
      map.off('move', updatePosition)
      map.off('zoom', updatePosition)
    }
  }, [map, photo.lat, photo.lng])

  return (
    <div
      ref={divRef}
      className="fixed-image"
      style={{
        position: 'absolute',
        width: '64px',
        height: '64px',
        pointerEvents: 'auto',
        zIndex: 600,
      }}
      title={`${photo.title}\n${photo.description}\n撮影日: ${photo.date_taken}`}
    >
      <img
        src={photo.image_url}
        alt={photo.title}
        width={128}
        height={128}
        style={{ borderRadius: '8px', border: '2px solid white' }}
      />
    </div>
  )
}

const MapWithImages = () => {
  const centerLat = 35.663
  const centerLng = 139.704

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={16}
        style={{ height: '100%', width: '100%', zIndex: 500 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {photos.map(photo => (
          <FixedSizeImageOverlay key={photo.id} photo={photo} />
        ))}
      </MapContainer>
    </div>
  )
}

export default MapWithImages
