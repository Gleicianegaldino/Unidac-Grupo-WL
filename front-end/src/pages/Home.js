import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AdditionalInfoPage from './AdditionalInfoPage';

export default function Home() {
  const [breakfasts, setBreakfasts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showBreakfasts, setShowBreakfasts] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (showBreakfasts) {
      loadBreakfasts();
    }
  }, [showBreakfasts, currentPage, pageSize, id]);

  const loadBreakfasts = async () => {
    try {
      const result = await axios.get("https://unidac-k9jj.onrender.com/breakfasts/breakfasts");
      const updatedBreakfasts = result.data.map((newBreakfast) => {
        const existingBreakfast = breakfasts.find((b) => b.id === newBreakfast.id);
        return existingBreakfast ? existingBreakfast : newBreakfast;
      });
      setBreakfasts(updatedBreakfasts);
    } catch (error) {
      console.error("Error fetching breakfasts:", error);
    }
  };

  const deleteBreakfast = async (id) => {
    try {
      await axios.delete(`https://unidac-k9jj.onrender.com/breakfasts/breakfast/${id}`);
      loadBreakfasts();
    } catch (error) {
      console.error('Error deleting breakfast:', error);
    }
  };

  const handleShowBreakfasts = () => {
    setShowBreakfasts((prevShowBreakfasts) => !prevShowBreakfasts);
  };

  const totalPages = Math.ceil(breakfasts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div>
      <AdditionalInfoPage />

      <div className='container'>
        <div className='py-4'>
          
          <button
            style={{
              marginRight: '10px',
              marginBottom: '20px',
              padding: '15px 100px',
              background: '#7ccbfc',
              color: '#fff',
              border: 'none',
            }}
            className="btn"
            type="button"
            aria-label="Toggle navigation"
            onClick={handleShowBreakfasts}
          >
            {showBreakfasts ? 'Close view' : 'View all available breakfasts'}
          </button>

          {showBreakfasts && (
            <table className="table border shadow border-1" style={{ borderRadius: '10px' }}>
              <thead>
                
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Hour</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {breakfasts.slice(startIndex, endIndex).map((breakfast, index) => (
                  <tr key={index}>
                    <td>{breakfast.title}</td>
                    <td>{breakfast.date}</td>
                    <td>{breakfast.hour}</td>
                    <td>
                      <Link className='btn btn-primary mx-2' to={`/viewBreakfast/${breakfast.id}`}>Details</Link>
                      <Link className='btn btn-outline-primary mx-2' to={`/editBreakfast/${breakfast.id}`}>Edit</Link>
                      <button className='btn btn-danger mx-2' onClick={() => deleteBreakfast(breakfast.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
