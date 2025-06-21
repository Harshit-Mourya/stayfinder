# StayFinder

StayFinder is a full-stack web application for listing and booking properties. Users can add their own listings, explore other listings, and book properties for short or long-term stays. It includes role-based dashboards, secure authentication, and a responsive design.

## Features

### Frontend (React + Tailwind CSS)

- Homepage with property cards
- Property details page
- Login/Register with validation
- Role-based dashboard
- Create, update, delete listings (for hosts)
- Bookings and user history view
- Image upload with preview (Cloudinary)
- Filter & search by location, price, date
- Map view for listings (Leaflet)

### Backend (Node.js + Express)

- RESTful API
- JWT authentication
- CRUD operations for listings and bookings
- Role-based access control
- Cloudinary image upload support
- MongoDB database with Mongoose
- Geocoding with OpenCage API

### Database (MongoDB Atlas)

- Models: User, Listing, Booking
- Uses JWT for session handling
- Stores lat/lng for map integration

## Technologies Used

- Frontend: React, Redux Toolkit, Tailwind CSS, React Router, React Leaflet
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB Atlas
- Cloudinary for image uploads
- OpenCage API for geocoding

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas database
- Cloudinary account
- OpenCage API key

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
OPENCAGE_API_KEY=<geocoding-api-key>
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

## License

This project is for learning purposes only.
