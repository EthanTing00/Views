import React, { useState, useRef, useEffect } from "react";
// import "./styles.css";
import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom";

import Modal from "./components/Modal";
import ModalForm from "./components/ModalForm";
import Navbar from "./components/Navbar";
import geoJson from "./chicago-parks.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGluZy1lIiwiYSI6ImNreTVjOTZ0ODBmdjAydm9hNmpmZWYybDYifQ.oRblMoPBcvnGNDXPVRgD5A";

export default function App() {
  const [lng, setLng] = useState(-79.3832);
  const [lat, setLat] = useState(43.6532);
  const [zoom, setZoom] = useState(11.5);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState("empty");
  const [showModalForm, setShowModalForm] = useState(false);

  const mapContainer = useRef("");
  // const map = useRef(null);

  useEffect(() => {
    let MAX_PITCH = 85
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      maxPitch: 60,
      minZoom: 4
    });

    const sendRequest = async () => {
      const response = await fetch('http://localhost:5000/api/places/user/u2');
      
      const responseData = await response.json();
      console.log(responseData.places)

      responseData.places.forEach((location) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([location.location.lng, location.location.lat])
          .addTo(map);
        marker.getElement().addEventListener("click", () => {
          markerClicked(location);
        });
      });



    };
    
    sendRequest()

    // geoJson.features.forEach((location) => {
    //   const marker = new mapboxgl.Marker()
    //     .setLngLat(location.geometry.coordinates)
    //     .addTo(map);
    //   marker.getElement().addEventListener("click", () => {
    //     markerClicked(location);
    //   });
    // });

  }, []);

  const markerClicked = (data) => {
    setModalInfo(data);
    // console.log(modalInfo);
    setShowModal(true);
    // alert(data.properties.title);
  };

  return (
    <div className="App">
      {showModal && (
        <Modal
          data={modalInfo}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {showModalForm && (
        <ModalForm
          // data={modalInfo}
          showModal={showModalForm}
          setShowModalForm={setShowModalForm}
        />
      )}
      <Navbar 
        showModal={showModalForm}
        setShowModalForm={setShowModalForm}
      />
      <div style={{ width: "100%", height: "100vh" }} ref={mapContainer} />
    </div>
  );
}
