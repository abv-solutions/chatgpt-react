import './App.css';
import { useState } from 'react';

const App = () => {
	const [prompt, setPrompt] = useState('test');
	const [result, setResult] = useState();

	// Call click function
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch('/chat', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				//body: JSON.stringify({ prompt }),
			});
			const data = await response.json();
			console.log(data);
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
							rows='5'
							placeholder='Enter a prompt'
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
						/>
						<input type='submit' value='Submit' />
					</form>
					<div>{result}</div>
				</main>
			</div>
		</div>
	);
};

export default App;
