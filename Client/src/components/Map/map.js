import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "./locationMarker";
import DraggableMarker from "./draggableMarker";
import { useSelector } from "react-redux";

const Map = () => {
	const {senderLocationDetails, receipentLocationDetails} = useSelector(state=> state.location)
	const senderLocationValues = Object.values(senderLocationDetails)
	const receiverLocationValues = Object.values(receipentLocationDetails)
	const pos = [
		senderLocationValues,
		receiverLocationValues, 
	 ];
	 console.log(pos)

  return (
    <MapContainer center={[27.685590690097943, 85.34457821701662]} zoom={20} scrollWheelZoom style={{ height: "70vh" }}>
		<Polyline positions={pos} color="red" />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <DraggableMarker />
    </MapContainer>
  );
}

export default Map