"use client"
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";

const STARTING_MAP_OPTIONS = {
    center: { lat: 39.5, lng: -98.35 },
    zoom: 5,
    mapTypeId: 'satellite',
    radius: 20
}

const CrisisMap = ({ fetchedCrisis }) => {

    const mapRef = useRef(null);
    const heatmapLayerRef = useRef(null);
    const [map, setMap] = useState(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['visualization'],
    })

    const createGoogleMap = (ref) => {
        if (window.google) {
            return new window.google.maps.Map(ref, STARTING_MAP_OPTIONS);
        }
        console.error("Google Maps API is not loaded.");
        return null;
    };

    const heatmapPoints = useMemo(() => {
        if (!fetchedCrisis) return []

        return fetchedCrisis.map(crisis => ({
            location: new window.google.maps.LatLng(crisis.latitude, crisis.longitude),
            weight: 3
        }));
    }, [fetchedCrisis]);

    useEffect(() => {
        if (isLoaded && mapRef.current && !map) {
            const newMap = createGoogleMap(mapRef.current);
            setMap(newMap);
        }
    }, [isLoaded, map])

    useEffect(() => {
        if (map && heatmapPoints.length > 0) {

            if (heatmapLayerRef.current) {
                heatmapLayerRef.current.setMap(null);
            }

            heatmapLayerRef.current = new window.google.maps.visualization.HeatmapLayer({
                data: heatmapPoints,
                map: map,
                zoom: STARTING_MAP_OPTIONS.zoom,
                center: STARTING_MAP_OPTIONS.center,
                mapTypeID: STARTING_MAP_OPTIONS.mapTypeId,
                radius: STARTING_MAP_OPTIONS.radius,
            })
        }
    }, [map, heatmapPoints]);

    if (loadError) {
        return <div>Map cannot be loaded right now.</div>
    }

    // Can and should add a spinner here until the map is loaded
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} loading="lazy"></div>;
};

// position="relative", width="100vw", height="100vh"
export default CrisisMap;

