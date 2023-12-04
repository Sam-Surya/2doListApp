import React, { useState } from 'react';
import '../css/styles.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import showlogo from '../images/show.png'
import hidelogo from '../images/hide.png'
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../images/reglogo.png';

export default function Register() {
    const [email, setEmail] = useState('');
    let [fname, setFname] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const navigate = useNavigate();

    async function registerHandler(event: any) {
        event.preventDefault();

        fname = fname.trim()

        if (!fname || /^\s*$/.test(fname)) {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Name Should Not be Empty',
            })
            return;
        }

        if (!email || !fname || !dob || !password || !repassword || !phone) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required',
            })
            return;
        }

        if (password !== repassword) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match',
                confirmButtonColor: '#333'
            })
            return;
        }

        if (/[^a-zA-Z0-9 ]/.test(fname)) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Name should not contain special characters',
                confirmButtonColor: '#333'
            })
            return;
        }

        if (/\d/.test(fname)) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Name should not contain numbers',
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
            })
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


        if (!/[A-Z]/.test(password)) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Password should contain at least one uppercase letter',
                confirmButtonColor: '#333'
            })
            return;
        }


        if (phone.length < 10) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Phone number must be at least 10 characters long',
                confirmButtonColor: '#333'
            })
            return;
        }


        if (!/^\d+$/.test(phone)) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Phone number must be numeric',
                confirmButtonColor: '#333'
            })
            return;
        }


        try {
            const response = await axios.post('https://3ez75ypgyd.execute-api.us-east-1.amazonaws.com/prod/register', {
                email,
                fname,
                dob,
                password,
                repassword,
                phone,
            });

            if (response.status === 200) {
                console.log('Registered successfully:', response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registered successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.log('Registration error:', error.response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Registration failed, Could Not Insert Data',
                    confirmButtonColor: '#333'
                })
            } else if (error.response && error.response.status === 500) {
                console.log('Registration error:', error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    position: 'center',
                    text: 'Something went wrong. We are addressing the issue. Please try again later.',
                    confirmButtonColor: '#333'
                })
            } else if (error.response && error.response.status === 403) {
                console.log('Registered Failed:', error.response.data);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Registration failed: Email Already Exists',
                    confirmButtonColor: '#333'
                })
            } else {
                console.log('Registration error:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    position: 'center',
                    text: 'Registration error ',
                    confirmButtonColor: '#333'
                })
            }
        }
    }

    function emailChangehandler(event: any) {
        setEmail(event.target.value.trim())
    }







    function dobChangehandler(event: any) {
        const selectedDate = event.target.value;
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB');
        setDob(formattedDate);
    }
    const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    
    function passwordChangehandler(event: any) {
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
    function repasswordChangehandler(event: any) {
        const newRepassword = event.target.value.trim();
        setRepassword(newRepassword);
    
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



    const [phoneValidationMessage, setphoneValidationMessage] = useState('');

    function phoneChangehandler(event: any) {
        const newPhone = event.target.value.trim();
        setPhone(newPhone);
    

        if (!/^\d+$/.test(newPhone)) {
            setphoneValidationMessage('⚠ Phone number must be numeric.');

         } else  if (newPhone.length < 10) {
            setphoneValidationMessage('⚠ Phone number must be 10 characters long.');
        } 
         else {
            
            setphoneValidationMessage('');
        }
    }


    const [nameValidationMessage, setnameValidationMessage] = useState('');

    
    function firstnameChangehandler(event: any) {
        const normalizedString = event.target.value.replace(/\s+/g, '');
        setFname(normalizedString);
    
        if (!normalizedString) {
            setnameValidationMessage('⚠ Name should not be Empty.');
        } else if (/[^a-zA-Z0-9 ]/.test(normalizedString)) {
            setnameValidationMessage('⚠ Name should not contain special characters.');
        } else if (/\d/.test(normalizedString)) {
            setnameValidationMessage('⚠ Name should not contain numbers.');
        } else {
            setnameValidationMessage('');
        }
    }
    
    


    function passwordVisibilityHandler() {
        setShowPassword(!showPassword);
    }

    function passwordVisibilityHandler2() {
        setShowPassword2(!showPassword2);
    }

    return (
        <div>
            <div className="card">
                <div className="container">
                    <div className="cardheader">
                        <h2 className='heading'><b>User Registration</b></h2>
                        <hr></hr>
                        
                        <img className='image' src={logo} alt="logo" width="120" height="120" />
                    </div>
                    <div className="cardbody">
                        <form onSubmit={registerHandler}>
                            <div className="form-container">
                                <br></br>
                                <input type="email" id="pwd1" value={email} placeholder='Email' onChange={emailChangehandler} required />
                                <br></br>
                                <br></br>
                                <input type="text" id="pwd2" value={fname} placeholder='Name' onChange={firstnameChangehandler} required />
                                <div className="password-validation-message" >
                                    {nameValidationMessage &&  <input type="text" style={{ border: 'none', outline: 'none', background: 'transparent', color:'red' , }} value={nameValidationMessage}  disabled />}
                                </div>
                                <br></br>
                                <input type="text" style={{ border: 'none', outline: 'none', background: 'transparent' }} placeholder='Date of Birth' disabled /><br></br>
                                <input type="date" id="pwd3" name="birthday" onChange={dobChangehandler} required></input>
                                <br></br>
                                <br></br>
                                <input type="text" id="phone" value={phone} placeholder='Phone' onChange={phoneChangehandler} required />
                                <div className="password-validation-message" >
                                    {phoneValidationMessage &&  <input type="text" style={{ border: 'none', outline: 'none', background: 'transparent', color:'red' , }} value={phoneValidationMessage}  disabled />}
                                </div>
                                
                                <br></br>
                                <div className="password-container">
                                    <input type={showPassword ? 'text' : 'password'} id="pwd4" value={password} placeholder='Password' onChange={passwordChangehandler}    autoComplete="new-password" required />
                                    <a type="button" onClick={passwordVisibilityHandler} className="password-toggle-container"> {showPassword ? <img src={showlogo} alt="Edit PNG" style={{ width: '25px', height: '26px' }} /> : <img src={hidelogo} alt="Edit PNG" style={{ width: '23px', height: '21px' }} />} </a>
                                </div>

                                <div className="password-validation-message" >
                                    {passwordValidationMessage &&  <input type="text" style={{ border: 'none', outline: 'none', background: 'transparent', color:'red' , }} value={passwordValidationMessage}  disabled />}
                                </div>
                                <br></br>

                                <div className="password-container">
                                    <input type={showPassword2 ? 'text' : 'password'} id="repwd" value={repassword} placeholder='Re-enter Password' onChange={repasswordChangehandler} autoComplete="new-password" onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} required />
                                    <a type="button" onClick={passwordVisibilityHandler2} className="password-toggle-container"> {showPassword2 ? <img src={showlogo} alt="Edit PNG" style={{ width: '25px', height: '26px' }} /> : <img src={hidelogo} alt="Edit PNG" style={{ width: '23px', height: '21px' }} />} </a>
                                    <br></br>
                                  
                                </div>
                                {passwordFocused && (
                                <div className="password-validation-message">
                                    {repasswordValidationMessage &&    <input type="text" style={{ border: 'none', outline: 'none', background: 'transparent', color:'red' }} value={repasswordValidationMessage}  disabled />}
                                </div>
                                )}
                                <br></br>
                            </div>
                            <button className='button' type="submit" value="Submit">Register</button>
                            <br></br>
                            <br></br>
                            <Link className='textnav' to="/">Already have an account?</Link>
                            <br></br>
                            <br></br>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
