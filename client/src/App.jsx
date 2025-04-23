import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import Reviews from './pages/Reviews';
import Messages from './pages/Messages';
import MyProfile from './pages/MyProfile';
import CreateProperty from './pages/CreateProperty';
import { ToastContainer } from 'react-toastify';
import PropertyDetails from './pages/PropertyDetails';
import MyProperties from './pages/MyProperties';
import AllProperties from './pages/AllProperties';
import Favorites from './pages/Favorites';


const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Redirect /dashboard to /home/dashboard */}
        <Route path="/dashboard" element={<Navigate to="/home/dashboard" replace />} />

        {/* Home with nested routes */}
        <Route path="/home" element={<Home />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-properties" element={<MyProperties />} />
          <Route path="all-properties" element={<AllProperties />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="create-property" element={<CreateProperty />} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="agents" element={<Agents />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<MyProfile />} />
        </Route>

        {/* Catch-all route to handle invalid URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
