import React, { useContext, useEffect, useState } from 'react';
import './Tasks.css';
import UserContext from '../../context/UserContext';
import { useHistory, Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import TaskItem from '../Tasks/TaskItem';
import Axios from 'axios';
import Moment from 'react-moment';
import DatePicker from 'react-horizontal-datepicker';
import moment from 'moment';

function Tasks() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [userSettingModal, setUserSettingModal] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [error, setError] = useState();
  const [timeText, setTimeText] = useState();
  const [doneTask, setDoneTask] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [done, setDone] = useState([]);

  // useEffect(() => {
  //   if (userData.user === undefined) {
  //     console.log("amcik ne bekliyon");
  //     history.push("/");
  //   }

  //   console.log(userData);
  // }, [userData]);

  const onClick = () => {
    setModal(!modal);
  };

  useEffect(() => {
    callAPI();
  }, [modal]);

  const callText = (val) => {
    let a = moment(val);
    let b = moment(Date.now());

    let c = a.diff(b, 'hours');

    if (c <= 0) {
      setTimeText('Today');
    } else if (c < 24 && c >= 1) {
      setTimeText('Tomorrow');
    } else {
      setTimeText(undefined);
    }
  };

  const callAPI = () => {
    try {
      const fetchAPI = async () => {
        const body = { date: moment(date).format('MMMM Do YYYY') };

        const api = {
          'X-auth-token': localStorage.getItem('auth-token'),
        };

        const response = await Axios.put('todos/date', body, {
          headers: api,
        });

        setTasks(response.data);
      };

      fetchAPI();
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  const selectedDay = (val) => {
    callText(val);
    setDate(val);

    try {
      const fetchAPI = async () => {
        const body = { date: moment(val).format('MMMM Do YYYY') };

        const api = {
          'X-auth-token': localStorage.getItem('auth-token'),
        };

        const response = await Axios.put('todos/date', body, {
          headers: api,
        });
        setTasks(response.data);
      };

      fetchAPI();
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className='bg-gradient-to-b from-blue-700 to-blue-900  flex flex-col h-screen text-white'>
      <div className='m-6'>
        <Link to='/dashboard'>
          <svg
            className='fill-current w-4'
            id='icon-chevron-left'
            viewBox='0 0 21 28'
          >
            <path d='M18.297 4.703l-8.297 8.297 8.297 8.297c0.391 0.391 0.391 1.016 0 1.406l-2.594 2.594c-0.391 0.391-1.016 0.391-1.406 0l-11.594-11.594c-0.391-0.391-0.391-1.016 0-1.406l11.594-11.594c0.391-0.391 1.016-0.391 1.406 0l2.594 2.594c0.391 0.391 0.391 1.016 0 1.406z'></path>
          </svg>
        </Link>
      </div>
      <div className='mx-6 mt-5 flex items-center justify-between lg:mx-64'>
        <div className='text-sm tracking-tighter lg:text-3xl'>
          <Moment format='ddd DD, yyyy'>{date}</Moment>
          <div className='font-extrabold text-xl lg:text-4xl'>
            {timeText ? timeText : <Moment fromNow>{date}</Moment>}
          </div>
        </div>
        <div>
          <button
            onClick={onClick}
            className='flex items-center bg-blue-600 text-white py-1 px-3 text-sm rounded-lg focus:outline-none'
          >
            <svg
              className='mt-2 w-8 fill-current'
              id='icon-plus'
              viewBox='0 0 32 32'
            >
              <path d='M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z'></path>
            </svg>
            Add task
          </button>
        </div>
      </div>
      <div className='my-6 lg:mx-64'>
        <DatePicker
          getSelectedDay={selectedDay}
          endDate={100}
          selectDate={date}
          labelFormat={'MMMM'}
          color={'#374e8c'}
        />
      </div>
      {/* <div className="mx-6 text-sm font-bold mb-2 -mt-4">
        Completed {percentage}%
        <div className="h-2 mt-1 bg-gray-400 rounded">
          <div
            className="h-2 bg-gradient-to-r from-blue-200  to-indigo-400 rounded transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div> */}

      <div className='lg:mx-64 lg:h-full overflow-y-auto lg:overflow-x-hidden scrollBar'>
        <div className='lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:mx-auto'>
          {tasks.map((task) => (
            <TaskItem
              task={task}
              key={task._id}
              toggleTest={task.done}
              setDone={setDone}
              done={done}
              setTasks={setTasks}
              tasks={tasks}
            />
          ))}
        </div>
      </div>

      {modal && <Modal onClick={onClick} />}
    </div>
  );
}

export default Tasks;
