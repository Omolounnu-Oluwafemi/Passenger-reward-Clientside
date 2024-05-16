/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap';
import { loginUser, UserContext } from '../api/api.jsx';
import Modals from '../components/Modals.jsx'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
     const { setUserId } = useContext(UserContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await loginUser(formData)
        if (response.status === 200) {
            console.log(response.data.user.userId);
            setUserId(response.data.user.userId);
            setSuccess(response.data.message);
            setErrors(null);
            } else {
            console.error(response.data.message);
            setErrors(response.data.message);
            setSuccess(null);
            }
        } catch (error) {
        console.error(error.response.data);
        setErrors(error.response.data.message);
        setSuccess(null);
        }
      setShowModal(true);
  }
    
    const handleClose = () => {
        setShowModal(false);
        if (!errors) {
            navigate('/dashboard'); 
        }
    }

    return (
        <>
        <Modals 
        showModal={showModal} 
        handleClose={handleClose} 
        // title={errors ? errors : success}
        body={errors ? errors : "You have successfully logged in! You will now be redirected to your Dashboard."}
        hasBackButton={!!errors}
        />
       
        <Container fluid className="d-flex align-items-center justify-content-center bg-success" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <h1>Login</h1>
                <h5>Continue to enjoy your rewards on your every ride with us🎁</h5>
                <Form onSubmit={handleSubmit} className='mt-4'>
                    <Form.Group controlId="formBasicEmail" className='mb-2'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className="form-control-lg" type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className='mb-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="form-control-lg" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='mt-4 w-100 p-3'>
                        Submit
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