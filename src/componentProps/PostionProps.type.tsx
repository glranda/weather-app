interface Coords {
  accuracy?: number,
  altitude?: number,
  altitudeAccuracy?: number,
  heading?: number,
  latitude: number,
  longitude: number,
  speed?: number,
}

export interface PostionProps {
  coords: Coords,
  timestamp?: number
}
