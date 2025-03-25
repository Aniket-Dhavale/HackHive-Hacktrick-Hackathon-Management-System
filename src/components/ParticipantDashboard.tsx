import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, ArrowLeft, Calendar, Clock, Upload, Link, FileText, AlertCircle } from 'lucide-react';

const ParticipantDashboard = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    description: '',
    githubRepo: '',
    demoLink: '',
    presentation: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Project submitted:', projectData);
    // Show success message or redirect
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProjectData(prev => ({
        ...prev,
        presentation: e.target.files![0]
      }));
    }
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
                className="flex items-center hover:opacity-80 transition-opacity mr-4"
              >
                <Code2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">HackVerse</span>
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Submission */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Project Submission</h1>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Project submission deadline: <span className="font-semibold">April 17, 2024, 2:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                  <textarea
                    name="description"
                    value={projectData.description}
                    onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe your project, its features, and the technologies used..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repository Link</label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="url"
                      name="githubRepo"
                      value={projectData.githubRepo}
                      onChange={(e) => setProjectData(prev => ({ ...prev, githubRepo: e.target.value }))}
                      required
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Demo Link</label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="url"
                      name="demoLink"
                      value={projectData.demoLink}
                      onChange={(e) => setProjectData(prev => ({ ...prev, demoLink: e.target.value }))}
                      required
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://your-demo-link.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Presentation (PPT/Video)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="file"
                      name="presentation"
                      onChange={handleFileChange}
                      required
                      accept=".ppt,.pptx,.pdf,.mp4"
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Accepted formats: PPT, PPTX, PDF, MP4 (Max size: 50MB)
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Project
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Important Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Important Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Event Schedule</h3>
                    <p className="text-sm text-gray-600">April 15-17, 2024</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Submission Deadline</h3>
                    <p className="text-sm text-gray-600">April 17, 2024, 2:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Upload className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Submission Requirements</h3>
                    <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                      <li>Project description</li>
                      <li>GitHub repository link</li>
                      <li>Demo link</li>
                      <li>Presentation (PPT/Video)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resources</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Submission Guidelines</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Judging Criteria</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">FAQ</a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParticipantDashboard; 