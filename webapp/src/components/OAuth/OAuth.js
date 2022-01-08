import { useState } from 'react';
function OAuth(props) {
	const [linkList, setLinkList] = useState([
		{
			provider: 'Google',
			link: '/',
			logo: '/'
		}
	]);
	return (
		<ul>
		{linkList.map((e, i) => <li key={i}><a href={e.link}>{e.provider}</a></li>)}
		</ul>
	);
};

export default OAuth;

