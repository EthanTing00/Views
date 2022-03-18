import React, { useRef, useState, useEffect, useCallback } from "react";
import "./ModalForm.css";

const ModalForm = (props) => {
  // console.log("You've selected: " + props.data.properties.title);

  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const modalRef = useRef();
  const { showModalForm, setShowModalForm } = props;

  const closeModal = (e) => {
    // console.log("hey1");
    if (modalRef.current === e.target) {
      setShowModalForm(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      title: title,
      description: description,
      address: address,
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
      creator: "u2",
    });
    console.log(body);

    const url = "http://localhost:5000/api/places";

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    });

    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       title: title,
    //       description: description,
    //       address: address,
    //       coordinates: { lat: latitude, lng: longitude },
    //       creator: "u2",
    //     }),
    //   });
    //   const responseData = await response.json();
    // } catch (err) {
    //   throw err;
    // }
  };

  return (
    <div className="form-modal" ref={modalRef} onClick={closeModal}>
      <a className="form-modal-content">
        <div className="image-upload" />
        <form onSubmit={handleSubmit}>
          <input
            id="title"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            // onInput={inputHandler}
          />
          <input
            id="description"
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            // onInput={inputHandler}
          />
          <input
            id="address"
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            // onInput={inputHandler}
          />
          <input
            id="lat"
            type="number"
            step="0.0001"
            placeholder="Latitude"
            onChange={(e) => setLatitude(e.target.value)}
            // onInput={inputHandler}
          />
          <input
            id="lng"
            type="number"
            step="0.0001"
            placeholder="Longitude"
            onChange={(e) => setLongitude(e.target.value)}
            // onInput={inputHandler}
          />

          <input type="submit" value="Submit" />
        </form>
      </a>
    </div>
  );
};

export default ModalForm;
