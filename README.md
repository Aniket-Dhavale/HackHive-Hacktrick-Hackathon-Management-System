# HackVerse - Hackathon Management System

A modern, full-stack platform for organizing and participating in hackathons. Built with React, TypeScript, and Tailwind CSS.

## Features

### For Participants
- Browse and search hackathons
- Register for hackathons
- Access project resources and documentation
- Submit projects
- Track submission status

### For Organizers
- Create and manage hackathons
- Set up registration forms
- Manage participant submissions
- Track hackathon progress

### For Judges
- Evaluate project submissions
- Provide detailed feedback
- Score projects based on multiple criteria
- Access private scoreboard

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ishaa306/hackathon-management-system.git
cd hackathon-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # React components
├── routes/            # Route configurations
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── App.tsx            # Main application component
```

## Available Routes

- `/` - Home page
- `/hackathons` - List of all hackathons
- `/hackathon/:id` - Individual hackathon details
- `/host` - Host a new hackathon
- `/register/:id` - Register for a hackathon
- `/participant-dashboard` - Participant dashboard
- `/resources/:resourceId` - Resource details
- `/judge/*` - Judge dashboard and related routes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/hackathon-management-system](https://github.com/yourusername/hackathon-management-system) 