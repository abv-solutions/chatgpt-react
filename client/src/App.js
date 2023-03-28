import './App.css';
import { useState } from 'react';

const App = () => {
	const [prompt, setPrompt] = useState('test');
	const [results, setResults] = useState([]);
	const [index, setIndex] = useState(0);

	// Call click function
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(`/chat/${index}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				//body: JSON.stringify({ prompt }),
			});
			const data = await response.json();
			data && setResults((prev) => [...prev, data]);
			data && setIndex(index + 1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='App'>
			<div className='App-content'>
				<h1>ChatGPT</h1>
				<main className='main'>
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
					<div className='result'>
						<div>
							{results.map(({ _id, message }) => (
								<p key={_id}>{message}</p>
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default App;
