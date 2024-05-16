// import { Navigate, useLocation, Route } from 'react-router-dom';
// import { UserContext } from './../api/api.jsx';
// import { useContext } from 'react';

// function ProtectedRoute({ component: Component, ...rest }) {
//     const { userId } = useContext(UserContext);

//     return (
//         <Route 
//             {...rest} 
//             element={
//                 userId ? <Component {...rest} /> : <Navigate to="/login" />
//             }
//         />
//     );
// }

// export default ProtectedRoute;