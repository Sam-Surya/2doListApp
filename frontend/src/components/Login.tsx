import React, { useEffect, useState } from 'react';
import '../css/styles.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserContext } from '../components/UserContext';
import axios from 'axios';
import logo from '../images/logo.png';
import showlogo from '../images/show.png';
import hidelogo from '../images/hide.png';
import Swal from 'sweetalert2';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberme, setRememberme] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    async function registerHandler(event: any) {
        event.preventDefault();
        try {
            const response = await axios.post('https://efv6esbe1d.execute-api.us-east-1.amazonaws.com/prod/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { email: loggedInEmail } = response.data;
                Cookies.set('email', loggedInEmail, { expires: 3 / 24 });

                if (rememberme) {
                    Cookies.set('remember_me_cookie', loggedInEmail, { expires: 30 });
                } else {
                    Cookies.remove('remember_me_cookie');
                }

                console.log('Login successful:', response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login successful',
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/Dashboard');
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                console.log('Login error:', error.response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid credentials',
                    confirmButtonColor: '#333'
                });
            } else if (error.response.status === 500) {
                console.log('Login error:', error.response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. We are addressing the issue. Please try again later.',
                    confirmButtonColor: '#333'
                });
            } else {
                console.log('Login error:', error.message);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. We are addressing the issue. Please try again later.',
                    confirmButtonColor: '#333'
                });
            }
        }
    }

    function emailChangehandler(event: any) {
        setEmail(event.target.value);
    }

    function passwordChangehandler(event: any) {
        setPassword(event.target.value.trim());
    }

    function passwordVisibilityHandler() {
        setShowPassword(!showPassword);
    }

    function remembermeVisibilityHandler() {
        setRememberme(!rememberme);
    }

    useEffect(() => {
        const rememberMeCookie = Cookies.get('remember_me_cookie');
        if (rememberMeCookie) {
            setEmail(rememberMeCookie);
            setRememberme(false);
        }
    }, []);

    return (
        <div>
            <div className="card">
                <div className="cardheader">
                    <h2 className='heading'><b>User Login</b></h2>
                    <hr></hr>
                    <br></br>
                    <img className='image' src={logo} alt="logo" width="150" height="150" />
                </div>
                <div className="cardbody">
                    <form onSubmit={registerHandler} className='fortext'>
                        <br></br>
                        <input type="email" id="email" value={email} placeholder='Email' onChange={emailChangehandler} autoComplete="email" required />
                        <br></br>
                        <br></br>
                        <div className="password-container">
                            <input type={showPassword ? 'text' : 'password'} id="pwd4" value={password} placeholder='Password' onChange={passwordChangehandler} autoComplete="current-password" required />
                            <a type="button" onClick={passwordVisibilityHandler} className="password-toggle-container"> {showPassword ? <img src={showlogo} alt="Edit PNG" style={{ width: '25px', height: '26px' }} /> : <img src={hidelogo} alt="Edit PNG" style={{ width: '23px', height: '21px' }} />} </a>
                            <br></br>
                        </div>
                        <a type="button" onClick={remembermeVisibilityHandler} >
                            {rememberme ? (
                                <div className="password-toggle-container">
                                    <span className="material-symbols-outlined">check_box</span>
                                    <span className='passwordshow'>Remember Me</span>
                                </div>
                            ) : (
                                <div className="password-toggle-container">
                                    <span className="material-symbols-outlined">check_box_outline_blank</span>
                                    <span className='passwordshow'>Remember Me</span>
                                </div>
                            )}
                        </a>
                        <br></br>
                        <button className='button' type="submit" value="Submit">Login</button>
                        <br></br>
                        <br></br>
                    </form>
                    <Link className='textnav' to="/Registration">Register as a New User</Link>
                    <br></br>
                    <Link className='textnav' to="/Forgot">Forgot Password</Link>
                    <br></br>
                    <br></br>
                </div>
            </div>
        </div>
    );
}
