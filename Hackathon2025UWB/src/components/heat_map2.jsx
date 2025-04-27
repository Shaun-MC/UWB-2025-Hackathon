"use client"
import { GoogleMap, HeatmapLayer, useJsApiLoader, Marker} from "@react-google-maps/api";
import { useState} from "react";

//const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker");

const STARTING_MAP_OPTIONS = {
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 12,
    mapTypeId: 'roadmap',
    radius: 50,
    opacity: 1
}

const CrisisMap = () => {

    const [map, setMap] = useState(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['visualization'],
    })

    const heatmapPoints = [
        {lat: 40.7128, lng: -74.0060},
        {lat: 40.7128, lng: -74.0060},
        {lat: 40.7128, lng: -74.0060},
        {lat: 40.7128, lng: -74.0060},
        {lat: 40.7128, lng: -74.0060},
        {lat: 40.7128, lng: -74.0060},
        {lat: 40.7128, lng: -74.0060},
    ]

    /*const heatmapPoints = useMemo(() => {
        if (!fetchedCrises) return []

        console.log("fetchedCrises", fetchedCrises)
        return fetchedCrises.map(crisis => ({
            location: new window.google.maps.LatLng(crisis.latitude, crisis.longitude),
            weight: 3
        }));
    }, [fetchedCrises]);*/

    if (!isLoaded) {
        return <div>Loading...</div>
    } else if (loadError) {
        return <div>Map cannot be loaded right now.</div>
    }

    return (
        <main className="crisis-map">
            <GoogleMap mapContainerStyle={{ position: 'relative', width: '100%', height: '100vh' }}
                center={STARTING_MAP_OPTIONS.center}
                zoom={STARTING_MAP_OPTIONS.zoom}
                onLoad={(map) => setMap(map)}
            >
                {map && heatmapPoints &&
                    <>
                        <HeatmapLayer
                            data={heatmapPoints.map(data => new window.google.maps.LatLng(data.lat, data.lng))}
                            options={{
                                radius: STARTING_MAP_OPTIONS.radius,
                                opacity: STARTING_MAP_OPTIONS.opacity,
                            }}
                        />
                        <Marker position={STARTING_MAP_OPTIONS.center} />
                    </>
                }
            </GoogleMap>
        </main>
    )
}

export default CrisisMap;