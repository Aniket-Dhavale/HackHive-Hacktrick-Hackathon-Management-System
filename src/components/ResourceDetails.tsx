import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code2, ArrowLeft, ExternalLink, Info, CheckCircle } from 'lucide-react';

// Mock data for resources - in a real app, this would come from your backend
const resourcesData = {
  'aws-credits': {
    name: 'AWS Credits',
    description: 'Get $500 in AWS credits for your project',
    details: [
      'Valid for 12 months from activation',
      'Can be used for any AWS service',
      'Includes technical support',
      'No credit card required'
    ],
    steps: [
      'Sign up for an AWS account',
      'Enter your hackathon registration ID',
      'Receive credits via email within 24 hours',
      'Activate credits in your AWS account'
    ],
    link: 'https://aws.amazon.com/activate/'
  },
  'github-pro': {
    name: 'GitHub Pro Access',
    description: 'Free GitHub Pro access for 3 months',
    details: [
      'Full access to GitHub Pro features',
      'Unlimited private repositories',
      'Advanced security features',
      'Priority support'
    ],
    steps: [
      'Visit the GitHub Education portal',
      'Submit your hackathon registration',
      'Receive GitHub Pro access within 48 hours',
      'Enjoy 3 months of premium features'
    ],
    link: 'https://education.github.com/'
  },
  'dev-tools': {
    name: 'Development Tools',
    description: 'Access to premium development tools',
    details: [
      'JetBrains IDE suite access',
      'Figma Pro for UI/UX design',
      'Adobe Creative Cloud access',
      'Various API testing tools'
    ],
    steps: [
      'Create an account on our platform',
      'Select your preferred tools',
      'Receive access credentials',
      'Start using the tools immediately'
    ],
    link: 'https://hackverse.com/dev-tools'
  },
  'api-access': {
    name: 'API Access',
    description: 'Free API access for various services',
    details: [
      'Stripe API integration',
      'Google Cloud Platform APIs',
      'Microsoft Azure services',
      'OpenAI API credits'
    ],
    steps: [
      'Register for API access',
      'Receive API keys and documentation',
      'Set up your development environment',
      'Start building with the APIs'
    ],
    link: 'https://hackverse.com/api-access'
  },
  'cloud-computing': {
    name: 'Cloud Computing Resources',
    description: 'Access to cloud computing platforms',
    details: [
      'Google Cloud Platform credits',
      'Microsoft Azure credits',
      'DigitalOcean credits',
      'IBM Cloud credits'
    ],
    steps: [
      'Choose your preferred cloud platform',
      'Create an account',
      'Apply your credits',
      'Start deploying your applications'
    ],
    link: 'https://hackverse.com/cloud-computing'
  }
};

const ResourceDetails = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const resource = resourcesData[resourceId as keyof typeof resourcesData];

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resource not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center mb-6">
            <ExternalLink className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">{resource.name}</h1>
          </div>

          <p className="text-xl text-gray-600 mb-8">{resource.description}</p>

          <div className="space-y-8">
            {/* Key Details */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-600" />
                Key Details
              </h2>
              <ul className="space-y-3">
                {resource.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* How to Access */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Access</h2>
              <ol className="space-y-3">
                {resource.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Action Button */}
            <div className="pt-6">
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Access Resource
                <ExternalLink className="h-5 w-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourceDetails; 