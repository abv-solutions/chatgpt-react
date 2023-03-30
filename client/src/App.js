import './App.css';
import { useState, useEffect } from 'react';
import Spinner from './components/Spinner';
import { MessageType, Colors } from './utils/constants';

const App = () => {
	const [loading, setLoading] = useState(false);
	const [prompt, setPrompt] = useState('');
	const [messages, setMessages] = useState([]);
	const [pairMessages, setPairMessages] = useState([]);

	useEffect(() => {
		const message = document.querySelector('.message');
		const textarea = document.querySelector('.input-textarea');
		message.scrollTop = message.scrollHeight;
		textarea.scrollTop = textarea.scrollHeight;
	}, [loading]);

	// Call submit function
	const onSubmit = async (event) => {
		event.preventDefault();
		if (!prompt) return;
		setLoading(true);
		try {
			const response = await fetch('/chat?' + new URLSearchParams({ prompt }), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const answer = await response.json();
			const question = {
				_id: 'dummyId',
				message: prompt,
				type: MessageType.Question,
			};
			setTimeout(() => {
				setLoading(false);
				setPrompt('');
				if (response.status === 200) {
					setMessages((prev) => [
						...prev,
						question,
						{ ...answer, type: MessageType.Answer },
					]);
					setPairMessages((prev) => [
						...prev,
						{ prompt, message: answer.message },
					]);
				}
			}, 500);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	// Call data click function
	const onDataClick = async () => {
		setLoading(true);
		try {
			const query = { completed: false, userId: 7, limit: 5 };
			const response = await fetch('/todo?' + new URLSearchParams(query), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			const message = `Given this data:\n${JSON.stringify(
				data.slice(0, 5)
			)},\ntell me `;
			setTimeout(() => {
				setLoading(false);
				setPrompt(message);
				document.querySelector('.input-textarea')?.focus();
			}, 500);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	// Call save click function
	const onSaveClick = async () => {
		if (!pairMessages || pairMessages.length === 0) return;
		setLoading(true);
		try {
			const response = await fetch('/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(pairMessages),
			});
			setTimeout(() => {
				setLoading(false);
				response.status === 201 && setPairMessages([]);
			}, 500);
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
							{messages.map(({ _id, message, type }) => (
								<p
									key={Math.random().toString(36).substring(2, 5)}
									style={{
										backgroundColor:
											type === MessageType.Question
												? Colors.Question
												: Colors.Answer,
									}}
								>
									{message}
								</p>
							))}
							{loading && (
								<div
									style={{
										backgroundColor: Colors.Question,
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
							className='input-textarea'
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
						/>
						<input type='submit' value='Ask me' disabled={loading || !prompt} />
					</form>
					<div className='button-wrapper'>
						<button
							className='data-button'
							disabled={loading}
							onClick={onDataClick}
						>
							Input data
						</button>
						<button
							className='save-button'
							disabled={loading || !pairMessages || pairMessages.length === 0}
							onClick={onSaveClick}
						>
							Save
						</button>
					</div>
				</main>
			</div>
		</div>
	);
};

export default App;
