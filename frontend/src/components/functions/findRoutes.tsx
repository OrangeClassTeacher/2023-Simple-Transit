import * as turf from '@turf/turf';
import { Graph } from "graphlib"
import { useState } from 'react';
const { point, distance } = turf;

function findRoutes(origin: any, destination: any, busRoutesData: any, busStopData: any, setMarkerPoints: any, setInfoWindowPoints: any,
    // setDirectionsResponse: any, setStartDirectionResponse: any, setEndDirectionResponse: any
    map: any): any {

    const walkingDistance = 0.5;
    const stopsWithinWalkingDistanceToStart: any = [];
    const stopsWithinWalkingDistanceToEnd: any = [];
    const uniqueStops: any = [];
    const graph = new Graph();
    if (destination == null) {
        alert("Please input your destination")
        return;
    }

    busRoutesData.forEach((route: any) => {
        route.busStopDetails.forEach((stop: any) => {

            const stopPoint = point(stop.busStopCoord);
            const distFromOrigin = distance(point(origin), stopPoint, { units: 'kilometers' });
            const distFromDestination = distance(point(destination), stopPoint, { units: 'kilometers' });

            if (distFromOrigin <= walkingDistance) {
                const key = stop.busStopName + JSON.stringify(stop.busStopCoord);
                const index = uniqueStops.findIndex((item: any) => item.key === key);
                if (index === -1) {
                    uniqueStops.push({ key, stop });
                    stopsWithinWalkingDistanceToStart.push(stop.busStopName);
                }
            }

            if (distFromDestination <= walkingDistance) {
                const key = stop.busStopName + JSON.stringify(stop.busStopCoord);
                const index = uniqueStops.findIndex((item: any) => item.key === key);
                if (index === -1) {
                    uniqueStops.push({ key, stop });
                    stopsWithinWalkingDistanceToEnd.push(stop.busStopName);
                }
            }
        });
    });

    busRoutesData.forEach((route: any) => {
        const stops = route.busStopDetails.map((stop: any) => stop.busStopName);

        for (let i = 0; i < stops.length - 1; i++) {
            const from = stops[i];
            const to = stops[i + 1];
            graph.setEdge(from, to, route.busRouteId);
        }
    });

    const queue: any = [];
    const visited = new Set();
    stopsWithinWalkingDistanceToStart.forEach((startStop: any) => {
        queue.push([{ name: startStop, route: null }]);
    });

    const routes = [];
    while (queue.length > 0) {
        const path = queue.shift();
        const lastStop = path[path.length - 1];
        if (stopsWithinWalkingDistanceToEnd.includes(lastStop.name)) {
            routes.push(path);
            continue;
        }
        if (visited.has(lastStop.name)) {
            continue;
        }
        visited.add(graph.hasNode(lastStop.name) ? lastStop.name : null);

        if (graph.hasNode(lastStop.name)) {
            const neighbors = graph.successors(lastStop.name);
            neighbors?.forEach((neighbor: any) => {
                const edge = graph.edge(lastStop.name, neighbor);
                const route = { name: neighbor, route: edge };
                queue.push([...path, route]);
            });
        }
    }

    const formattedRoutes = routes.map((route) => {
        const formattedPath = route.map((stop: any) => {
            const stopName = stop.name;
            const routeId = stop.route;

            return { stopName, routeId };
        });
        return formattedPath;
    });

    setInfoWindowPoints(formattedRoutes[0])
    if (formattedRoutes.length > 0) {
        console.log(formattedRoutes);
        const newStops = formattedRoutes[0].map((e: any) => e.stopName)
        console.log(newStops);
        console.log(busStopData);
        const newArra = busStopData.filter((e: any) =>
            newStops.includes(e.busStopName))
            .sort((a: any, b: any) => {
                const indexA = newStops.indexOf(a.busStopName);
                const indexB = newStops.indexOf(b.busStopName);
                return indexA - indexB;
            });
        const Arr: any = []
        newArra.map((e: any) => { Arr.push({ lat: e.busStopCoord[0], lng: e.busStopCoord[1] }) })
        setMarkerPoints(Arr)
        {

            const directionsService = new google.maps.DirectionsService();

            const startDirectionsRenderer = new google.maps.DirectionsRenderer({
                map: map,
                polylineOptions: {
                    strokeColor: "#0000FF",
                    strokeOpacity: 0.7,
                    strokeWeight: 4,
                    icons: [
                        {
                            icon: {
                                path: "M 0,-1 0,1",
                                strokeOpacity: 1,
                                scale: 4,
                            },
                            offset: "0",
                            repeat: "20px",
                        },
                    ],
                },
                suppressMarkers: true,
            });

            const endDirectionsRenderer = new google.maps.DirectionsRenderer({
                map: map,
                polylineOptions: {
                    strokeColor: "#0000FF",
                    strokeOpacity: 0.7,
                    strokeWeight: 4,
                    icons: [
                        {
                            icon: {
                                path: "M 0,-1 0,1",
                                strokeOpacity: 1,
                                scale: 4,
                            },
                            offset: "0",
                            repeat: "20px",
                        },
                    ],
                },
                suppressMarkers: true,
            });
            const directionsRenderer = new google.maps.DirectionsRenderer({
                map: map,
                polylineOptions: {
                    strokeColor: "#FF0000",
                },
                suppressMarkers: true,
            });

            startDirectionsRenderer.setDirections(null)
            endDirectionsRenderer.setMap(null)
            directionsRenderer.setMap(null)

            //     const startDirectionsRequest = {
            //         origin: { lat: origin[0], lng: origin[1] },
            //         destination: { lat: Arr[0].lat, lng: Arr[0].lng },
            //         travelMode: google.maps.TravelMode.WALKING,
            //     };

            //     const endDirectionRequest = {
            //         origin: { lat: Arr[Arr.length - 1].lat, lng: Arr[Arr.length - 1].lng },
            //         destination: { lat: destination[0], lng: destination[1] },
            //         travelMode: google.maps.TravelMode.WALKING,
            //     };

            //     directionsService.route(startDirectionsRequest, function (response, status) {
            //         if (status === google.maps.DirectionsStatus.OK) {
            //             startDirectionsRenderer.setDirections(response);
            //             console.log(response);
            //         } else {
            //             console.log("error", status);
            //         }
            //     });

            //     directionsService.route(endDirectionRequest, function (response, status) {
            //         if (status === google.maps.DirectionsStatus.OK) {
            //             endDirectionsRenderer.setDirections(response);
            //         } else {
            //             console.log("error", status);
            //         }
            //     });



            //     const waypoints = Arr.slice(1, Arr.length - 1).map((coord) => ({
            //         location: coord,
            //         stopover: true,
            //     }));

            //     const directionsRequest = {
            //         origin: Arr[0],
            //         destination: Arr[Arr.length - 1],
            //         waypoints: waypoints,
            //         travelMode: google.maps.TravelMode.DRIVING,
            //     };

            //     directionsService.route(directionsRequest, function (response, status) {
            //         if (status === google.maps.DirectionsStatus.OK) {
            //             directionsRenderer.setDirections(response);

            //         } else {
            //             console.log("error", status);
            //         }
            //     });


        }
        return formattedRoutes;
    }
}


export default findRoutes;