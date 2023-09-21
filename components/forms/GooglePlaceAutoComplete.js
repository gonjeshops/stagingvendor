import { useState, useEffect } from "react";
// import GooglePlacesAutocomplete, {
//   geocodeByPlaceId,
//   geocodeByLatLng,
// } from "react-google-places-autocomplete";
import { GOOGLE_ADDRESS_API_KEY } from "../../util";
// import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import {
  Autocomplete,
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";

let googleInstance;

export default function GooglePlaceAutoComplete({
  setGoogleAddreesObj,
  setNewAddress,
  locationData,
  setDeliveryFee,
}) {
  const [address, setAddress] = useState();
  const [data, setData] = useState("");
  const [addressObj, setAddressObj] = useState();
  const [autocomplete, setAutocomplete] = useState();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google_map_autocomplete",
    googleMapsApiKey: GOOGLE_ADDRESS_API_KEY,
    libraries: ["places", "geometry"],
  });

  const onPlaceChanged = (data) => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      console.log("Returned place contains no geometry");
      return;
    }
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      formattedAddress: place.formatted_address,
    };

    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case "postal_code": {
          location["zip"] = component.long_name;
          break;
        }

        case "postal_code_suffix": {
          location["zip"] = `${location?.zip}-${component.long_name}`;
          break;
        }

        case "locality":
          location["city"] = component.long_name;
          break;

        case "administrative_area_level_1": {
          location[
            "state"
          ] = `${component.long_name} (${component.short_name})`;
          break;
        }

        case "country":
          location[
            "country"
          ] = `${component.long_name} (${component.short_name})`;
          break;
      }
    }
    setAddressObj(location);
    setGoogleAddreesObj(location);
    const dataForLocation = {
      latLngA: {
        lat: parseFloat(location?.lat),
        lng: parseFloat(location?.lng),
      },
      latLngB: {
        lat: parseFloat(locationData?.latLngB.lat),
        lng: parseFloat(locationData?.latLngB.lng),
      },
    };
    calculateDistance(dataForLocation);
  };

  const calculateDistance = async (location) => {
    if (location && setDeliveryFee) {
      let distance =
        await google?.maps?.geometry?.spherical?.computeDistanceBetween(
          location.latLngA,
          location.latLngB
        );
      if (distance) {
        distance = Math.ceil(distance / 1000);
      }
      setDeliveryFee(distance * 0.5);
    }
  };

  return (
    <div className="App">
      {/* <GooglePlacesAutocomplete
        apiKey={GOOGLE_ADDRESS_API_KEY}
        selectProps={{
          isClearable: true,
          input: (provided) => ({
            ...provided,
            color: "blue",
          }),
          getSessionToken: (data) => {
            console.log("datadatadata=", data);
          },
          placeholder: "Select Address...",
          defaultInputValue: data,
          // disabled: { disabled },
          value: address,
          onChange: (val) => {
            setAddress(val);
          },
        }}
      /> */}
      {/* <pre style={{ textAlign: "left", background: "#f0f0f0", padding: 20 }}>
        {JSON.stringify(addressObj, 0, 2)}
      </pre> */}
      {isLoaded && (
        <Autocomplete
          onLoad={async (data) => {
            setAutocomplete(data);
            calculateDistance(locationData);
          }}
          onPlaceChanged={onPlaceChanged}
          onUnmount={() => {
            setAutocomplete(null);
          }}
        >
          <input
            className="form-control"
            type="text"
            placeholder="Select Address..."
            defaultValue={address}
            // className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
          />
        </Autocomplete>
      )}
    </div>
  );
}
