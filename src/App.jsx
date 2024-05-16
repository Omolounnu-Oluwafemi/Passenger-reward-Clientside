import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserProvider from './api/api';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewTrip from './pages/NewTrip'
import Layout from './components/Layout'

// if (import.meta.env.VITE_ENV === "production") {
//   axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// } else {
//   axios.defaults.baseURL = import.meta.env.VITE_LOCALBASE_URL;
// }

function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path="/login" element={<Login />} />
            <Route path='/dashboard' element={<Layout/>}>
              <Route index element={<Dashboard />} />
              <Route path='newtrip' element={<NewTrip />} />
            </Route>
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
