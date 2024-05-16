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
    const [totalDistanceTravelled, setTotalDistanceTravelled] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [totalCashBack, setTotalCashBack] = useState(0);
    const [totalMilesPoints, setTotalMilesPoints] = useState(0);

    useEffect(() => {
        const fetchTransaction = async () => {
            setIsLoading(true);
            if (userId) {
                try {
                    const response = await getTransactions(userId);
                    if (response.data.status === 200 && response.data.transactions) {
                        const data = response.data;
                        const totalCashBack = data.totalCashBack;
                        const totalMilesPoints = data.totalMilesPoints;
                        const lastTransaction = data.transactions[data.transactions.length - 1];
                        const totalDistanceTravelled = data.totalDistanceTravelled;

                        setTotalDistanceTravelled(totalDistanceTravelled);
                        setTransactions(data.transactions);
                        setTotalCashBack(totalCashBack);
                        setTotalMilesPoints(totalMilesPoints);
                        console.log(response.data.transactions); 
                    } else {
                        if (response.data.message === 'No transactions found for this user yet. You should navigate to the new Trip page to get claiming your rewards') {
                            setModalMessage(response.data.message);
                            setShowModal(true);
                        }
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    if (error.response && error.response.data) {
                        console.error(error.response.data);
                    }
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
            <Container fluid>
                <Row> 
                    <Col md={8}>
                        <Row className='mb-5'>
                            <Col lg={8} className='me-5'>
                                <h1>Track Your Rewards in Real-Time</h1>
                                <h4>With our Passenger Reward System, every journey brings you closer to amazing rewards. Stay on top of your progress and make every trip count!</h4>
                            </Col>
                            <Col md className='mb-3'>
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
                                        <h1 className='mt-5'>{isLoading ? 'Loading...' : `$${totalCashBack}`}</h1>
                                        <Card.Text>Last earned 3 days ago</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='justify-content-md-start'>
                            <Col md className='mb-3'>
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
                                        <h1 className='mt-5'>{isLoading ? 'Loading...' : `$${totalCashBack}`}</h1>
                                        <Card.Text>Last earned 3 days ago</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md className='mb-3'>
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
                                        <h1 className='mt-5'>{isLoading ? 'Loading...' : `$${totalMilesPoints}`}</h1>
                                        <Card.Text>Last earned 3 days ago</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md className='mb-3'>
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
                                        <h1 className='mt-5'>{isLoading ? 'Loading...' : `${totalDistanceTravelled} KM`}</h1>
                                        <Card.Text>Moved with us 3 days ago</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col md className='order-1 order-sm-0'> 
                        <img src={travelsImage} alt="Description" className="img-fluid d-none d-md-block shadow" style={{ width: '400px', height: '400px', borderRadius: '5%', border: '1px solid black' }}/>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <h3>Trip History</h3>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Cash Back Earned</th>
                                <th>Miles Point Earned</th>
                                <th>Trip details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions && transactions.map((transaction, index) => {
                                const date = new Date(transaction.createdAt);
                                const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

                                return (
                                    <tr key={index}>
                                        <td>{formattedDate}</td>
                                        <td>${transaction.rewards[0].cashBack}</td>
                                        <td>${transaction.rewards[0].milesPoints}</td>
                                        <td>{transaction.tripDetails}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;