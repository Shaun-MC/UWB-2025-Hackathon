import { GoogleMap, HeatmapLayer, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import PaginatedTweets from "./tweet_viewer.jsx";

//const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker");

const MAP_OPTIONS = {
    center: { lat: 0.0000, lng: -20.0000 }, // Center of the US

    // Other
    flint: { lat: 43.0125, lng: -83.6875 },

    // Natural Disaster
    palisades: { lat: 34.0467, lng: -118.5464 },

    // War
    gaza: { lat: 31.5017, lng: 34.4668 },
    ukraine: { lat: 50.4504, lng: 30.5245 },
    sudan: { lat: 12.8628, lng: 30.2176 },

    zoom: 3,
    mapTypeId: 'roadmap',
    radius: 20,
    opacity: .7
}

const CrisisMap = () => {

    const [map, setMap] = useState(null);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [isInfoWindowHovered, setIsInfoWindowHovered] = useState(false);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['visualization'],
    })

    const flintHeatmapPoints = [
        { lat: 43.0191, lng: -83.6873 },
        { lat: 43.0121, lng: -83.6873 },
        { lat: 43.0121, lng: -83.6873 },
        { lat: 43.0121, lng: -83.6873 },
    ]

    const palisadesHeatmapPoints = [
        { lat: 34.0467, lng: -118.5464 },
        { lat: 34.0467, lng: -118.5464 },
        { lat: 34.0467, lng: -118.5464 },
        { lat: 34.0467, lng: -118.5464 },
    ]

    const gazaHeatmapPoints = [
        { lat: 31.5017, lng: 34.4668 },
        { lat: 31.5017, lng: 34.4668 },
        { lat: 31.5017, lng: 34.4668 },
        { lat: 31.5017, lng: 34.4668 },
    ]

    const ukraineHeatmapPoints = [
        { lat: 50.4504, lng: 30.5245 },
        { lat: 50.4504, lng: 30.5245 },
        { lat: 50.4504, lng: 30.5245 },
        { lat: 50.4504, lng: 30.5245 },
    ]

    const sudanHeatmapPoints = [
        { lat: 12.8628, lng: 30.2176 },
        { lat: 12.8628, lng: 30.2176 },
        { lat: 12.8628, lng: 30.2176 },
        { lat: 12.8628, lng: 30.2176 },
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

    // This entire structure would be replaced with the data from the NoSQL database
    const heatmapGroups = [
        {
            place: "Flint, MI",
            crisis: "Public Health Crisis",
            points: flintHeatmapPoints,
            position: MAP_OPTIONS.flint,
            reliefLinks: [
                { label: "City of Flint", url: "https://www.cityofflint.com/arpa/" },
                { label: "City Foundation of Greater Flint", url: "https://www.cfgf.org/grantmaking/what-we-fund/flintnow-fund" }
            ],
            summary: "The public health crisis in Flint, Michigan began when the city switched its water supply in 2014, leading to widespread lead contamination that exposed thousands of residents, especially children, to toxic drinking water.",
            tweetIDs: ["1121113365441597443", "839487495200989184", "1783457696051585040", "1101475513951051776"]
        },
        {
            place: "Palisades, CA",
            crisis: "Natural Disaster",
            points: palisadesHeatmapPoints,
            position: MAP_OPTIONS.palisades,
            reliefLinks: [
                { label: "Direct Relief", url: "https://www.directrelief.org/emergency/california-wildfires/" },
                { label: "County of Los Angeles", url: "https://lacounty.gov/relief/" }
            ],
            summary: "​The Palisades Fire of January 2025 was a devastating wildfire in Los Angeles County, driven by hurricane-force Santa Ana winds, that destroyed 6,837 structures, claimed 12 lives, and became the most destructive fire in the city's history",
            tweetIDs: ["1876751984033747448", "1877892863557812735", "1876738207317979195", "1876804472711565338"]
        },
        {
            place: "Gaza City, Palestine",
            crisis: "War/CivilWar",
            points: gazaHeatmapPoints,
            position: MAP_OPTIONS.gaza,
            reliefLinks: [
                { label: "Palestine Childrens Reflief Fund", url: "https://www.pcrf.net/" },
                { label: "UN Crisis Relief", url: "https://lacounty.gov/relief/" }
            ],
            summary: "The war in Palestine refers to the ongoing, deeply rooted conflict between Israelis and Palestinians over land, sovereignty, and human rights, marked by repeated outbreaks of violence, political strife, and humanitarian crises",
            tweetIDs: ["1914232563784167886", "1916053562758513069", "1711166720432279665", "1798677897022173625"]
        },
        {
            place: "Eastern Ukraine",
            crisis: "War/CivilWar",
            points: ukraineHeatmapPoints,
            position: MAP_OPTIONS.ukraine,
            reliefLinks: [
                { label: "Ukraine Crisis Relief Fund", url: "https://www.globalgiving.org/projects/ukraine-crisis-relief-fund/" },
                { label: "Ukraine Relief Fund", url: "https://www.ukrainefund.net/" }
            ],
            summary: "The war in Ukraine began in 2022 when Russia launched a full-scale invasion, leading to widespread destruction, international sanctions, and a major humanitarian crisis as Ukraine fought to defend its sovereignty.",
            tweetIDs: ["1916166405226991731", "1742065489801609613", "1915756429673431296", "1846542353634357437"]
        },
        {
            place: "Sudan",
            crisis: "War/CivilWar",
            points: sudanHeatmapPoints,
            position: MAP_OPTIONS.sudan,
            reliefLinks: [
                { label: "Helping Hand For Relief and Development", url: "https://www1.hhrd.org/Campaigns/Sudanese-Refugee-Relief" },
                { label: "Sudan Relief Fund", url: "https://sdnrlf.com/" }
            ],
            summary: "The war in Sudan erupted in April 2023 between rival military factions, the Sudanese Army and the Rapid Support Forces, causing widespread violence, displacement, and a growing humanitarian disaster.",
            tweetIDs: ["1647728939689754630", "1912112336367738974", "191294284429515986", "1912155599766200572"]
        },
    ];

    return (
        <main className="crisis-map">
            <GoogleMap mapContainerStyle={{ position: 'relative', width: '100%', height: '100vh' }}
                center={MAP_OPTIONS.center}
                zoom={MAP_OPTIONS.zoom}
                onLoad={(map) => setMap(map)}
            >
                {map && heatmapGroups.map((group) => (
                    <HeatmapLayer
                        key={group.id}
                        data={group.points.map(point => new window.google.maps.LatLng(point.lat, point.lng))}
                        options={{
                            radius: MAP_OPTIONS.radius,
                            opacity: MAP_OPTIONS.opacity,
                        }}
                    />
                ))}
                {map && heatmapGroups.map((group) => (
                    <Marker
                        key={group.place + "-marker"}
                        position={group.position}
                        opacity={0} // Make marker invisible
                        onMouseOver={() => setHoveredMarker(group)}
                        onMouseOut={() => {
                            // Set a small timeout to give the mouse time to move to the InfoWindow
                            setTimeout(() => {
                                if (!isInfoWindowHovered) {
                                    setHoveredMarker(null);
                                }
                            }, 100);
                        }}
                    />
                ))}
                {hoveredMarker && (
                    <InfoWindow
                        position={hoveredMarker.position}
                        options={{ pixelOffset: new window.google.maps.Size(0, -5) }}
                        onCloseClick={() => {
                            setHoveredMarker(null);
                            setIsInfoWindowHovered(false);
                        }}
                    >
                        <div style={{ color: "black", padding: "5px", maxWidth: "300px", maxHeight: "400px" }}
                            onMouseEnter={() => setIsInfoWindowHovered(true)}
                            onMouseLeave={() => setIsInfoWindowHovered(false)}>
                            <h3>{hoveredMarker.label}</h3>
                            <div>
                                <strong>Summary:</strong>
                                <p>{hoveredMarker.summary}</p>
                            </div>
                            <div>
                                <strong>Relief Links:</strong>
                                <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                                    {hoveredMarker.reliefLinks.map((link, index) => (
                                        <li key={index}>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <strong>Recent Tweets:</strong>
                                <PaginatedTweets tweetIDs={hoveredMarker.tweetIDs} />
                            </div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap >
        </main >
    )
}

export default CrisisMap;