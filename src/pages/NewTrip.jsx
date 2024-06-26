/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import yourImage from '../assets/travels.jpg';
import { useNavigate } from 'react-router-dom';
import Modals from '../components/Modals.jsx';
import { newTransaction, UserContext } from './../api/api.jsx';

function TripForm() {
    const [formData, setFormData] = useState({
        pickupPoint: '',
        dropOffPoint: '',
        distanceTravelled: '',
        tripAmount: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await newTransaction({
                userId,
                distanceTravelled: formData.distanceTravelled,
                tripAmount: formData.tripAmount
            });

            console.log('Full response:', response);

            if (response.status === 201) {
                setSuccess(response.message || 'Transaction created successfully');
                setErrors(null);
                localStorage.setItem('pickupPoint', formData.pickupPoint);
                localStorage.setItem('dropOffPoint', formData.dropOffPoint);
                navigate('/dashboard');
            } else {
                handleError(response);
            }
        } catch (error) {
            handleError(error.response ? error.response : { message: error.message });
        }
        setIsLoading(false);
    }

    const handleError = (response) => {

        const errorMessage = response.error || response.message || 'An error occurred';
        setErrors(errorMessage);
        setModalMessage(errorMessage);
        setSuccess(null);
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        < >
            <Modals 
                showModal={showModal} 
                handleClose={handleClose} 
                body={modalMessage} 
                hasBackButton={false} 
            />
      
    <Container fluid className="d-flex align-items-center justify-content-center " style={{ minHeight: "90vh" }}>
                <Row className="w-100 form-shadow p-lg-5 p-3 rounded" style={{ maxWidth: "1200px" }}>
                    <Col md={6}>
                        <h1>Trip Details</h1>
                        <h5>Enter your trip details to calculate the fare🎁</h5>
                        <Form onSubmit={handleSubmit} className='mt-4 '>
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

                         <Button variant="primary" type="submit" className='mt-4 w-100 p-3' disabled={isLoading}>
                        {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
                    </Button>
                        </Form>
                    </Col>
                    <Col md={6} className="d-none d-md-block">
                        <img src={yourImage} alt="Your description" className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TripForm;
