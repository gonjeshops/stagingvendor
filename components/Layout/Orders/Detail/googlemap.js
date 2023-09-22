// import React, { useEffect } from "react";
// import {
//   GoogleMap,
//   withScriptjs,
//   withGoogleMap,
//   Marker,
//   DirectionsRenderer,
// } from "react-google-maps";
// import { compose, withProps, lifecycle } from "recompose";
// import { GOOGLE_MAP_KEY } from "../../../../api";

const GoogleMapComponent = () => {
// compose(
//   withProps({
//     googleMapURL: GOOGLE_MAP_KEY,
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) => {
//   useEffect(() => {
//     const DirectionsService = new google.maps.DirectionsService();
//     const latLngA = new google.maps.LatLng(
//       props.origin.latitude,
//       props.origin.longitude
//     );
//     const latLngB = new google.maps.LatLng(
//       props.destination.latitude,
//       props.destination.longitude
//     );
//     let distance = google?.maps?.geometry?.spherical?.computeDistanceBetween(
//       latLngA,
//       latLngB
//     );
//     // if (distance) {
//     //   distance = Math.ceil(distance / 1000);
//     // }

//     // console.log("distancedistance=", distance);

//     DirectionsService.route(
//       {
//         origin: latLngA,
//         destination: latLngB,
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           props.setDirections(result);
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   }, [props.origin, props.destination]);
  return (
    // <GoogleMap defaultZoom={8} defaultCenter={{ lat: 30.6813, lng: 76.7258 }}>
    //   {props.isMarkerShown && (
    //     <>
    //       {props.directions && (
    //         <DirectionsRenderer
    //           // suppressInfoWindows={false}
    //           directions={props.directions}
    //           // infoWindow={"dsghfhfg"}
    //         />
    //       )}
    //       {/* <Marker position={{ lat: 30.6813, lng: 76.7258 }} />
    //       <Marker position={{ lat: 30.6813, lng: 76.7258 }} /> */}
    //     </>
    //   )}
    // </GoogleMap>
    <></>
  );
};

export default GoogleMapComponent;
