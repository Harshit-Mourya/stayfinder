import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateListing from "./pages/CreateListings";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import BookingForm from "./pages/BookingForm";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
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
    </Routes>
  );
}

export default App;
