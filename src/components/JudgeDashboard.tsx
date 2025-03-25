import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Code2, Star, MessageSquare, FileText,  Github, ExternalLink } from 'lucide-react';

// Define types for our data structures
type Score = {
  innovation: number;
  technical: number;
  presentation: number;
  impact: number;
};

type Project = {
  id: number;
  teamName: string;
  projectName: string;
  description: string;
  githubRepo: string;
  demoLink: string;
  presentation: string;
  scores: Score;
  feedback: string;
};

type ScoringCriterion = {
  name: keyof Score;
  label: string;
  description: string;
  maxScore: number;
};

// Mock data - replace with actual data from your backend
const mockProjects: Project[] = [
  {
    id: 1,
    teamName: "AI Innovators",
    projectName: "Smart Healthcare Assistant",
    description: "An AI-powered healthcare assistant that helps patients manage their medications and appointments.",
    githubRepo: "https://github.com/ai-innovators/healthcare-assistant",
    demoLink: "https://demo.healthcare-assistant.com",
    presentation: "https://storage.example.com/presentations/healthcare-assistant.pptx",
    scores: {
      innovation: 0,
      technical: 0,
      presentation: 0,
      impact: 0
    },
    feedback: ""
  },
  {
    id: 2,
    teamName: "Data Wizards",
    projectName: "Predictive Analytics Platform",
    description: "A platform that uses machine learning to predict market trends and business outcomes.",
    githubRepo: "https://github.com/data-wizards/predictive-analytics",
    demoLink: "https://demo.predictive-analytics.com",
    presentation: "https://storage.example.com/presentations/predictive-analytics.mp4",
    scores: {
      innovation: 0,
      technical: 0,
      presentation: 0,
      impact: 0
    },
    feedback: ""
  }
];

const scoringCriteria: ScoringCriterion[] = [
  {
    name: "innovation",
    label: "Innovation & Creativity",
    description: "How unique and creative is the solution?",
    maxScore: 25
  },
  {
    name: "technical",
    label: "Technical Implementation",
    description: "How well is the solution implemented?",
    maxScore: 25
  },
  {
    name: "presentation",
    label: "Presentation & Communication",
    description: "How well is the project presented?",
    maxScore: 25
  },
  {
    name: "impact",
    label: "Impact & Potential",
    description: "What is the potential impact of the solution?",
    maxScore: 25
  }
];

const JudgeDashboard = () => {
  const { judgeId } = useParams();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleScoreChange = (projectId: number, criterion: keyof Score, value: number) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? {
              ...project,
              scores: {
                ...project.scores,
                [criterion]: value
              }
            }
          : project
      )
    );
  };

  const handleFeedbackChange = (projectId: number, feedback: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? {
              ...project,
              feedback
            }
          : project
      )
    );
  };

  const calculateTotalScore = (scores: Score) => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Judge Dashboard</span>
            </div>
            <div className="text-sm text-gray-600">
              Judge ID: {judgeId}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Projects to Evaluate</h2>
              <div className="space-y-2">
                {projects.map(project => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedProject === project.id
                        ? 'bg-blue-50 border-blue-500'
                        : 'hover:bg-gray-50 border-gray-200'
                    } border`}
                  >
                    <div className="font-medium text-gray-900">{project.teamName}</div>
                    <div className="text-sm text-gray-600">{project.projectName}</div>
                    <div className="mt-2 flex items-center text-sm text-blue-600">
                      <Star className="h-4 w-4 mr-1" />
                      Score: {calculateTotalScore(project.scores)}/100
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project Details & Scoring */}
          <div className="lg:col-span-2">
            {selectedProject ? (
              <div className="space-y-6">
                {projects.map(project => (
                  project.id === selectedProject && (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold mb-4">{project.projectName}</h2>
                      <p className="text-gray-600 mb-6">{project.description}</p>

                      {/* Project Links */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <a
                          href={project.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <Github className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="text-gray-600">GitHub Repository</span>
                        </a>
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <ExternalLink className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="text-gray-600">Live Demo</span>
                        </a>
                        <a
                          href={project.presentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <FileText className="h-5 w-5 mr-2 text-gray-600" />
                          <span className="text-gray-600">Presentation</span>
                        </a>
                      </div>

                      {/* Scoring Section */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Scoring</h3>
                        {scoringCriteria.map(criterion => (
                          <div key={criterion.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <label className="font-medium text-gray-900">{criterion.label}</label>
                                <p className="text-sm text-gray-600">{criterion.description}</p>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="number"
                                  min="0"
                                  max={criterion.maxScore}
                                  value={project.scores[criterion.name]}
                                  onChange={(e) => handleScoreChange(project.id, criterion.name, parseInt(e.target.value))}
                                  className="w-20 px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                                <span className="ml-2 text-gray-600">/ {criterion.maxScore}</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Total Score */}
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">Total Score</span>
                            <span className="text-2xl font-bold text-blue-600">
                              {calculateTotalScore(project.scores)}/100
                            </span>
                          </div>
                        </div>

                        {/* Feedback */}
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                            Feedback
                          </h3>
                          <textarea
                            value={project.feedback}
                            onChange={(e) => handleFeedbackChange(project.id, e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Provide your feedback for this project..."
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Submit Evaluation
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-600">
                Select a project to evaluate
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JudgeDashboard; 