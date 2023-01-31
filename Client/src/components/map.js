import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
///useref, usecallback, useMemo
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { BsPinMapFill } from "react-icons/bs";
import {
  setSenderLocationDetails,
  setRecepientLocationDetails,
} from "../reducers/locationSlice";
import icon from "./constant";

const center = { lat: 27.685590690097943, lng: 85.34457821701662 };
const Map = () => {
  // const [senderLatLng, setSenderLatLng] = useState({ lat: 27.685590690097943, lng: 85.34457821701662 });
  // const [receiverLatLng, setReceiverLatLng] = useState({ lat: 27.685590690097943, lng: 85.34457821701662 });

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const { senderLocationDetails } = useSelector((state) => state.location);
    const map = useMap();

    const dispatch = useDispatch();
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        debugger;

        if (
          senderLocationDetails.lat != e.latlng.lat ||
          senderLocationDetails.lng != e.latlng.lng
        ) {
          dispatch(setSenderLocationDetails(e.latlng));
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
    const { senderLocationDetails } = useSelector((state) => state.location);
    const dispatch = useDispatch();
    const [draggable, setDraggable] = useState(false);
    const [distance, setDistance] = useState(0);
    const [position, setPosition] = useState(center);

    const markerRef = useRef(null);

    const caculateDistance = (map) => {
      //current draggle marker latlng can be retrieved from current markerReference
      const currentDragLatLng = markerRef.current.getLatLng();
      // latlng of sender(non-moving marker) can be fetched from redux using use selector :senderLocationDetails
      const currentSenderLatLng = senderLocationDetails;
      //please write a distance calculation code here
      console.log(currentDragLatLng, currentSenderLatLng);
      // var line = L.Polyline ([currentDragLatLng, currentSenderLatLng], {color: 'red'}).addTo(map);

      // var pointList = [currentDragLatLng, currentSenderLatLng];
      // var firstpolyline = new L.Polyline(pointList, {
      //   color: "red",
      //   weight: 3,
      //   opacity: 0.5,
      //   smoothFactor: 1,
      // });
      // firstpolyline.addTo(map);

      function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // radius of Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        lat1 = lat1 * (Math.PI / 180);
        lat2 = lat2 * (Math.PI / 180);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
      }
      const distance = getDistance(
        currentDragLatLng.lat,
        currentDragLatLng.lng,
        currentSenderLatLng.lat,
        currentSenderLatLng.lng
      );
      const pointA = [currentDragLatLng.lat, currentDragLatLng.lng];
      const pointB = [currentSenderLatLng.lat, currentSenderLatLng.lng];
      const point = [pointA, pointB];

      return (distance(), point)

      // it should be based on selectors
      //if you generate
    };
  
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
            dispatch(
              setRecepientLocationDetails(markerRef.current.getLatLng())
            );
            alert(caculateDistance());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        icon={icon}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>'Drag and Drop to any location'</span>
        </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      center={[27.685590690097943, 85.34457821701662]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <DraggableMarker />
      {/* <Polyline positions={point} /> */}
    </MapContainer>
  );
};

export default Map;
