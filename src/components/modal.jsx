import React from 'react';
import '../assets/css/modal.css';

export default function modal({ active, setActive , data}) {

  const submitHomework = (e) =>{

		e.preventDefault();

    const { title,  content, group } = e.target;

    fetch('https://teacher-student-backend.onrender.com/give/homework/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title.value,
				content: content.value,
        group: group.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

      window.location.href = '/teacher'
  }


	return (
		<>
			<div onClick={()=> setActive(false)} className={active ? "modal active" : "modal"}>
				<div onClick={e => e.stopPropagation()} className='modal__content'>
          <form onSubmit={submitHomework} className='modal__form' method="post" autoComplete='off'>
            <h2 className='modal__title'>Homework</h2>
            <select className='modal__input select' name="group">
              {
                data.map((e , i) => (
                  <option key={i} value={e.group_id}>{e.group_title}</option>
                ))
              }
            </select>
            <input className='modal__input' type="text" name='title' placeholder='Title of homework'/>
            <textarea className='modal__input textarea' name="content" placeholder='Content of homework'  cols="30" rows="10"></textarea>
            <button className='modal__btn' type="submit">Send</button>
          </form>
        </div>
			</div>
		</>
	);
}
