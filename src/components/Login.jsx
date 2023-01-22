import { useLogin } from '../context/Authentication';
import '../assets/css/login.css';

const Login = () => {
	const [token, setToken] = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();

		const { password, name } = e.target;

		fetch('https://teacher-student-backend.onrender.com/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value,
				password: password.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setToken(data?.access_token);
				if(data.role == 'teacher'){
                    window.location.href = '/teacher'
                }else if (data.role == 'admin') {
                    window.location.href = '/admin'
                }else{
                    window.location.href = '/student'
                }
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className='case'>
				<h1 className='title'>Login</h1>
				<form
					className='form'
					action=''
					autoComplete='off'
					onSubmit={handleSubmit}>
					<input
						className='input name'
						name='name'
						type='text'
						placeholder='Enter your name'
					/>
					<input
						className='input password'
						name='password'
						type='password'
						placeholder='Enter your password'
					/>
					<button className='btn' type='submit'>
						Login
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
