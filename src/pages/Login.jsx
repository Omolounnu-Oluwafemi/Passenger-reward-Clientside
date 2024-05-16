/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { loginUser, UserContext } from '../api/api.jsx';
import Modals from '../components/Modals.jsx';
import './../App.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserId } = useContext(UserContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
        const response = await loginUser(formData);
        if (response.status === 200) {
            setUserId(response.data.user.userId);
            localStorage.setItem('userId', response.data.user.userId);
            setSuccess(response.data.message);
            setErrors(null);
            setShowModal(true);
        } else {
            setErrors(response.data.message);
            setSuccess(null);
            setShowModal(true);
        }
    } catch (error) {
        if (error.response.data) {  
            setErrors(error.response.data.error || 'An error occurred');
        } else {
            setErrors('An error occurred'); 
        }
        setSuccess(null);
        setShowModal(true);
        }
    setIsLoading(false);
};


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setUserId(userId);
        }
    }, []);

    const handleClose = () => {
        setShowModal(false);
        if (!errors) {
            navigate('/dashboard');
        }
    };

    return (
        <>
            <Modals
                showModal={showModal}
                handleClose={handleClose}
                body={errors ? errors : "You have successfully logged in! You will now be redirected to your Dashboard."}
                hasBackButton={!!errors}
            />

            <Container fluid className="d-flex align-items-center justify-content-center bg-secondary text-white" style={{ minHeight: "100vh" }}>
                <div className="w-100 form-shadow px-5 py-0 pt-5" style={{ maxWidth: "600px" }}>
                    <h1>Login</h1>
                    <h5>Continue to enjoy your rewards on your every ride with us🎁</h5>
                    <Form onSubmit={handleSubmit} className='mt-4'>
                       <Form.Group controlId="formBasicEmail" className='mb-2'>
                            <Form.Label>Email address</Form.Label>
    <Form.Control className={`form-control-lg ${errors && 'is-invalid'}`} type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
    {errors && <div className="invalid-feedback">{errors}</div>}
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className='mb-2'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control className={`form-control-lg ${errors && 'is-invalid'}`} type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                                {errors && <div className="invalid-feedback">{errors}</div>}
                            </Form.Group>

                        <Button variant="primary" type="submit" className='mt-4 w-100 p-3' disabled={isLoading}>
                            {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
                        </Button>

                        <p className="text-center mt-3 ">
                            Do not have an account yet? <Link to="/" className='text-decoration-none'>Sign up</Link>
                        </p>
                    </Form>
                </div>
            </Container>
        </>
    );
}

export default Login;
