# Hackathon Management System

A full-stack web application for managing hackathons, including participant registration, team management, and project submissions.

## Features

- User Authentication (Login/Register)
- Hackathon Registration
- Team Formation
- Project Submission
- Participant Dashboard
- Admin Dashboard

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hackathon-management-system.git
cd hackathon-management-system
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd hackathon-management-system
npm install

# Install backend dependencies
cd Shlok-Shlok-main/Shlok-Shlok-main/project
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
```

4. Start the development servers:
```bash
# Start backend server
cd Shlok-Shlok-main/Shlok-Shlok-main/project
npm run dev

# Start frontend server (in a new terminal)
cd hackathon-management-system
npm start
```

## Project Structure

```
hackathon-management-system/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── RegistrationForm.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   └── App.tsx
├── public/
└── package.json

Shlok-Shlok-main/
└── project/
    ├── src/
    │   ├── routes/
    │   ├── models/
    │   └── index.ts
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 