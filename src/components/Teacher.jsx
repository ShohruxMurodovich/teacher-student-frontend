import { useEffect, useState } from 'react';
import { useLogin } from '../context/Authentication';
import '../assets/css/teacher.css';
import Modal from './modal';

const Teacher = () => {
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);
    const [active, setActive] = useState();
    const [modalActive , setModalActive] = useState(false)

    const [token] = useLogin();

    useEffect(() => {
        fetch('https://teacher-student-backend.onrender.com/teacher/groups', {
            method: 'GET',
            headers: {
                access_token: token,
            },
        })
            .then((res) => res.json())
            .then((data) => setGroups(data))
            .catch((err) => console.log(err));
    });

    const handleGroups = (id) => {
        fetch(`https://teacher-student-backend.onrender.com/groups/students/${id}`)
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((err) => console.log(err));

        setStudents();
        if(active){
            setActive("")
        }else{
            setActive(id)
        }
    };

    return (
        <>
            <h1 className='teach_title'>Teacher groups</h1>
            <ul className='list'>
                <li className='item'>
                    <h3 className='item_id'>ID</h3>
                    <strong className='item_title'>Group</strong>
                    <p className='item_course'>Course name</p>
                    <p className='students'>Students</p>
                    <p className='homework'>Homework</p>
                </li>
                {
                groups &&
                    groups.map((e, i) => (
                        <li key={i}>
                            <div className='item active'>
                                <h3 className='item_id num'>{e.group_id}.</h3>
                                <strong className='item_title'>{e.group_title}</strong>
                                <p className='item_course'>{e.course_name}</p>
                                <button
                                    className='btn-show'
                                    onClick={() => handleGroups(e.group_id)}>
                                    Students  &#9660;
                                </button>
                                <button onClick={()=> setModalActive(true)} className='btn-homework'>Give homework</button>
                            </div>

                            <div className={(active == e.group_id ? "show" : "dontShow")}>
                            {
                                students &&
                                students.map((element, i) => (
                                    <div className='students_list' key={i}>
                                        <h3 className='student_id'>{i + 1}.</h3>
                                        <h3 className='student_name'>{element.user_name}</h3>
                                        <strong className='student_phone'>+{element.user_phone}</strong>
                                    </div>
                                ))
                            }
                            </div>
                        </li>
                    ))}
            </ul>
            <Modal active={modalActive} setActive={setModalActive} data={groups}/>
        </>
    );
};

export default Teacher;
