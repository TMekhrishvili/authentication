import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../../shared/error/ErrorHandler';
import axiosInstance from '../../shared/axiosInstance';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        firstname: null,
        lastname: null,
        email: null,
        password: null
    });

    const handleChange = event => setUser({ ...user, [event.target.name]: event.target.value });

    const handleClick = async () => {
        try {
            const response = await axiosInstance.post('/register', user)
            if (response.status === 201) navigate('/');
        } catch (err) {
            setError(err.response?.data?.error);
        }
    }

    return <div>
        {error && <ErrorHandler error={error} callback={() => setError(null)} />}
        <h1>Register</h1>
        <div className='container'>
            <input
                type='firstname'
                name='firstname'
                placeholder='firstname'
                onChange={handleChange}
            />
            <input
                type='lastname'
                name='lastname'
                placeholder='lastname'
                onChange={handleChange}
            />
            <input
                type='email'
                name='email'
                placeholder='email'
                onChange={handleChange}
            />
            <input
                type='password'
                name='password'
                placeholder='password'
                onChange={handleChange}
            />

            <button type='submit' onClick={handleClick}>Register</button>
        </div>
    </div>
};

export default Register;
