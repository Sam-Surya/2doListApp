import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';
import logo from '../images/reset.png';

export default function Forgotpassword() {
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const navigate = useNavigate();

    async function forgotHandler(event: any) {
        event.preventDefault();
        try {
            const response = await axios.post('https://wv8xlr5c24.execute-api.us-east-1.amazonaws.com/prod/forgot', {
                email,
                dob,
            });

            if (response.status === 200) {
                const { email: loggedInEmail } = response.data;
                Cookies.set('forgotemail', loggedInEmail, { expires: 3 / 24 });

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Data Matched successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });

                navigate('/ResetPassword');
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid credentials',
                    confirmButtonColor: '#333',
                });
            } else if (error.response.status === 500) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. We are addressing the issue. Please try again later.',
                    confirmButtonColor: '#333',
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. We are addressing the issue. Please try again later.',
                    confirmButtonColor: '#333',
                });
            }
        }
    }

    function emailChangehandler(event: any) {
        setEmail(event.target.value);
    }

    function dobChangehandler(event: any) {
        const selectedDate = event.target.value;
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB');
        setDOB(formattedDate);
    }

    return (
        <div>
            <div className="card">
                <div className="container">
                    <div className="cardheader">
                        <h2 className="heading"><b>Forgot Password</b></h2>
                        <hr />
                        <br />
                        <img className="image" src={logo} alt="logo" width="150" height="150" />
                    </div>
                    <div className="cardbody">
                        <form onSubmit={forgotHandler} className="fortext">
                            <br />
                            <input type="email" id="email" value={email} placeholder="email" onChange={emailChangehandler} required />
                            <br />
                            <br />
                            <input type="text" style={{ border: 'none', outline: 'none', background: 'transparent' }} placeholder='Date of Birth' disabled /><br></br>
                            <input type="date" id="phone" name="birthday" onChange={dobChangehandler} required></input>
                            <br />
                            <br />
                            <button className="button" type="submit" value="Submit">Submit</button>
                            <br />
                        </form>
                        <Link to="/">Go back</Link>
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}
