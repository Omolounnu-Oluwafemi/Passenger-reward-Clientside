import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { registerUser } from '../api/api.jsx';
import Modals from '../components/Modals.jsx';
import "./../App.css";

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        const errors = {};
        if (!formData.email) {
            errors.email = 'Email is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        if (!formData.passwordConfirm) {
            errors.passwordConfirm = 'Please confirm your password';
        }
        if (formData.password !== formData.passwordConfirm) {
            errors.passwordMatch = 'Passwords do not match';
        }
        setErrors(errors);
        
        if (Object.keys(errors).length > 0) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await registerUser(formData);
            if (response.status === 200 && !response.data.error) {
                console.log(response.data.message);
                setSuccess(response.data.message);
                setErrors({});
            } else {
                console.error(response.data.message);
                setErrors({ submit: response.data.error || response.data.message });
            }
        } catch (error) {
            console.error(error.response.data);
            setErrors({ submit: error.response.data.error || error.response.data.message });
        }
        setIsLoading(false);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        if (!errors.submit) {
            navigate('/login');
        }
    };

    return (
        <>
            <Modals
                showModal={showModal}
                handleClose={handleClose}
                body={errors.submit ? errors.submit : "You have successfully signed up! You will now be redirected to the login page."}
                hasBackButton={!!errors.submit}
            />
            <Container fluid className="d-flex align-items-center justify-content-center custom-form text-white" style={{ minHeight: "100vh" }}>
                <div className="w-100 form-shadow px-5 py-0 pt-5 mt-5" style={{ maxWidth: "600px" }}>
                    <h1>Signup</h1>
                    <h5>Join the train of Passengers that gets reward from their every trip🎁</h5>
                    <Form onSubmit={handleSubmit} className='mt-4'>
                        <Form.Group controlId="formBasicEmail" className='mb-2'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className={`form-control-lg ${errors.email && 'is-invalid'}`} type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                            <div className="invalid-feedback">{errors.email}</div>
                        </Form.Group>

                        <Form.Group controlId="formBasicFirstName" className='mb-2'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className="form-control-lg" type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName" className='mb-2'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className="form-control-lg" type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className='mb-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control className={`form-control-lg ${errors.password && 'is-invalid'}`} type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                            <div className="invalid-feedback">{errors.password}</div>
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmPassword" className='mb-2'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control className={`form-control-lg ${errors.passwordConfirm && 'is-invalid'}`} type="password" placeholder="Confirm Password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
                            <div className="invalid-feedback">{errors.passwordConfirm}</div>
                            {errors.passwordMatch && <div className="invalid-feedback">{errors.passwordMatch}</div>}
                        </Form.Group>

                        <Button variant="primary" type="submit" className='mt-4 w-100 p-3' disabled={isLoading}>
                            {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
                        </Button>
                        <p className="text-center mt-3">
                            Already have an account? <Link to="/login" className='text-decoration-none'>Log in</Link>
                        </p>
                    </Form>
                </div>
            </Container>
        </>
    );
}

export default Signup;
