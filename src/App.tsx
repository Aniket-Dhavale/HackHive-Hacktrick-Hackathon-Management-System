import { Github, Linkedin, Code2, ExternalLink } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HostHackathon from './components/HostHackathon';
import HackathonsList from './components/HackathonsList';
import HackathonDetails from './components/HackathonDetails';
import RegistrationForm from './components/RegistrationForm';
import ParticipantDashboard from './components/ParticipantDashboard';
import ResourceDetails from './components/ResourceDetails';
import JudgeRoutes from './routes/JudgeRoutes';
import ProtectedRoute from './components/ProtectedRoutes';
import Login from './components/Login';
import LoginSuccess from './components/LoginSuccess';
import AuthButton from './components/AuthButton';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
     

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
              alt="Hackathon background"
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Connect, Create, Compete: Your Hackathon Verse
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Your All-in-One Hackathon Platform: 
            Simplifying Organization, Enhancing Participant Engagement, and Ensuring Fair Evaluations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/hackathons')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Code2 size={20} />
                View All Hackathons
              </button>
              <button 
                onClick={() => navigate('/host')}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Host a Hackathon
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Code2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Join Challenges</h3>
                <p className="text-gray-600">Participate in exciting hackathons and showcase your skills</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Github className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Host Hackathons</h3>
                <p className="text-gray-600">Host with Confidence: We Provide the Platform, You Provide the Vision</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Linkedin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fair Judging</h3>
                <p className="text-gray-600">Where Precision Meets Judgment: Fair Hackathon Evaluations</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:support@hackverse.com" className="hover:text-white transition-colors">support@hackverse.com</a></li>
                <li><a href="#" className="hover:text-white transition-colors">9876543221</a></li>
                <li className="flex space-x-4 mt-4">
                  <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                  <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                  <a href="#" className="hover:text-white transition-colors"><ExternalLink size={20} /></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; 2025 HackVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-success" element={<LoginSuccess />} />


       
        <Route element={<ProtectedRoute />}>
          <Route path="/host" element={<HostHackathon />} />
          <Route path="/hackathons" element={<HackathonsList />} />
          <Route path="/hackathon/:id" element={<HackathonDetails />} />
          <Route path="/register/:id" element={<RegistrationForm />} />
          <Route path="/participant-dashboard" element={<ParticipantDashboard />} />
          <Route path="/resources/:resourceId" element={<ResourceDetails />} />
          <Route path="/judge/*" element={<JudgeRoutes />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
