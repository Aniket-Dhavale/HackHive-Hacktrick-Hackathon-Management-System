import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Search, Filter, Calendar, Users, MapPin, Clock, ArrowUpDown } from 'lucide-react';

// Mock data - replace with actual data from your backend
const mockHackathons = [
  {
    id: 1,
    title: "AI Innovation Challenge",
    description: "Build the next generation of AI-powered applications",
    startDate: "2024-04-15",
    endDate: "2024-04-17",
    location: "Virtual",
    maxParticipants: 100,
    currentParticipants: 45,
    prizePool: "₹5,00,000",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
    status: "upcoming",
    registrationDeadline: "2024-04-10",
    theme: "Artificial Intelligence"
  },
  {
    id: 2,
    title: "Web3 Development Hackathon",
    description: "Create innovative blockchain solutions",
    startDate: "2024-05-01",
    endDate: "2024-05-03",
    location: "San Francisco, CA",
    maxParticipants: 150,
    currentParticipants: 89,
    prizePool: "₹7,50,000",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
    status: "upcoming",
    registrationDeadline: "2024-04-25",
    theme: "Blockchain"
  },
  {
    id: 3,
    title: "Healthcare Tech Innovation",
    description: "Develop solutions for modern healthcare challenges",
    startDate: "2024-05-15",
    endDate: "2024-05-17",
    location: "Bangalore, India",
    maxParticipants: 120,
    currentParticipants: 78,
    prizePool: "₹6,00,000",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    status: "upcoming",
    registrationDeadline: "2024-05-10",
    theme: "Healthcare"
  },
  {
    id: 4,
    title: "Sustainable Tech Solutions",
    description: "Build eco-friendly technology solutions",
    startDate: "2024-06-01",
    endDate: "2024-06-03",
    location: "Virtual",
    maxParticipants: 200,
    currentParticipants: 156,
    prizePool: "₹8,00,000",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80",
    status: "upcoming",
    registrationDeadline: "2024-05-25",
    theme: "Sustainability"
  },
  {
    id: 5,
    title: "FinTech Innovation Challenge",
    description: "Create next-gen financial technology solutions",
    startDate: "2024-06-15",
    endDate: "2024-06-17",
    location: "Mumbai, India",
    maxParticipants: 180,
    currentParticipants: 92,
    prizePool: "₹10,00,000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    status: "upcoming",
    registrationDeadline: "2024-06-10",
    theme: "FinTech"
  },
  {
    id: 6,
    title: "EdTech Revolution",
    description: "Transform education through technology",
    startDate: "2024-07-01",
    endDate: "2024-07-03",
    location: "Virtual",
    maxParticipants: 150,
    currentParticipants: 45,
    prizePool: "₹4,50,000",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    status: "upcoming",
    registrationDeadline: "2024-06-25",
    theme: "Education"
  }
];

const HackathonsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredHackathons = mockHackathons
    .filter(hackathon => {
      const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hackathon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hackathon.theme.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || hackathon.status === filterStatus;
      const matchesLocation = filterLocation === 'all' || 
                            (filterLocation === 'virtual' && hackathon.location === 'Virtual') ||
                            (filterLocation === 'in-person' && hackathon.location !== 'Virtual');
      return matchesSearch && matchesStatus && matchesLocation;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case 'prize':
          comparison = parseInt(a.prizePool.replace(/[^0-9]/g, '')) - parseInt(b.prizePool.replace(/[^0-9]/g, ''));
          break;
        case 'participants':
          comparison = a.currentParticipants - b.currentParticipants;
          break;
        case 'deadline':
          comparison = new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime();
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <Code2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">HackVerse</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                Sign In
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Hackathons</h1>
          <p className="mt-2 text-gray-600">Discover and join exciting hackathons from around the world</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search hackathons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Locations</option>
                <option value="virtual">Virtual</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="prize">Sort by Prize Pool</option>
                <option value="participants">Sort by Participants</option>
                <option value="deadline">Sort by Deadline</option>
              </select>
              <button
                onClick={toggleSortOrder}
                className="px-3 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ArrowUpDown className={`h-5 w-5 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Hackathons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border-2 border-gray-200"
            >
              <div className="relative h-48">
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    hackathon.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                    hackathon.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{hackathon.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {hackathon.theme}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{hackathon.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{hackathon.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{hackathon.currentParticipants}/{hackathon.maxParticipants} participants</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{hackathon.prizePool} prize pool</span>
                  </div>
                  <div className="text-sm text-red-600">
                    Registration Deadline: {new Date(hackathon.registrationDeadline).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate(`/hackathon/${hackathon.id}`)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHackathons.length === 0 && (
          <div className="text-center py-12">
            <Code2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hackathons found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HackathonsList; 