import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from './locationMarker'
import DraggableMarker from './draggableMarker'
import "leaflet/dist/leaflet.css";

const LocationMap = () => {

    return (
        <MapContainer center={[27.6987904, 85.3475328]} zoom={100} style=
        {{height:'70vh'}} scrollWheelZoom>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <DraggableMarker/>
        </MapContainer>
    )
}
export default LocationMap