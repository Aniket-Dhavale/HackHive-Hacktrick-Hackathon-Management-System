import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Search, Filter, Calendar, Users, MapPin, Clock, ArrowUpDown } from 'lucide-react';

interface Hackathon {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  maxParticipants: number;
  currentParticipants?: number;
  prizePool: number;
  status?: string;
  registrationDeadline: string;
  theme: string;
  image?: string;
  platform?: string;
}


const HackathonsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch hackathons from backend
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch('http://localhost:8080/home', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transform the data based on user role
        let hackathonsData: Hackathon[] = [];

        if (data.hackathons) {
          // Regular user view
          hackathonsData = data.hackathons;
        } else if (data.participantHackathons) {
          // Participant view
          hackathonsData = data.participantHackathons.map((team: any) => team.hackathonParticipatedId);
        } else if (data.organisedHackathons) {
          // Admin view
          hackathonsData = data.organisedHackathons.hackathonId;
        } else if (data.judgeHackathon) {
          // Judge view
          hackathonsData = data.judgeHackathon.hackathonId;
        }

        // Add status based on dates
        const now = new Date();
        const processedHackathons = hackathonsData.map((hackathon: any) => {
          const startDate = new Date(hackathon.startDate);
          const endDate = new Date(hackathon.endDate);
          const registrationDeadline = new Date(hackathon.registrationDeadline);

          let status = 'upcoming';
          if (now > endDate) {
            status = 'completed';
          } else if (now >= startDate && now <= endDate) {
            status = 'ongoing';
          }

          return {
            ...hackathon,
            id: hackathon._id,
            venue: hackathon.venue || 'Virtual',
            currentParticipants: hackathon.currentParticipants || 0,
            prizePool: `₹${hackathon.prizePool.toLocaleString()}`,
            status,
            image: hackathon.image || 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80'
          };
        });

        setHackathons(processedHackathons);
      } catch (err) {
        console.error('Error fetching hackathons:', err);
        setError('Failed to load hackathons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, [navigate]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const filteredHackathons = hackathons
    .filter(hackathon => {
      const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.theme.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || hackathon.status === filterStatus;
      const matchesLocation = filterLocation === 'all' ||
        (filterLocation === 'virtual' && hackathon.venue === 'Virtual') ||
        (filterLocation === 'in-person' && hackathon.venue !== 'Virtual');
      return matchesSearch && matchesStatus && matchesLocation;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case 'prize':
          //@ts-ignore
          comparison = a.prizePool.replace(/[^0-9]/g, '') - b.prizePool.replace(/[^0-9]/g, '');
          break;
        case 'participants':
          comparison = (a.currentParticipants || 0) - (b.currentParticipants || 0);
          break;
        case 'deadline':
          comparison = new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime();
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Code2 className="mx-auto h-12 w-12 text-blue-600 animate-pulse" />
          <p className="mt-4 text-lg text-gray-600">Loading hackathons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Code2 className="mx-auto h-12 w-12 text-red-600" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Error loading hackathons</h3>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      

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
              key={hackathon._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border-2 border-gray-200"
            >
              <div className="relative h-48">
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${hackathon.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                      hackathon.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>

                    {hackathon.status ? (
                      hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)
                    ) : (
                      'Upcoming'
                    )}
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
                    <span>
                      {new Date(hackathon.startDate).toLocaleDateString()} - {' '}
                      {new Date(hackathon.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{hackathon.venue}</span>
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
                    onClick={() => navigate(`/hackathon/${hackathon._id}`)}
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
        {filteredHackathons.length === 0 && !loading && (
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