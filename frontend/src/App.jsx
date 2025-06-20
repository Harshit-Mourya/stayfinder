import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateListing from "./pages/CreateListings";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import BookingForm from "./pages/BookingForm";
import ListingDetails from "./pages/ListingDetails";
import EditListing from "./pages/EditListing";
import Unauthorized from "./pages/Unauthorized";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 overflow-y-scroll scrollbar-hide h-screen">
      <Navbar />

      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route
          path="/createlisting"
          element={
            <PrivateRoute>
              <CreateListing />
            </PrivateRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <PrivateRoute>
              <BookingForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/editlisting/:id"
          element={
            <PrivateRoute requiredRole="host">
              <EditListing />
            </PrivateRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
