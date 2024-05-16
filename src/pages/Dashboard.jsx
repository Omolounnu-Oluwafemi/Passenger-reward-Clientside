import { Container, Row, Col, Card, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave } from 'react-icons/fa';
import '../App.css';
import travelsImage from './../assets/travels.jpg'; 
import { useState, useEffect, useContext } from 'react';
import { getTransactions, UserContext } from '../api/api';
import Modals from '../components/Modals.jsx'

function Dashboard() {
    const { userId } = useContext(UserContext);
    const [transaction, setTransaction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    const fetchTransaction = async () => {
        try {
            const response = await getTransactions(userId);
            if (response.status === 200 && response.data.user) {
                console.log(response.data.user.userId);
                setTransaction(response.data);
            } else {
                console.error(response.data.message);
                if (response.data.message === 'No transactions found for this user yet. You should navigate to the new Trip page to get claiming your rewards') {
                setModalMessage(response.data.message);
                setShowModal(true);
                }
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                console.error(error.response.data);
            }
        }
    };
    fetchTransaction();
    }, [userId]);
    
    const handleClose = () => {
        setShowModal(false);
        navigate('/dashboard/newtrip'); 
    }


    return (
        <>
            <Modals 
                showModal={showModal} 
                handleClose={handleClose} 
                body={modalMessage} 
                hasBackButton={false} 
            />
        <Container fluid className=''>
            <Row> 
                <Container fluid>
                <Row>
                    <Col className='col-md-8'>
                            <Row className=' mb-5 '>
                                <Col className='col-lg-8 me-5'>
                                <h1>Track Your Rewards in Real-Time</h1>
                                <h4>With our Passenger Reward System, every journey brings you closer to amazing rewards.Stay on top of your progress and make every trip count!</h4>
                                </Col>
                                    <Col className='col-12 col-md mb-3'>
                                    <Card className="bg-secondary text-white shadow hover-card">
                                        <Card.Body>
                                            <Row>
                                                <Col className='col-2'>
                                                    <FaMoneyBillWave/>
                                                </Col>
                                                <Col>
                                                    <Card.Title>Total earnings</Card.Title>
                                                </Col>
                                            </Row>
                                        
                                        <h1 className='mt-5'>$1400</h1>
                                        <Card.Text>Last earned 3 days ago</Card.Text>
                                    </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        <Row className='justify-content-md-start'>
                            <Col className='col-12 col-md mb-3'>
                                <Card className="bg-secondary text-white shadow hover-card">
                                    <Card.Body>
                                        <Row>
                                            <Col className='col-2'>
                                                <FaMoneyBillWave/>
                                            </Col>
                                            <Col>
                                                <Card.Title>Cash Back</Card.Title>
                                            </Col>
                                        </Row>
                                            <h1 className='mt-5'>$1400</h1>
                                        <Card.Text>Last earned 3 days ago</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='col-12 col-md mb-3'>
                                <Card className="bg-secondary text-white shadow hover-card">
                                    <Card.Body>
                                        <Row>
                                            <Col className='col-2'>
                                                <FaMoneyBillWave/>
                                            </Col>
                                            <Col>
                                                <Card.Title>Miles Points</Card.Title>
                                            </Col>
                                        </Row>
                                    
                                       <h1 className='mt-5' >$1400</h1>
                                    <Card.Text>Last earned 3 days ago</Card.Text>
                                </Card.Body>
                                </Card>
                            </Col>

                            <Col className='col-12 col-md mb-3'>
                                <Card className="bg-secondary text-white shadow hover-card">
                                    <Card.Body>
                                        <Row>
                                            <Col className='col-2'>
                                                <FaMoneyBillWave/>
                                            </Col>
                                            <Col>
                                                <Card.Title>Total distance travelled</Card.Title>
                                            </Col>
                                        </Row>
                                    
                                    <h1 className='mt-5'>14Km</h1>
                                    <Card.Text>Moved with us 3 days ago</Card.Text>
                                </Card.Body>
                                </Card>
                            </Col>

                        </Row>
                    </Col>

                        <Col className='col-12 col-md order-1 order-sm-0'> 
                        <img src={travelsImage} alt="Description" className="img-fluid d-none d-md-block shadow" style={{ width: '400px', height: '400px', borderRadius: '5%', border: '1px solid black' }}/>
                        </Col>
                </Row>
                </Container>

                <Row className='mt-3'>
                    <h3>All your Trips</h3>

                       <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Trip details</th>
                                <th>Cash Back Earned</th>
                                <th>Miles Point Earned</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>18th May, 2024</td>
                                <td>Mark Otto</td>
                                <td>Lagos to Ibadan</td>
                                <td>$140</td>
                                <td>$140</td>
                                </tr>
                            </tbody>
                        </Table>
                </Row>
            </Row>
            </Container>
        </>
    )
}

export default Dashboard;