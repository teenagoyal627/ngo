import { useState } from "react";
import imageIcon from "./ImageIcon.png";
import { Modal } from "react-bootstrap";
const ImageWithModal = ({ imageUrl,showIcon }) => {
  const [showImageModal, setShowImage] = useState(false);

  const handleOpenModal = () => setShowImage(true);
  const handleCloseModal = () => setShowImage(false);
  return (
    <div>
    {showIcon ?(
        <img
        src={imageIcon}
        alt="Image icon"
        width="70"
        height="70"
        style={{ cursor: "pointer" }}
        onClick={handleOpenModal}
      />
    ):(
        <img
          src={imageUrl}
          alt="Patient"
          width="50"
          height="50"
          style={{ cursor: "pointer" }}
          onClick={handleOpenModal}
        />
    )}
     

      <Modal show={showImageModal} onHide={handleCloseModal} size="1g" centered>
        <Modal.Header closeButton>
          <Modal.Title>Patient Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={imageUrl}
            alt="patient image"
            style={{ width: "28rem", height: "20rem", cursor: "zoom-in" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImageWithModal;
