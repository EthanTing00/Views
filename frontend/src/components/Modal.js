import React, {useRef, useEffect, useCallback} from "react";
import "./Modal.css";

const Modal = (props) => {
  // console.log("You've selected: " + props.data.properties.title);

  const modalRef = useRef();
  const {showModal, setShowModal} = props;
//   const modalRef = useRef();

  const closeModal = (e) => {
    console.log("hey")
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
    // setShowModal(false);
  }

  return (
    <div className="modal" ref={modalRef} onClick={closeModal}>
      {/* {showModal ? ( */}
        <p className="modal-content">
          {props.data.title} 
          <br/><br/>
          {props.data.description}
        </p>
        {/* <p className="modal-content">{props.data.description}</p> */}
      {/* ) : null} */}
    </div>
  );
  //  <div className="test">{props.data.properties.title}</div>
  // export const Modal = ({ showModal, setShowModal }) => {

  // }
};

export default Modal;
