"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet's default marker icon references relative image paths that break
// under bundlers (Webpack/Turbopack) — trỏ lại đúng asset đã qua bundler.
const defaultIcon = L.icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export type MapPoint = {
  id: string;
  label: string;
  sublabel?: string;
  lat: number;
  lng: number;
  href?: string;
};

export function FarmMapPoints({ points }: { points: MapPoint[] }) {
  if (points.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-sm text-neutral-500">
        Chưa có điểm GPS nào để hiển thị trên bản đồ.
      </div>
    );
  }

  const center: [number, number] = [points[0].lat, points[0].lng];

  return (
    <div className="h-64 overflow-hidden rounded-lg border border-neutral-200">
      <MapContainer
        center={center}
        zoom={points.length > 1 ? 8 : 13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={defaultIcon}>
            <Popup>
              <div className="text-sm font-medium">{p.label}</div>
              {p.sublabel && (
                <div className="text-xs text-neutral-500">{p.sublabel}</div>
              )}
              {p.href && (
                <a href={p.href} className="text-xs text-emerald-700 underline">
                  Xem chi tiết
                </a>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
