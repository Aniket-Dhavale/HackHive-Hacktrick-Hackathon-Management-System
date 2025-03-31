import React, { useState , useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Code2, ArrowLeft, User, Mail, Phone, GraduationCap, Users, MessageSquare, Plus, Trash2, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';



      

// Add role type
type MemberRole = 'frontend' | 'backend' | 'fullstack' | 'designer' | 'ml';

interface TeamMember {
  name: string;
  email: string;
  role: MemberRole;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  education: string;
  heardFrom: string;
  lookingForTeam: boolean;
  teamPreference: MemberRole | '';
  skills: string;
  hasTeam: boolean;
  teamName: string;
  teamMembers: TeamMember[];
}

// Add proper error types
interface ApiError {
  response?: {
    data: {
      error: string;
    };
    status: number;
  };
}

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    heardFrom: '',
    lookingForTeam: false,
    teamPreference: '',
    skills: '',
    hasTeam: false,
    teamName: '',
    teamMembers: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.education.trim()) newErrors.education = 'Education is required';
    if (!formData.heardFrom) newErrors.heardFrom = 'This field is required';
    if (!formData.skills.trim()) newErrors.skills = 'Skills are required';

    // Team validation
    if (formData.hasTeam) {
      if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
      if (formData.teamMembers.length === 0) {
        newErrors.teamMembers = 'At least one team member is required';
      } else {
        formData.teamMembers.forEach((member, index) => {
          if (!member.name.trim()) newErrors[`memberName-${index}`] = 'Member name is required';
          if (!member.email.trim()) newErrors[`memberEmail-${index}`] = 'Member email is required';
          if (!member.role.trim()) newErrors[`memberRole-${index}`] = 'Member role is required';
        });
      }
    }

    // Looking for team validation
    if (formData.lookingForTeam && !formData.teamPreference) {
      newErrors.teamPreference = 'Team preference is required';
    }

    // Validate team member emails
    if (formData.hasTeam) {
      formData.teamMembers.forEach((member, index) => {
        if (member.email && !validateEmail(member.email)) {
          newErrors[`memberEmail-${index}`] = 'Please enter a valid email address';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!id) {
      toast.error('Invalid hackathon ID');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }

      // Debug: Log token (first few characters only for security)
      console.log('Token (first 10 chars):', token.substring(0, 10) + '...');

      // Format the data before sending
      const formattedData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        heardFrom: formData.heardFrom,
        lookingForTeam: formData.lookingForTeam,
        teamPreference: formData.teamPreference,
        skills: formData.skills.split(',').map(skill => skill.trim()), // Convert to array
        hasTeam: formData.hasTeam,
        teamName: formData.teamName,
        teamMembers: formData.hasTeam ? formData.teamMembers : undefined,
        hackathonId: id // Add hackathonId to the request body
      };

      // Debug: Log the complete request details
      console.log('Registration Request Details:', {
        url: `http://localhost:8080/register/${id}`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.substring(0, 10)}...`,
          'Content-Type': 'application/json'
        },
        data: formattedData
      });

      // Fixed the endpoint to match the backend route
      const response = await axios.post(
        `http://localhost:8080/register/${id}`,
        formattedData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        toast.success(formData.hasTeam ? 'Team registered successfully!' : 'Registration successful!');
        navigate('/participant-dashboard');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Debug: Log full error details
        console.error('Registration error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data
          }
        });

        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           'Registration failed';

        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again');
          navigate('/login');
        } 
        else if (error.response?.status === 400) {
          if (error.response.data.error === 'Team name already exists') {
            setErrors(prev => ({ ...prev, teamName: 'This team name is already taken' }));
            toast.error('Team name already exists');
          } else {
            // Handle other validation errors
            if (error.response.data.errors) {
              const newErrors: Record<string, string> = {};
              error.response.data.errors.forEach((err: { path: string; message: string }) => {
                newErrors[err.path] = err.message;
              });
              setErrors(newErrors);
            }
            toast.error(errorMessage);
          }
        }
        else if (error.response?.status === 500) {
          // Enhanced 500 error handling with more context
          console.error('Server error details:', {
            message: error.response.data.message,
            error: error.response.data.error,
            stack: error.response.data.stack,
            requestData: {
              hackathonId: id,
              hasTeam: formData.hasTeam,
              teamName: formData.teamName,
              teamSize: formData.teamMembers.length,
              skills: formData.skills
            }
          });

          // More specific error message based on context
          let errorMsg = 'Server error occurred. ';
          if (formData.hasTeam) {
            errorMsg += 'Please check your team details and try again.';
          } else {
            errorMsg += 'Please check your registration details and try again.';
          }
          toast.error(errorMsg);
        }
        else {
          toast.error(errorMessage);
        }
      } else {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value as MemberRole } : member
      )
    }));
    
    // Clear error when team member field is changed
    const errorKey = `member${field.charAt(0).toUpperCase() + field.slice(1)}-${index}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', email: '', role: 'frontend' }]
    }));
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
    
    // Clear any errors related to this team member
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`member`) && key.endsWith(`-${index}`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}


      {/* Form Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hackathon Registration</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="education"
                    id="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.education ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.education && (
                  <p className="mt-1 text-sm text-red-600">{errors.education}</p>
                )}
              </div>
            </div>

            {/* Team Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Team Information</h3>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasTeam"
                  id="hasTeam"
                  checked={formData.hasTeam}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasTeam" className="ml-2 block text-sm text-gray-900">
                  I have a team
                </label>
              </div>

              {formData.hasTeam ? (
                <>
                  <div>
                    <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
                      Team Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="teamName"
                        id="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.teamName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.teamName && (
                      <p className="mt-1 text-sm text-red-600">{errors.teamName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Members
                    </label>
                    {formData.teamMembers.map((member, index) => (
                      <div key={index} className="mb-4 p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-gray-900">Member {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeTeamMember(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Name"
                            value={member.name}
                            onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={member.email}
                            onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <select
                            value={member.role}
                            onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="frontend">Frontend Developer</option>
                            <option value="backend">Backend Developer</option>
                            <option value="fullstack">Full Stack Developer</option>
                            <option value="designer">Designer</option>
                            <option value="ml">ML Engineer</option>
                          </select>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="lookingForTeam"
                      id="lookingForTeam"
                      checked={formData.lookingForTeam}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="lookingForTeam" className="ml-2 block text-sm text-gray-900">
                      I'm looking for a team
                    </label>
                  </div>

                  {formData.lookingForTeam && (
                    <div>
                      <label htmlFor="teamPreference" className="block text-sm font-medium text-gray-700">
                        Preferred Role
                      </label>
                      <select
                        name="teamPreference"
                        id="teamPreference"
                        value={formData.teamPreference}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.teamPreference ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a role</option>
                        <option value="frontend">Frontend Developer</option>
                        <option value="backend">Backend Developer</option>
                        <option value="fullstack">Full Stack Developer</option>
                        <option value="designer">Designer</option>
                        <option value="ml">ML Engineer</option>
                      </select>
                      {errors.teamPreference && (
                        <p className="mt-1 text-sm text-red-600">{errors.teamPreference}</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
              
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Skills (comma-separated)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.skills ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
                )}
              </div>

              <div>
                <label htmlFor="heardFrom" className="block text-sm font-medium text-gray-700">
                  How did you hear about us?
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="heardFrom"
                    id="heardFrom"
                    value={formData.heardFrom}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.heardFrom ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select an option</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend/Colleague</option>
                    <option value="search">Search Engine</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.heardFrom && (
                  <p className="mt-1 text-sm text-red-600">{errors.heardFrom}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegistrationForm;