import React, {useState, useEffect} from 'react'
import { useMap, Marker, Popup } from 'react-leaflet'
import { senderPin } from './constant';
import { setSenderLocationDetails } from '../../reducers/locationSlice';
import { useDispatch } from 'react-redux';
import L from "leaflet";

const LocationMarker = ()=>{
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();
    const dispatch = useDispatch()

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            console.log(e.latlng)
            setPosition(e.latlng);
            dispatch(setSenderLocationDetails(e.latlng))

            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
        });
    }, [map]);

    
    return position === null ? null : (
        <Marker position={position} icon={senderPin}>
            <Popup>
                You are here. <br />
                Map bbox: <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup>
        </Marker>
        
    );
}
export default LocationMarker