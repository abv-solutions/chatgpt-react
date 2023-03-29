import './App.css';
import { useState, useEffect } from 'react';
import Spinner from './components/Spinner';

const App = () => {
	const [prompt, setPrompt] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const message = document.querySelector('.message');
		message.scrollTop = message.scrollHeight;
	}, [loading]);

	// Call click function
	const onSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(`/chat/${prompt || 0}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				//body: JSON.stringify({ prompt }),
			});
			const data = await response.json();
			const myMessage = {
				_id: 'dummyId',
				message: prompt || 0,
			};
			setTimeout(() => {
				data && setResults((prev) => [...prev, myMessage, data]);
				setLoading(false);
			}, 1000);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<div className='App'>
			<div className='App-content'>
				<h1>ChatGPT</h1>
				<main className='main'>
					<div className='result'>
						<div className='message'>
							{results.map(({ _id, message }, idx) => (
								<p
									key={Math.random().toString(36).substring(2, 5)}
									style={{
										backgroundColor: idx % 2 === 0 ? '#343949' : '#1c1f26',
									}}
								>
									{message}
								</p>
							))}
							{loading && (
								<div
									style={{
										backgroundColor: '#343949',
									}}
								>
									<Spinner />
								</div>
							)}
						</div>
					</div>
					<form onSubmit={onSubmit}>
						<textarea
							name='prompt'
							rows='3'
							placeholder='Enter a prompt'
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
						/>
						<input type='submit' value='Ask me' disabled={loading} />
					</form>
				</main>
			</div>
		</div>
	);
};

export default App;
