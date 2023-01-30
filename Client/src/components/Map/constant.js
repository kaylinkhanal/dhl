import L from "leaflet";

export const senderMarker = L.icon({
  iconSize: [48, 48],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3477/3477419.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

export const receiverMarker = L.icon({
  iconSize: [48, 48],
  iconAnchor: [30, 50],
  popupAnchor: [2, -40],
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3106/3106823.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});
