import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code2, Calendar, Users, MapPin, Clock, ArrowLeft, ExternalLink, Mail, Github, Linkedin } from 'lucide-react';

interface Hackathon {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  maxParticipants: number;
  currentParticipants?: number;
  prizePool: string;
  status?: string;
  registrationDeadline: string;
  theme: string;
  image?: string;
  eligibility?: {
    age?: string;
    skillLevel?: string;
    teamSize?: string;
    requirements?: string[];
  };
  schedule?: Array<{
    date?: string;
    events?: Array<{
      time?: string;
      title?: string;
      description?: string;
    }>;
  }>;
  prizes?: Array<{
    rank?: string;
    amount?: string;
    description?: string;
  }>;
  sponsors?: string[];
  mentors?: Array<{
    name?: string;
    role?: string;
    company?: string;
  }>;
  resources?: Array<{
    name?: string;
    link?: string;
    description?: string;
  }>;
  contact?: {
    email?: string;
    discord?: string;
    website?: string;
  };
}

const HackathonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/hackathons/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/not-found');
            return;
          }
          throw new Error('Failed to fetch hackathon');
        }

        const data = await response.json();
        // Ensure all optional fields have defaults
        const safeHackathon = {
          ...data,
          eligibility: data.eligibility || {
            age: 'Not specified',
            skillLevel: 'Not specified',
            teamSize: 'Not specified',
            requirements: []
          },
          schedule: data.schedule || [],
          prizes: data.prizes || [],
          sponsors: data.sponsors || [],
          mentors: data.mentors || [],
          resources: data.resources || [],
          contact: data.contact || {
            email: '',
            discord: '',
            website: ''
          }
        };
        setHackathon(safeHackathon);
      } catch (err) {
        setError('Failed to load hackathon details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Code2 className="mx-auto h-12 w-12 text-blue-600 animate-pulse" />
          <p className="mt-4 text-lg text-gray-600">Loading hackathon details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Code2 className="mx-auto h-12 w-12 text-red-600" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Error loading hackathon</h3>
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

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Code2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Hackathon not found</h3>
          <button
            onClick={() => navigate('/hackathons')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Hackathons
          </button>
        </div>
      </div>
    );
  }
  const renderList = (items: any[] | undefined, renderItem: (item: any, index: number) => React.ReactNode) => {
    if (!items || items.length === 0) {
      return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-600">No items available</p>
        </div>
      );
    }
    return items.map(renderItem);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90">
          <img
            src={hackathon.image || '/default-hackathon.jpg'}
            alt={hackathon.title}
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/default-hackathon.jpg';
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-white">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm mb-4 inline-block">
                {hackathon.theme}
              </span>
              <h1 className="text-4xl font-bold mb-4">{hackathon.title}</h1>
              <p className="text-xl mb-6">{hackathon.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>
                    {new Date(hackathon.startDate).toLocaleDateString()} - {' '}
                    {new Date(hackathon.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{hackathon.venue}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>
                    {hackathon.currentParticipants}/{hackathon.maxParticipants} participants
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Register by: {new Date(hackathon.registrationDeadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <button 
                onClick={() => navigate(`/register/${hackathon._id}`)}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Eligibility */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Eligibility</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Age</h3>
                  <p className="text-gray-700">{hackathon?.eligibility?.age || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Skill Level</h3>
                  <p className="text-gray-700">{hackathon?.eligibility?.skillLevel || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Team Size</h3>
                  <p className="text-gray-700">{hackathon?.eligibility?.teamSize || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  {renderList(
                    hackathon?.eligibility?.requirements,
                    (req, i) => <li key={i} className="list-disc list-inside">{req}</li>
                  )}
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Schedule</h2>
              {renderList(hackathon?.schedule, (day, dayIndex) => (
                <div key={dayIndex} className="border-l-2 border-blue-500 pl-4 mb-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {day.date ? new Date(day.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    }) : `Day ${dayIndex + 1}`}
                  </h3>
                  {renderList(day.events, (event, eventIndex) => (
                    <div key={eventIndex} className="flex items-start mb-4">
                      <div className="w-24 flex-shrink-0">
                        <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                          {event.time || 'TBD'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title || 'Activity'}</h4>
                        {event.description && (
                          <p className="text-gray-600 mt-1">{event.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </section>

            {/* Prizes */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Prizes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {renderList(hackathon?.prizes, (prize, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg hover:shadow transition-shadow">
                    <h3 className="font-bold text-xl mb-2">{prize.rank || 'Prize'}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{prize.amount || 'TBD'}</p>
                    <p className="text-gray-600">{prize.description || 'Details coming soon'}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Sponsors */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Sponsors</h2>
              <div className="grid grid-cols-2 gap-4">
                {renderList(hackathon?.sponsors, (sponsor, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">{sponsor || 'Sponsor'}</span>
                    </div>
                    <p className="font-semibold">{sponsor || 'Sponsor'}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Resources */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Resources</h2>
              {renderList(hackathon?.resources, (resource, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => resource.link && window.open(resource.link, '_blank')}
                >
                  <div className="flex items-center">
                    <ExternalLink className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{resource.name || 'Resource'}</p>
                      <p className="text-sm text-gray-600">{resource.description || ''}</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </section>

            {/* Contact */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <div className="space-y-4">
                {hackathon?.contact?.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    <a 
                      href={`mailto:${hackathon.contact.email}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {hackathon.contact.email}
                    </a>
                  </div>
                )}
                {hackathon?.contact?.discord && (
                  <div className="flex items-center">
                    <Github className="h-5 w-5 mr-2 text-blue-600" />
                    <a 
                      href={hackathon.contact.discord} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Join Discord
                    </a>
                  </div>
                )}
                {hackathon?.contact?.website && (
                  <div className="flex items-center">
                    <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
                    <a 
                      href={hackathon.contact.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Official Website
                    </a>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HackathonDetails;