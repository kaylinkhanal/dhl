import React, { useEffect, useState, useMemo, useRef,useCallback } from "react";
///useref, usecallback, useMemo
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {useDispatch} from "react-redux";
import { BsPinMapFill } from "react-icons/bs";
import {setSenderLocationDetails,setRecepientLocationDetails} from "../reducers/locationSlice"
import icon from "./constant";

const center = { lat: 27.685590690097943, lng: 85.34457821701662 }
const Map = ()=> {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();
    const dispatch =useDispatch()
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        dispatch(setSenderLocationDetails(e.latlng))
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);
    console.log(position)
    return position === null ? null : (
        <>
        {JSON.stringify(position)}
      <Marker position={position} icon={icon}>
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


  function DraggableMarker() {
    const dispatch =useDispatch()
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
              console.log(marker.getLatLng())
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
    // {latLonSer, latLonRe}= useSt
    // function calculateDistance(){
    //     /// 
    //     return 8432
    // }
    useEffect(()=>{
        dispatch(setRecepientLocationDetails(markerRef.current.getLatLng())) 
    },[position])
    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        icon={icon}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            'Drag and Drop to any location'
          </span>
        </Popup>
      </Marker>
    )
  }

  

  return (
    <MapContainer
      center={[ 27.685590690097943, 85.34457821701662]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     <LocationMarker/>
          <DraggableMarker />
    </MapContainer>
  );
}

export default Map