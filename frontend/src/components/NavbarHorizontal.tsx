import React, { useState, useEffect } from 'react';
import menulogo from '../images/menulogo.png';
import '../css/styles.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import applogo from '../images/applogo.png';
import logoutlogo from '../images/logout.png';
import filterlogo from '../images/filterlogo.png';
import Swal from 'sweetalert2';
import sortlogo from '../images/sorlogo.png';
import { useUserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

export default function NavbarHorizontal() {
  const { updateSortType } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState('');

  function handleAscending() {
    updateSortType('Ascending');
  }

  function handleDescending() {
    updateSortType('Descending');
  }

  function handleTaskID() {
    updateSortType('TaskID');
  }

  function handleAscendingPriority() {
    updateSortType('AscendingPriority');
  }

  function handleDescendingPriority() {
    updateSortType('DescendingPriority');
  }

  function handleLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Logout',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout !',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Cookies.remove('email');
        navigate('/');
      }
    });
  }

  useEffect(() => {
    const storedEmail = Cookies.get('email');

    async function fetchData() {
      try {
        const response = await axios.get('https://hfxbnbzyg1.execute-api.us-east-1.amazonaws.com/prod/username', {
          params: { email: storedEmail },
        });

        if (response.status === 200) {
          console.log('Name Fetched Succefully');
          setUsername(response.data.name);
        }
      } catch (error: any) {
        if (error.response.status === 500) {
          // Swal.fire({
          //   position: 'center',
          //   icon: 'error',
          //   title: 'Error Connecting to Database',
          //   confirmButtonColor: '#333',
          // });
          console.log('Error Connecting to Database');
        } else if (error.response.status === 204) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No tasks found for the provided email',
            confirmButtonColor: '#333',
          });
          console.log('No tasks found for the provided email', error.response.data);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Axios Error',
            confirmButtonColor: '#333',
          });
          console.log('Axios Error', error);
        }
      }
    }

    if (storedEmail) {
      setEmail(storedEmail);
      fetchData();
    }

    if (!storedEmail) {
      navigate('/');
      return;
    }
  }, [username]);

  return (
    <div>
      <ul className="hnav">
        <li className="dropdown">
          <a href="javascript:void(0)" className="dropbtn">
            {' '}
            <span className="material-symbols-outlined" style={{ color: "white" }}>
              menu
            </span>

          </a>
          <div className="dropdown-content">
            <h6 className="Filters">Hello {username} !</h6>
            <hr></hr>
            <h5 className="Filters">
              <span className="material-symbols-outlined">
                filter_alt
              </span>
              <b>Filters</b>
            </h5>
            <hr></hr>
            <Link to="/Dashboard">All Tasks </Link>
            <Link to="/CompletedTask">Completed Task</Link>
            <Link to="/PendingTask">In Progress</Link>
            <Link to="/DeletedTask">Deleted Task</Link>
            <hr></hr>
            <h5 className="Filters">
              <span className="material-symbols-outlined">
                sort
              </span>
              <b>Sort By</b>
            </h5>
            <hr></hr>
            <a href="javascript:void(0)" onClick={handleAscending}>
              Date Ascending
            </a>
            <a href="javascript:void(0)" onClick={handleDescending}>
              Date Descending
            </a>

            <a href="javascript:void(0)" onClick={handleAscendingPriority}>
              Priority Ascending
            </a>
            <a href="javascript:void(0)" onClick={handleDescendingPriority}>
              Priority Descending
            </a>
            <a href="javascript:void(0)" onClick={handleTaskID}>
              Task ID Ascending
            </a>
          </div>
        </li>
        <li>
          <Link className="right-align" to="/Dashboard">
            <img src={applogo} alt="Edit PNG" style={{ width: '128px', height: '20px' }} />{' '}
          </Link>
        </li>
        <li className="logout btn btn-primary tooltip2">
          <a href="javascript:void(0)" onClick={handleLogout}>
            <img src={logoutlogo} alt="Logout PNG" style={{ width: '31px', height: '31px' }} />
          </a>
          <div className="left">
            <p>Logout</p>
            <i></i>
          </div>
        </li>
      </ul>
    </div>
  );
}
