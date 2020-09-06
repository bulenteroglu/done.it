import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import { useHistory, Link } from 'react-router-dom';
import TaskItem from '../Tasks/TaskItem';
import Axios from 'axios';
import './Dashboard.css';
import moment from 'moment';
import Pusher from 'pusher-js';

function Dashboard() {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [allTasks, setAllTasks] = useState([]);
  const [allDoneTasks, setAllDoneTasks] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const options = {
      headers: {
        'X-auth-token': localStorage.getItem('auth-token'),
      },
    };

    Axios.get('todos/all', options).then((response) => {
      setAllTasks(response.data);
    });
  }, []);

  useEffect(() => {
    const options = {
      headers: {
        'X-auth-token': localStorage.getItem('auth-token'),
      },
    };
    Axios.get('todos/all/done', options).then((response) => {
      setAllDoneTasks(response.data);
    });
  }, [allTasks]);

  useEffect(() => {
    let a = allTasks.length;

    let b = allDoneTasks.length;

    let calculate = Math.round((b / a) * 100);

    let checkFinite = Number.isFinite(calculate);

    if (checkFinite) {
      setPercentage(calculate);
    }

    console.log('ALL TASK: ' + a);
    console.log('ALL DONE: ' + b);
    console.log('PERCENTAGE: ' + calculate);
  }, [allDoneTasks]);

  useEffect(() => {
    const pusher = new Pusher('e1f1d6a2b99b78cc4995', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('todos');
    channel.bind('inserted', (newTodo) => {
      setAllTasks([...allTasks, newTodo]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [allTasks]);

  useEffect(() => {
    allTasks.map((task) => {
      const check = moment(task.startTime).isBefore(
        moment(new Date()).format('YYYY-MM-DD')
      );

      if (check) {
        const options = {
          headers: {
            'X-auth-token': localStorage.getItem('auth-token'),
          },
        };

        Axios.delete(`todos/${task._id}`, options);
      }
    });
  }, [allTasks]);

  const handleSignOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
    history.push('/');
  };

  return (
    <div className='flex flex-col h-screen bg-gradient-to-b from-blue-700 to-blue-900'>
      <div className='mx-6'>
        <div className='flex justify-center mt-12 mx-6'>
          <div className='uppercase text-sm lg:text-lg font-semibold tracking-widest text-white'>
            Profile
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='flex justify-center rounded-full h-24 w-24 lg:h-40 lg:w-40 bg-blue-900 mt-12 items-center uppercase text-white font-semibold text-5xl border-2 border-white'>
            <div className='lg:text-5xl'>
              {userData.user && userData.user.username.charAt(0)}
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='mt-10 text-white text-2xl lg:text-4xl capitalize'>
            {userData.user && userData.user.username}
          </div>
        </div>
        <div className='flex justify-center mt-12 items-center'>
          <div className='flex flex-col'>
            <div className='uppercase text-white text-xs lg:text-lg font-semibold tracking-widest'>
              tasks completed
            </div>

            <div className='mt-3 h-1 w-full bg-black rounded-lg bg-opacity-25'>
              <div
                className='h-1 bg-gradient-to-r from-blue-200  to-indigo-400 rounded transition-all duration-1000'
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-20 tracking-tight font-medium lg:mx-64 lg:items-center'>
          <Link to='/tasks'>
            <div className='bg-white rounded w-full lg:w-64 flex justify-between items-center py-4 lg:py-2 px-5'>
              <div className='text-sm lg:text-xl'>Tasks</div>
              <div>
                <svg
                  className='w-4 fill-current'
                  id='icon-arrow-right'
                  viewBox='0 0 24 24'
                >
                  <path d='M11.293 5.707l5.293 5.293h-11.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h11.586l-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l7-7c0.092-0.092 0.166-0.202 0.217-0.324 0.101-0.245 0.101-0.521 0-0.766-0.049-0.118-0.121-0.228-0.217-0.324l-7-7c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z'></path>
                </svg>
              </div>
            </div>
          </Link>
          {/* <Link to='/statistics'>
            <div className='bg-white rounded w-full lg:w-64 flex justify-between items-center py-4 lg:py-2 px-5 mt-2'>
              <div className='text-sm lg:text-xl'>Statistic</div>
              <div>
                <svg
                  className='w-4 fill-current'
                  id='icon-arrow-right'
                  viewBox='0 0 24 24'
                >
                  <path d='M11.293 5.707l5.293 5.293h-11.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h11.586l-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l7-7c0.092-0.092 0.166-0.202 0.217-0.324 0.101-0.245 0.101-0.521 0-0.766-0.049-0.118-0.121-0.228-0.217-0.324l-7-7c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z'></path>
                </svg>
              </div>
            </div>
          </Link> */}
          {/* <div className='bg-white rounded w-full lg:w-64 flex justify-between items-center py-4 lg:py-2 px-5 mt-2'>
            <div className='text-sm lg:text-xl'>Edit Profile</div>
            <div>
              <svg
                className='w-4 fill-current'
                id='icon-arrow-right'
                viewBox='0 0 24 24'
              >
                <path d='M11.293 5.707l5.293 5.293h-11.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h11.586l-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l7-7c0.092-0.092 0.166-0.202 0.217-0.324 0.101-0.245 0.101-0.521 0-0.766-0.049-0.118-0.121-0.228-0.217-0.324l-7-7c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z'></path>
              </svg>
            </div>
          </div> */}
          <button
            onClick={handleSignOut}
            className='bg-white rounded w-full lg:w-64 flex justify-between items-center py-4 lg:py-2 px-5 mt-2'
          >
            <div className='text-sm lg:text-xl text-red-600'>Sign Out</div>
            <div>
              <svg
                className='w-4 fill-current'
                id='icon-arrow-right'
                viewBox='0 0 24 24'
              >
                <path d='M11.293 5.707l5.293 5.293h-11.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h11.586l-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l7-7c0.092-0.092 0.166-0.202 0.217-0.324 0.101-0.245 0.101-0.521 0-0.766-0.049-0.118-0.121-0.228-0.217-0.324l-7-7c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z'></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
