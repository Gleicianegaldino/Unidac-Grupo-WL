import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'


export default function AddBreakfast() {

    let navigate = useNavigate()

    const [breakfast, setBreakfast] = useState({
        title: "",
        date: "",
        hour: ""
    });

    const { title, date, hour } = breakfast;

    const handleInputChange = (e) => {
        setBreakfast({
            ...breakfast,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", breakfast);
        await axios.post("http://localhost:8080/breakfasts/breakfast", breakfast);
        navigate("/");
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/breakfasts/breakfast", breakfast);
        navigate("/")
    }

    


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-5 shadow'>
                    <h2 className='text-center m-4'>Register Breakfast</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='title'></label>
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
                            <label htmlFor='date'></label>
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
                            <label htmlFor='hour'></label>
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
