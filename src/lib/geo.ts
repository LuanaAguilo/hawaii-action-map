// Known Kauaʻi places with coordinates, for matching GPS to a human-readable name.
type Place = { name: string; lat: number; lng: number };

const KAUAI_PLACES: Place[] = [
  { name: "Līhuʻe", lat: 21.9811, lng: -159.3711 },
  { name: "Kapaʻa", lat: 22.0881, lng: -159.338 },
  { name: "Wailua", lat: 22.0525, lng: -159.3375 },
  { name: "Kealia Beach", lat: 22.1044, lng: -159.3075 },
  { name: "Anahola", lat: 22.1428, lng: -159.3139 },
  { name: "Kīlauea", lat: 22.2119, lng: -159.4058 },
  { name: "Princeville", lat: 22.2236, lng: -159.4783 },
  { name: "Hanalei", lat: 22.2044, lng: -159.5011 },
  { name: "Waimea", lat: 21.9567, lng: -159.6686 },
  { name: "Hanapēpē", lat: 21.9075, lng: -159.5936 },
  { name: "Kōloa", lat: 21.9061, lng: -159.4692 },
  { name: "Poʻipū", lat: 21.8744, lng: -159.4536 },
  { name: "Kalāheo", lat: 21.9236, lng: -159.5269 },
  { name: "ʻEleʻele", lat: 21.9078, lng: -159.5844 },
  { name: "Kekaha", lat: 21.9703, lng: -159.7111 },
];

// Distance between two coordinates in km (haversine formula).
function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export type LocatedPlace = {
  label: string;      // e.g. "Near Kapaʻa"
  lat: number;
  lng: number;
  onKauai: boolean;
};

// Turn raw GPS coordinates into a friendly Kauaʻi location label.
export function nearestPlace(lat: number, lng: number): LocatedPlace {
  let best: Place = KAUAI_PLACES[0];
  let bestDist = Infinity;
  for (const p of KAUAI_PLACES) {
    const d = distanceKm(lat, lng, p.lat, p.lng);
    if (d < bestDist) {
      bestDist = d;
      best = p;
    }
  }
  // If they're more than ~80km from any Kauaʻi town, they're off-island (e.g. testing from elsewhere).
  const onKauai = bestDist <= 80;
  return {
    label: onKauai ? (bestDist < 1.5 ? best.name : `Near ${best.name}`) : "Off-island location",
    lat,
    lng,
    onKauai,
  };
}