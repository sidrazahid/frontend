import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    developerName: '',
    description: '',
    hostedURL: '',
  });

  useEffect(() => {
    // Fetch projects on component mount
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/projects', formData);
      // Refresh projects after submission
      fetchProjects();
      // Clear the form data
      setFormData({
        title: '',
        developerName: '',
        description: '',
        hostedURL: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Project Showcase</h1>

      <div>
        <h2>Submit Project</h2>
        <form onSubmit={handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <label>Developer Name:</label>
          <input
            type="text"
            value={formData.developerName}
            onChange={(e) => setFormData({ ...formData, developerName: e.target.value })}
          />

          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>

          <label>Hosted URL:</label>
          <input
            type="text"
            value={formData.hostedURL}
            onChange={(e) => setFormData({ ...formData, hostedURL: e.target.value })}
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h2>Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.developerName}</p>
              <p>{project.description}</p>
              <p>{project.hostedURL}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
