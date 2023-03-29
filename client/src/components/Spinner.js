import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
	return (
		<div>
			<img
				src={spinner}
				alt='Loading...'
				style={{
					height: '30px',
					margin: '0 auto',
					display: 'block',
					padding: '1rem',
				}}
			/>
		</div>
	);
};

export default Spinner;
