import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, MapPin, Users, Target, Calendar, Award, Building2, UserCheck, BookOpen, MessageSquare } from 'lucide-react';
import axios from 'axios'
const HostHackathon = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    prizePool: '',
    registrationDeadline: '',
    
    // Location and Format
    eventType: 'virtual', // or 'in-person'
    venue: '',
    platform: '',
    platformLink: '',
    
    // Eligibility
    eligibility: {
      ageMin: '',
      ageMax: '',
      skillLevel: '',
      location: '',
      requirements: ''
    },
    
    // Theme and Tracks
    theme: '',
    tracks: [''],
    
    // Rules and Guidelines
    rules: [''],
    
    // Schedule
    schedule: [{
      date: '',
      time: '',
      event: '',
      description: ''
    }],
    
    // Sponsors and Partners
    sponsors: [''],
    
    // Mentors and Judges
    mentors: [{
      name: '',
      expertise: '',
      bio: ''
    }],
    judges: [{
      name: '',
      expertise: '',
      bio: '',
      email: '',
      invited: false
    }],
    
    // Resources
    resources: [{
      name: '',
      description: '',
      link: ''
    }],
    
    // Contact Information
    contact: {
      email: '',
      phone: '',
      discord: '',
      website: ''
    }
  });
   // Add this function to handle API submission
   const submitHackathon = async (data: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    try {
      const response = await axios.post('http://localhost:8080/hackathons', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      }
      throw error;
    }
  };

   // Modify your handleSubmit to use the API
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Format the data to match backend expectations
      const submissionData = {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        maxParticipants: formData.maxParticipants,
        prizePool: formData.prizePool,
        registrationDeadline: formData.registrationDeadline,
        eventType: formData.eventType,
        venue: formData.venue,
        platform: formData.platform,
        platformLink: formData.platformLink,
        eligibility: {
          ageMin: formData.eligibility.ageMin,
          ageMax: formData.eligibility.ageMax,
          skillLevel: formData.eligibility.skillLevel,
          location: formData.eligibility.location,
          requirements: formData.eligibility.requirements
        },
        theme: formData.theme,
        tracks: formData.tracks.filter((t: string) => t.trim() !== ''),
        rules: formData.rules.filter((r: string) => r.trim() !== ''),
        schedule: formData.schedule.map((item: any) => ({
          date: item.date,
          time: item.time,
          event: item.event,
          description: item.description
        })),
        sponsors: formData.sponsors.filter((s: string) => s.trim() !== ''),
        judges: formData.judges.map((judge: any) => ({
          name: judge.name,
          email: judge.email,
          expertise: judge.expertise,
          invited: judge.invited
        })),
        contact: formData.contact
      };

      const result = await submitHackathon(submissionData);
      console.log('Hackathon created:', result);
      navigate('/hackathons'); // Redirect to hackathons page after creation
    } catch (error: any) {
      console.error('Error creating hackathon:', error);
      
      // Handle specific error cases
      if (error.message === "A hackathon with this title already exists") {
        alert('A hackathon with this title already exists. Please choose a different title.');
      } else if (error.errors) {
        alert(`Validation errors:\n${error.errors.join('\n')}`);
      } else {
        alert(error.message || 'Failed to create hackathon. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof formData] as Record<string, unknown>,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addArrayItem = (field: string, type: 'string' | 'object') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof formData] as any[]), type === 'string' ? '' : {}]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof typeof formData]) 
        ? (prev[field as keyof typeof formData] as any[]).filter((_, i) => i !== index)
        : prev[field as keyof typeof formData]
    }));
  };

  const updateArrayItem = (field: string, index: number, value: string | object) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof typeof formData])
        ? (prev[field as keyof typeof formData] as any[]).map((item, i) => 
            i === index ? value : item
          )
        : prev[field as keyof typeof formData]
    }));
  };

  const handleInviteJudge = async (index: number) => {
    const judge = formData.judges[index];
    if (!judge.email) {
      alert('Please enter an email address for the judge');
      return;
    }

    // Here you would typically make an API call to send the invitation
    // For now, we'll just update the UI
    setFormData(prev => ({
      ...prev,
      judges: prev.judges.map((j, i) => 
        i === index ? { ...j, invited: true } : j
      )
    }));

    alert(`Invitation sent to ${judge.email}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              <p className="text-gray-600">Let's start with the essential details of your hackathon</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Hackathon Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  name="maxParticipants"
                  id="maxParticipants"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  id="startDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  id="endDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="prizePool" className="block text-sm font-medium text-gray-700">
                  Prize Pool (USD)
                </label>
                <input
                  type="number"
                  name="prizePool"
                  id="prizePool"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.prizePool}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700">
                  Registration Deadline
                </label>
                <input
                  type="datetime-local"
                  name="registrationDeadline"
                  id="registrationDeadline"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Location & Format</h2>
              <p className="text-gray-600">Choose whether your hackathon will be virtual or in-person</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="radio"
                  name="eventType"
                  id="virtual"
                  value="virtual"
                  checked={formData.eventType === 'virtual'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <label
                  htmlFor="virtual"
                  className="block w-full p-6 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center">
                      {formData.eventType === 'virtual' && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">Virtual Event</h3>
                      <p className="text-sm text-gray-500">Host your hackathon online</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="relative">
                <input
                  type="radio"
                  name="eventType"
                  id="in-person"
                  value="in-person"
                  checked={formData.eventType === 'in-person'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <label
                  htmlFor="in-person"
                  className="block w-full p-6 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center">
                      {formData.eventType === 'in-person' && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">In-Person Event</h3>
                      <p className="text-sm text-gray-500">Host your hackathon at a physical location</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {formData.eventType === 'virtual' ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                    Platform (e.g., Zoom, Discord)
                  </label>
                  <input
                    type="text"
                    name="platform"
                    id="platform"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.platform}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="platformLink" className="block text-sm font-medium text-gray-700">
                    Platform Link
                  </label>
                  <input
                    type="url"
                    name="platformLink"
                    id="platformLink"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.platformLink}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                  Venue Details
                </label>
                <textarea
                  name="venue"
                  id="venue"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.venue}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Eligibility & Theme</h2>
              <p className="text-gray-600">Define who can participate and what they'll be working on</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="eligibility.ageMin" className="block text-sm font-medium text-gray-700">
                  Minimum Age
                </label>
                <input
                  type="number"
                  name="eligibility.ageMin"
                  id="eligibility.ageMin"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.eligibility.ageMin}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="eligibility.ageMax" className="block text-sm font-medium text-gray-700">
                  Maximum Age
                </label>
                <input
                  type="number"
                  name="eligibility.ageMax"
                  id="eligibility.ageMax"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.eligibility.ageMax}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="eligibility.skillLevel" className="block text-sm font-medium text-gray-700">
                Required Skill Level
              </label>
              <select
                name="eligibility.skillLevel"
                id="eligibility.skillLevel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.eligibility.skillLevel}
                onChange={handleChange}
              >
                <option value="">Select skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="all">All Levels</option>
              </select>
            </div>

            <div>
              <label htmlFor="eligibility.location" className="block text-sm font-medium text-gray-700">
                Geographic Location (if applicable)
              </label>
              <input
                type="text"
                name="eligibility.location"
                id="eligibility.location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.eligibility.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <input
                type="text"
                name="theme"
                id="theme"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.theme}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracks
              </label>
              {formData.tracks.map((track, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={track}
                    onChange={(e) => updateArrayItem('tracks', index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter track name"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('tracks', index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('tracks', 'string')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                + Add Track
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Rules & Schedule</h2>
              <p className="text-gray-600">Set the guidelines and timeline for your hackathon</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rules and Guidelines
              </label>
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => updateArrayItem('rules', index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter rule"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('rules', index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('rules', 'string')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                + Add Rule
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule
              </label>
              {formData.schedule.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={item.date}
                      onChange={(e) => updateArrayItem('schedule', index, { ...item, date: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      value={item.time}
                      onChange={(e) => updateArrayItem('schedule', index, { ...item, time: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Event</label>
                    <input
                      type="text"
                      value={item.event}
                      onChange={(e) => updateArrayItem('schedule', index, { ...item, event: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateArrayItem('schedule', index, { ...item, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeArrayItem('schedule', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove Event
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('schedule', 'object')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                + Add Event
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Sponsors & Resources</h2>
              <p className="text-gray-600">Add information about sponsors and available resources</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sponsors
              </label>
              {formData.sponsors.map((sponsor, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={sponsor}
                    onChange={(e) => updateArrayItem('sponsors', index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter sponsor name"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('sponsors', index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('sponsors', 'string')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                + Add Sponsor
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resources
              </label>
              {formData.resources.map((resource, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={resource.name}
                      onChange={(e) => updateArrayItem('resources', index, { ...resource, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Link</label>
                    <input
                      type="url"
                      value={resource.link}
                      onChange={(e) => updateArrayItem('resources', index, { ...resource, link: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={resource.description}
                      onChange={(e) => updateArrayItem('resources', index, { ...resource, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeArrayItem('resources', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove Resource
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('resources', 'object')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                + Add Resource
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Mentors & Judges</h2>
              <p className="text-gray-600">Add information about your mentors and judges</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mentors
              </label>
              {formData.mentors.map((mentor, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={mentor.name}
                      onChange={(e) => updateArrayItem('mentors', index, { ...mentor, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expertise</label>
                    <input
                      type="text"
                      value={mentor.expertise}
                      onChange={(e) => updateArrayItem('mentors', index, { ...mentor, expertise: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={mentor.bio}
                      onChange={(e) => updateArrayItem('mentors', index, { ...mentor, bio: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeArrayItem('mentors', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove Mentor
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('mentors', 'object')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                + Add Mentor
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judges
              </label>
              {formData.judges.map((judge, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={judge.name}
                      onChange={(e) => updateArrayItem('judges', index, { ...judge, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expertise</label>
                    <input
                      type="text"
                      value={judge.expertise}
                      onChange={(e) => updateArrayItem('judges', index, { ...judge, expertise: e.target.value })}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={judge.email}
                      onChange={(e) => updateArrayItem('judges', index, { ...judge, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter judge's email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={judge.bio}
                      onChange={(e) => updateArrayItem('judges', index, { ...judge, bio: e.target.value })}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => removeArrayItem('judges', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove Judge
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInviteJudge(index)}
                      disabled={judge.invited}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        judge.invited
                          ? 'bg-green-100 text-green-800 cursor-not-allowed'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      {judge.invited ? 'Invited ✓' : 'Send Invitation'}
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('judges', 'object')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                + Add Judge
              </button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              <p className="text-gray-600">Add ways for participants to get in touch</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact.email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="contact.email"
                  id="contact.email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.contact.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="contact.phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="contact.phone"
                  id="contact.phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.contact.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="contact.discord" className="block text-sm font-medium text-gray-700">
                  Discord Server
                </label>
                <input
                  type="text"
                  name="contact.discord"
                  id="contact.discord"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.contact.discord}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="contact.website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  name="contact.website"
                  id="contact.website"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.contact.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-between">
                  {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center ${
                        currentStep >= step ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                          currentStep >= step
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Previous
              </button>
              <div className="flex space-x-4">
                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => Math.min(7, prev + 1))}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                ) : (
                  <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Creating...' : 'Create Hackathon'}
      </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HostHackathon; 