import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { receiverPin } from "./constant";
import { setReceipentLocationDetails } from '../../reducers/locationSlice';
import { useDispatch } from 'react-redux';

const DraggableMarker = () => {
    const center = {
        lat: 27.6987988,
        lng: 85.3475350,
    }
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const dispatch = useDispatch()
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

    useEffect(()=>{
        dispatch(setReceipentLocationDetails(markerRef.current.getLatLng()))
    }, [position])

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={receiverPin}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    )
}
export default DraggableMarker