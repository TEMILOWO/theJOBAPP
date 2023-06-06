import React, { useState } from 'react';
import './Header.css';
import SearchBar from './searchbar.js';
import jobData from './jobData';
import './App.css';

function Header() {
  return <h1 className="header">The Job App</h1>;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10; 

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); 
  };

  const filteredJobs = jobData.filter((job) => {
    const { title, city, location, description } = job ?? {};
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      (title?.toLowerCase() ?? '').includes(lowerSearchTerm) ||
      (city?.toLowerCase() ?? '').includes(lowerSearchTerm) ||
      (location?.toLowerCase() ?? '').includes(lowerSearchTerm) ||
      (description?.toLowerCase() ?? '').includes(lowerSearchTerm)
    );
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <Data jobs={currentJobs} />
      <Pagination
        jobsPerPage={jobsPerPage}
        totalJobs={filteredJobs.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}

function Data({ jobs }) {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleJobClose = () => {
    setSelectedJob(null);
  };

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <button
          className="job-card"
          key={job.id}
          onClick={() => handleJobClick(job)}
        >
          <h3>{job.title}</h3>
          <p>{job.city}</p>
          <p>{job.name}</p>
          <p>{job.description}</p>
          <img src={job.logo} alt="Company Logo" />
        </button>
      ))}

      {selectedJob && (
        <div className="job-modal">
          <div className="job-modal-content">
            <h3>{selectedJob.title}</h3>
            <p>{selectedJob.city}</p>
            <p>{selectedJob.name}</p>
            <p>{selectedJob.content}</p>
            <button className="close-button" onClick={handleJobClose}>
              Close
            </button>
            <button className="Apply-button">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}


function Pagination({ jobsPerPage, totalJobs, currentPage, paginate }) {
  const pageNumbers = [];

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={number === currentPage ? 'active' : ''}
          onClick={() => paginate(number)}
          style={{ backgroundColor: number === currentPage ? 'green' : 'transparent' }}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default App;
