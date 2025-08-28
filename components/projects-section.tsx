'use client';
import { useEffect, useState } from 'react';

type Project = {
  _id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  team: string[];
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  /*
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);
    */

  useEffect(() => {
  const dummyProjects = [
    {
      _id: '1',
      title: 'Smart Campus Initiative',
      description: 'IoT-based automation for college infrastructure.',
      status: 'In Progress',
      progress: 75,
      team: ['Dr. Smith', 'Alice', 'Bob'],
    },
    {
      _id: '2',
      title: 'DroneAid',
      description: 'AI-powered drones for disaster relief and victim detection.',
      status: 'Testing',
      progress: 60,
      team: ['Sam', 'Rahul', 'Anita'],
    },
    {
      _id: '3',
      title: 'NMIT-Blockchain Voting',
      description: 'Blockchain-based transparent voting system.',
      status: 'Early Stage',
      progress: 20,
      team: ['Kiran', 'Maya', 'Sundar'],
    },
  ];
  setProjects(dummyProjects);
}, []);


  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Current Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <div key={project._id} className="bg-white p-6 shadow rounded-lg border">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <span className="text-xs px-2 py-1 bg-yellow-200 rounded">
                {project.status}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-2 mb-3">{project.description}</p>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="text-xs mt-2 text-gray-500">
              Team: {project.team.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
