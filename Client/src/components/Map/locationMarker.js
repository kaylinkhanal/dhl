import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setSenderAddress, setSenderLocationDetails } from "../../reducers/locationSlice"
import icon from "./constant";
import { senderMarker } from "./constant";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
  const { senderLocationDetails } = useSelector(state => state.location)
  const map = useMap();
  const dispatch = useDispatch()

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);

      if (senderLocationDetails.lat != e.latlng.lat || senderLocationDetails.lng != e.latlng.lng) {
        dispatch(setSenderLocationDetails(e.latlng))
        fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`)
          .then((res) => res.json()).then((data => dispatch(setSenderAddress(data?.features[0].properties?.formatted))))
      }

      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <>
      {JSON.stringify(position)}
      <Marker position={position} icon={senderMarker}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    </>
  );
}
export default LocationMarker