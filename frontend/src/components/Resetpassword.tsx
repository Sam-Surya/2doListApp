import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../images/reset.png';
import showlogo from '../images/show.png';
import hidelogo from '../images/hide.png';

export default function Resetpassword() {
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [email, setEmail] = useState<string | null>(null);

    async function registerHandler(event: any) {
        event.preventDefault();

        if (password !== repass) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match',
                confirmButtonColor: '#333'
            });
            return;
        }

        if (password.length < 8) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be at least 8 characters long',
                confirmButtonColor: '#333'
            });
            return;
        }

        const atLeastOneCapsRegex = /[A-Z]/;
        if (!atLeastOneCapsRegex.test(password)) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Password must contain at least one uppercase letter',
                confirmButtonColor: '#333'
            });
            return;
        }

        const alphanumericWithOneSpecialRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
        if (!alphanumericWithOneSpecialRegex.test(password)) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be alphanumeric with exactly one special character',
                confirmButtonColor: '#333'
            });
            return;
        }


 

        try {
            const response = await axios.post('https://oyq1knwqb3.execute-api.us-east-1.amazonaws.com/prod/reset', {
                password,
                email
            });

            if (response.status === 200) {
                console.log('New Password created successfully:', response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'New Password created successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password Reset Failed',
                    confirmButtonColor: '#333'
                });
                console.log('Password Reset Failed', error.response.data);
            } else if (error.response.status === 500) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. We are addressing the issue. Please try again later.',
                    confirmButtonColor: '#333'
                });
                console.log('Database Connection Failed', error.response.data);
            }

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. We are addressing the issue. Please try again later.',
                confirmButtonColor: '#333'
            });

            console.log('Axios Error:', error.message);
        }
    }

    const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    
    function passChangehandler(event: any) {
        const newPassword = event.target.value.trim();
        setPassword(newPassword);
        let validationMessage = '';
    
        if (newPassword.length < 8) {
            validationMessage = '⚠ Password must be at least 8 characters long.';
        } else {
            // Check if password contains at least one special character
            const atLeastOneSpecialRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/;
            if (!atLeastOneSpecialRegex.test(newPassword)) {
                validationMessage = '⚠ Password needs one special character.';
            } else if (!/[a-zA-Z0-9]/.test(newPassword)) {
                validationMessage = '⚠ Password should be alphanumeric.';
            } else if (!/[A-Z]/.test(newPassword)) {
                validationMessage = '⚠ Password requires one uppercase letter.';
            }
        }
    
        setPasswordValidationMessage(validationMessage);
    }
    



    const [repasswordValidationMessage, setRepasswordValidationMessage] = useState('');
    function repassChangehandler(event: any) {
        const newRepassword = event.target.value.trim();
        setRepass(newRepassword);
    
        // Check if re-entered password matches the original password
        if(!password){
            setRepasswordValidationMessage('⚠ First fill in the Password.');
        }
        else if (newRepassword !== password) {
            setRepasswordValidationMessage('⚠ Passwords do not match.');
        } else {
            setRepasswordValidationMessage('');
        }
    }


    function passwordVisibilityHandler() {
        setShowPassword(!showPassword);
    }

    function passwordVisibilityHandler2() {
        setShowPassword2(!showPassword2);
    }

    useEffect(() => {
        const storedEmail = Cookies.get('forgotemail');

        if (storedEmail) {
            setEmail(storedEmail);
        }

        if (!storedEmail) {
            navigate('/');
            return;
        }
    }, []);

    return (
        <div>
            <div className="card">
                <div className="container">
                    <div className="cardheader">
                        <h2 className='heading'><b>Reset Password</b></h2>
                        <hr></hr>
                        <br></br>
                        <img className='image' src={logo} alt="logo" width="150" height="150" />
                    </div>
                    <div className="cardbody">
                        <form onSubmit={registerHandler} className='fortext'>
                            <br></br>
                            <div className="password-container">
                                <input type={showPassword ? 'text' : 'password'} id="pwd1" value={password} placeholder='New password' onChange={passChangehandler} autoComplete="new-password" required />
                                <a type="button" onClick={passwordVisibilityHandler} className="password-toggle-container" > {showPassword ? <img src={showlogo} alt="Edit PNG" style={{ width: '25px', height: '26px' }} /> : <img src={hidelogo} alt="Edit PNG" style={{ width: '23px', height: '21px' }} />} </a>
                                <br></br>
                               
                            </div>
                            <div className="password-validation-message" >
                                    {passwordValidationMessage &&  <input type="text" style={{ border: 'none', outline: 'none', background: 'transparent', color:'red' , }} value={passwordValidationMessage}  disabled />}
                                </div>
                                <br></br>
                            <div className="password-container">
                                <input type={showPassword2 ? 'text' : 'password'} id="phone" value={repass} placeholder='Re-enter New password' onChange={repassChangehandler} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} autoComplete="new-password" required />
                                <a type="button" onClick={passwordVisibilityHandler2} className="password-toggle-container"> {showPassword2 ? <img src={showlogo} alt="Edit PNG" style={{ width: '25px', height: '26px' }} /> : <img src={hidelogo} alt="Edit PNG" style={{ width: '23px', height: '21px' }} />} </a>
                                <br></br>
                                
                            </div>
                            {passwordFocused && (
                                <div className="password-validation-message">
                                    {repasswordValidationMessage &&    <input type="text" style={{ border: 'none', outline: 'none', background: 'transparent', color:'red' }} value={repasswordValidationMessage}  disabled />}
                                </div>
                                )}
                                <br></br>
                            <button className='button' type="submit" value="Submit">Change Password</button>
                            <br></br>
                        </form>
                        <Link to="/Forgot">Go back</Link>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    );
}
