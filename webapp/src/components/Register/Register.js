import OAuth from "../OAuth/OAuth";
import { useState } from 'react';

function UserEmail(props) {
	const [state, setState] = useState({email:'', username: ''});
	return (
		<>
			<div className="email-form">
				<form method="POST" action="/" onSubmit={(e) => {
					e.preventDefault();
					<input type="text" name="username" value={state.username} onChange={(e) => setState(e.target.value)}/>
				}}>
					<input type="email" name="email" value={state.email} onChange={(e) => setState(e.target.value)}/>
					<input type="submit" />
				</form>
			</div>
		</>
	);
}

function Register(props) {
	return (
		<>
			<div className="register">
				<OAuth />
				<UserEmail />
			</div>
		</>
	);
}

export default Register;
