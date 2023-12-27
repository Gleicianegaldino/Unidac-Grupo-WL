import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewBreakfast() {
  const [breakfast, setBreakfast] = useState({
    title: '',
    date: '',
    hour: '',
  });
  const [invitedCollaborators, setInvitedCollaborators] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nameCollaborator, setNameCollaborator] = useState('');
  const [cpf, setCpf] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    loadBreakfast();
    loadInvitedCollaborators();
  }, []);

  const loadBreakfast = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/breakfasts/breakfast/${id}`);
      setBreakfast(result.data);
    } catch (error) {
      console.error('Error loading breakfast:', error);
    }
  };

  const loadInvitedCollaborators = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/breakfasts/breakfast/${id}/invitedCollaborators`);
      setInvitedCollaborators(result.data);
    } catch (error) {
      console.error('Error loading invited collaborators:', error);
    }
  };

  const addCollaborator = async (newCollaborator) => {
    try {
      await axios.post(`http://localhost:8080/breakfasts/breakfast/${id}/addCollaborator`, newCollaborator);
      loadInvitedCollaborators();
    } catch (error) {
      console.error('Error adding collaborator:', error);
    }
  };

  const handleAddCollaboratorClick = () => {
    setIsFormVisible(true);
  };

  const handleCancelClick = () => {
    setIsFormVisible(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newCollaborator = {
      nameCollaborator,
      cpf,
    };
    await addCollaborator(newCollaborator);
    setIsFormVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nameCollaborator') {
      setNameCollaborator(value);
    } else if (name === 'cpf') {
      setCpf(value);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h5 className="text-center m-4">Details about Breakfast</h5>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b> {breakfast.title}
                </li>
                <li className="list-group-item">
                  <b>Date:</b> {breakfast.date}
                </li>
                <li className="list-group-item">
                  <b>Hour:</b> {breakfast.hour}
                </li>
              </ul>
            </div>
            <button className="btn btn-primary my-2" onClick={handleAddCollaboratorClick}>
              Add collaborator
            </button>
          </div>
          <Link className="btn btn-primary my-2" to="/">
            Back
          </Link>
        </div>
      </div>
      {isFormVisible && (
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h6 className="text-center m-4">Add Collaborator</h6>
            <form onSubmit={handleFormSubmit}>
              <div className='mb-3'>
                <label htmlFor='nameCollaborator'></label>
                <input
                  type='text'
                  className='form-control'
                  placeholder="What's the name of your breakfast?"
                  name="nameCollaborator"
                  value={nameCollaborator}
                  onChange={handleInputChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='cpf'></label>
                <input
                  type='text'
                  className='form-control'
                  placeholder="What date is your breakfast?"
                  name="cpf"
                  value={cpf}
                  onChange={handleInputChange}
                />
              </div>
              
              <button type='submit' className='btn btn-outline-primary'>
                Save
              </button>
              <button
                type='button'
                className='btn btn-outline-danger mx-2'
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h6 className="text-center m-4">Add the food that each employee will take for breakfast. In the list below:</h6>
          {invitedCollaborators.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>CPF</th>
                </tr>
              </thead>
              <tbody>
                {invitedCollaborators.map((invitedCollaborator) => (
                  <tr key={invitedCollaborator.id}>
                    <td>{invitedCollaborator.nameCollaborator}</td>
                    <td>{invitedCollaborator.cpf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
