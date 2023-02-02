import React, { useState, useMemo, useRef, useCallback } from "react";
import { Marker, Popup, } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDistance, setRecepientLocationDetails,setReceipentAddress } from "../../reducers/locationSlice"
import icon from "./constant";
import { receiverMarker } from "./constant";

const DraggableMarker = ()=>{
    const center =[27.685590690097943, 85.34457821701662]
    const { senderLocationDetails } = useSelector(state => state.location)
    const dispatch = useDispatch()
    const [draggable, setDraggable] = useState(false)
    const [distance, setDistance] = useState(0)
    const [position, setPosition] = useState(center)

    const markerRef = useRef(null)

    const caculateDistance = (senderLocationDetails) => {
      //current draggle marker latlng can be retrieved from current markerReference
      const currentDragLatLng = markerRef.current.getLatLng()
      // latlng of sender(non-moving marker) can be fetched from redux using use selector :senderLocationDetails 
      const currentSenderLatLng = senderLocationDetails
      //please write a distance calculation code here
        const toRadian = n => (n * Math.PI) / 180

        let lat2 = currentSenderLatLng.lat
        let lon2 = currentSenderLatLng.lng
        let lat1 = currentDragLatLng.lat
        let lon1 = currentDragLatLng.lng
    
        let R = 6371  // km
        let x1 = lat2 - lat1
        let dLat = toRadian(x1)
        let x2 = lon2 - lon1
        let dLon = toRadian(x2)
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        let distance = R * c
        return distance
    }


    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
            const recepientDetails = {
             lat: markerRef.current.getLatLng().lat ,
             lng: markerRef.current.getLatLng().lng ,
            }
            fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${markerRef.current.getLatLng().lat}&lon=${markerRef.current.getLatLng().lng}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`)
            .then((res)=>res.json()).then((data=> dispatch(setReceipentAddress(data?.features[0].properties?.formatted))))
            dispatch(setRecepientLocationDetails(recepientDetails))
            const distance = caculateDistance(senderLocationDetails)
            dispatch(setCurrentDistance(distance))
          }
        },
      }),
      [senderLocationDetails],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return (
        
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        icon={receiverMarker}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            'Drag and Drop to any location'
          </span>
        </Popup>
      </Marker>
    )
  }

  export default DraggableMarker