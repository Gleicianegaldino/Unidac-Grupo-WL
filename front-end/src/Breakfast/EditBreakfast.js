import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EditBreakfast() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [breakfast, setBreakfast] = useState({
    title: "",
    date: "",
    hour: ""
  });

  const { title, date, hour } = breakfast;

  useEffect(() => {
    loadBreakfast();
  }, []);

  const loadBreakfast = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/breakfasts/breakfast/${id}`);
      setBreakfast(response.data);
    } catch (error) {
      console.error('Error fetching breakfast details:', error);
    }
  };

  const handleInputChange = (e) => {
    setBreakfast({
      ...breakfast,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/breakfasts/breakfast/${id}`, breakfast);
      navigate("/");
    } catch (error) {
      console.error('Error updating breakfast:', error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edit Breakfast</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                placeholder="What's the name of your breakfast?"
                name="title"
                value={title}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='date'>Date</label>
              <input
                type='text'
                className='form-control'
                placeholder="What date is your breakfast?"
                name="date"
                value={date}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='hour'>Hour</label>
              <input
                type='text'
                className='form-control'
                placeholder="What time is your breakfast?"
                name="hour"
                value={hour}
                onChange={handleInputChange}
              />
            </div>
            <button type='submit' className='btn btn-outline-primary'>
              Save
            </button>
            <Link className='btn btn-outline-danger mx-2' to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
