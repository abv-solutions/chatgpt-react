import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
	const [prompt, setPrompt] = useState('');
	const [results, setResults] = useState([]);

	useEffect(() => {
		const message = document.querySelector('.message');
		message.scrollTop = message?.scrollHeight;
	}, [results]);

	// Call click function
	const onSubmit = async (event) => {
		event.preventDefault();
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
			data && setResults((prev) => [...prev, myMessage, data]);
		} catch (error) {
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
						<input type='submit' value='Ask me' />
					</form>
				</main>
			</div>
		</div>
	);
};

export default App;
