import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import yourImage from '../assets/travels.jpg'; // replace with the path to your image

function TripForm() {
    const [formData, setFormData] = useState({
        pickupPoint: '',
        dropOffPoint: '',
        distanceTravelled: '',
        tripAmount: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center bg-success" style={{ minHeight: "100vh" }}>
            <Row className="w-100" style={{ maxWidth: "1200px" }}>
                <Col md={6}>
                    <h1>Trip Details</h1>
                    <h5>Enter your trip details to calculate the fare🎁</h5>
                    <Form onSubmit={handleSubmit} className='mt-4'>
                        <Form.Group controlId="formPickupPoint" className='mb-2'>
                            <Form.Label>Pickup Point</Form.Label>
                            <Form.Control className="form-control-lg" type="text" placeholder="Enter pickup point" name="pickupPoint" value={formData.pickupPoint} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formDropOffPoint" className='mb-2'>
                            <Form.Label>Drop-off Point</Form.Label>
                            <Form.Control className="form-control-lg" type="text" placeholder="Enter drop-off point" name="dropOffPoint" value={formData.dropOffPoint} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formDistanceTravelled" className='mb-2'>
                            <Form.Label>Distance Travelled</Form.Label>
                            <Form.Control className="form-control-lg" type="number" placeholder="Enter distance travelled" name="distanceTravelled" value={formData.distanceTravelled} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formTripAmount" className='mb-2'>
                            <Form.Label>Trip Amount</Form.Label>
                            <Form.Control className="form-control-lg" type="number" placeholder="Enter trip amount" name="tripAmount" value={formData.tripAmount} onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit" className='mt-4 w-100 p-3'>
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <img src={yourImage} alt="Your description" className="img-fluid" />
                </Col>
            </Row>
        </Container>
    );
}

export default TripForm;