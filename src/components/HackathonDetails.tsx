import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code2, Calendar, Users, MapPin, Clock, ArrowLeft, ExternalLink, Mail, Github, Linkedin } from 'lucide-react';

// Mock data - replace with actual data from your backend
const mockHackathon = {
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
  theme: "Artificial Intelligence",
  eligibility: {
    age: "18+ years",
    skillLevel: "Intermediate to Advanced",
    teamSize: "2-4 members",
    requirements: [
      "Basic programming knowledge",
      "Understanding of AI/ML concepts",
      "GitHub account",
      "Laptop with development environment"
    ]
  },
  schedule: [
    {
      date: "2024-04-15",
      events: [
        { time: "09:00 AM", title: "Opening Ceremony" },
        { time: "10:00 AM", title: "Hacking Begins" },
        { time: "02:00 PM", title: "Lunch Break" },
        { time: "08:00 PM", title: "Day 1 Wrap-up" }
      ]
    },
    {
      date: "2024-04-16",
      events: [
        { time: "09:00 AM", title: "Day 2 Begins" },
        { time: "02:00 PM", title: "Lunch Break" },
        { time: "04:00 PM", title: "Mentorship Session" },
        { time: "08:00 PM", title: "Day 2 Wrap-up" }
      ]
    },
    {
      date: "2024-04-17",
      events: [
        { time: "09:00 AM", title: "Final Day" },
        { time: "02:00 PM", title: "Project Submission" },
        { time: "04:00 PM", title: "Presentations" },
        { time: "06:00 PM", title: "Awards Ceremony" }
      ]
    }
  ],
  prizes: [
    { rank: "1st", amount: "₹2,50,000", description: "Best Overall Project" },
    { rank: "2nd", amount: "₹1,50,000", description: "Runner-up" },
    { rank: "3rd", amount: "₹1,00,000", description: "Third Place" }
  ],
  sponsors: [
    { name: "TechCorp", logo: "https://via.placeholder.com/150", tier: "Gold" },
    { name: "InnovateLabs", logo: "https://via.placeholder.com/150", tier: "Silver" },
    { name: "FutureTech", logo: "https://via.placeholder.com/150", tier: "Bronze" }
  ],
  mentors: [
    { name: "Dr. Sarah Chen", role: "AI Research Lead", company: "TechCorp" },
    { name: "Alex Kumar", role: "ML Engineer", company: "InnovateLabs" },
    { name: "Priya Patel", role: "Data Scientist", company: "FutureTech" }
  ],
  resources: [
    {
      name: "AWS Credits",
      link: "/resources/aws-credits",
      description: "Get $500 in AWS credits for your project"
    },
    {
      name: "GitHub Pro Access",
      link: "/resources/github-pro",
      description: "Free GitHub Pro access for 3 months"
    },
    {
      name: "Development Tools",
      link: "/resources/dev-tools",
      description: "Access to premium development tools"
    },
    {
      name: "API Access",
      link: "/resources/api-access",
      description: "Free API access for various services"
    },
    {
      name: "Cloud Computing Resources",
      link: "/resources/cloud-computing",
      description: "Access to cloud computing platforms"
    }
  ],
  contact: {
    email: "ai-hackathon@hackverse.com",
    discord: "https://discord.gg/ai-hackathon",
    website: "https://ai-hackathon.hackverse.com"
  }
};

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hackathon = mockHackathon; // In real app, fetch based on id

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center hover:opacity-80 transition-opacity mr-4"
              >
                <Code2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">HackVerse</span>
              </button>
              <button
                onClick={() => navigate('/hackathons')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Hackathons
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

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90">
          <img
            src={hackathon.image}
            alt={hackathon.title}
            className="w-full h-full object-cover mix-blend-overlay"
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
                  <span>{new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{hackathon.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{hackathon.currentParticipants}/{hackathon.maxParticipants} participants</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{hackathon.prizePool} prize pool</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <button 
                onClick={() => navigate(`/register/${hackathon.id}`)}
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
                  <p>{hackathon.eligibility.age}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Skill Level</h3>
                  <p>{hackathon.eligibility.skillLevel}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Team Size</h3>
                  <p>{hackathon.eligibility.teamSize}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside">
                    {hackathon.eligibility.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Schedule</h2>
              <div className="space-y-6">
                {hackathon.schedule.map((day, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4">
                    <h3 className="font-semibold mb-2">{new Date(day.date).toLocaleDateString()}</h3>
                    <div className="space-y-2">
                      {day.events.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex items-center">
                          <span className="text-gray-600 w-24">{event.time}</span>
                          <span>{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Prizes */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Prizes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hackathon.prizes.map((prize, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg">
                    <h3 className="font-bold text-xl mb-2">{prize.rank}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{prize.amount}</p>
                    <p className="text-gray-600">{prize.description}</p>
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
                {hackathon.sponsors.map((sponsor, index) => (
                  <div key={index} className="text-center">
                    <img src={sponsor.logo} alt={sponsor.name} className="mx-auto h-16 mb-2" />
                    <p className="font-semibold">{sponsor.name}</p>
                    <p className="text-sm text-gray-600">{sponsor.tier} Sponsor</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Mentors */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Mentors</h2>
              <div className="space-y-4">
                {hackathon.mentors.map((mentor, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold">{mentor.name}</p>
                      <p className="text-sm text-gray-600">{mentor.role} at {mentor.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Resources */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Resources</h2>
              <div className="space-y-4">
                {hackathon.resources.map((resource, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(resource.link)}
                  >
                    <div className="flex items-center">
                      <ExternalLink className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{resource.name}</p>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                    </div>
                    <svg 
                      className="h-5 w-5 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  <a href={`mailto:${hackathon.contact.email}`} className="text-blue-600 hover:underline">
                    {hackathon.contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Github className="h-5 w-5 mr-2 text-blue-600" />
                  <a href={hackathon.contact.discord} className="text-blue-600 hover:underline">
                    Join Discord
                  </a>
                </div>
                <div className="flex items-center">
                  <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
                  <a href={hackathon.contact.website} className="text-blue-600 hover:underline">
                    Official Website
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HackathonDetails; 