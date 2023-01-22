import { useEffect, useState } from 'react';
import { useLogin } from '../context/Authentication';
import '../assets/css/teacher.css';

const Students = () => {
	const [student, setStudents] = useState([]);
	const [homework, setHomework] = useState([]);
	const [active, setActive] = useState();

	const [token] = useLogin();

	useEffect(() => {
		fetch('https://teacher-student-backend.onrender.com/student/groups', {
			method: 'GET',
			headers: {
				access_token: token,
			},
		})
			.then((res) => res.json())
			.then((data) => setStudents(data))
			.catch((err) => console.log(err));
	});

	const handleStudent = (id) => {
		fetch(`https://teacher-student-backend.onrender.com/groups/homework/${id}`)
			.then((res) => res.json())
			.then((data) => setHomework(data))
			.catch((err) => console.log(err));

		setHomework();
		setActive(id)
	};

	return (
		<>
			<h1 className='teach_title'>Students</h1>

			<ul className='list'>
				<li className='item'>
					<h3 className='item_id'>ID</h3>
					<strong className='item_title'>Group</strong>
					<p className='item_course'>Course name</p>
					<p className='homework'>Homework</p>
				</li>

				{
				student &&
					student.map((e, i) => (

						<li key={i}>
							<div className='item active'>
								<h3 className='item_id num'>{e.group_id}.</h3>
								<strong className='item_title'>{e.group_title}</strong>
								<p className='item_course'>{e.course_name}</p>
								<button
									className='btn-show'
									onClick={() => handleStudent(e.group_id)}>
									Homework &#9660;
								</button>
							</div>

							<div className={active == e.group_id ? 'show' : 'dontShow'}>

								{
								homework &&
									homework.map((e, i) => (
										<div className='students_list' key={i}>
											<h3 className='student_id homework_id'>{i + 1}.</h3>
											<h3 className='student_name'>{e.homework_title}</h3>
											<h3 className='student_phone'>
												{e.homework_content}
											</h3>
										</div>
									))
									}
							</div>
						</li>
					))}
			</ul>
		</>
	);
};

export default Students;
