/* eslint-disable react/prop-types */
import { Button, Modal } from 'react-bootstrap';

const Modals = ({ showModal, handleClose, body, hasBackButton }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        {/* <Modal.Title>{title}</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {hasBackButton && <Button variant="secondary" onClick={handleClose}>Back</Button>}
        {!hasBackButton && <Button variant="primary" onClick={handleClose}>OK</Button>}
      </Modal.Footer>
    </Modal>
  )
}

export default Modals;