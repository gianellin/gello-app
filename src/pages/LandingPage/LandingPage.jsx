import React from 'react';
import { Link } from 'react-router-dom';


const Div = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	color: white;
	height: 85vh;
	width: 100vw;
	img {
		width: 500px;
		height: 500px;
		border-radius: 10px;
	}
	.signupBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		background-color: white;
		background-size: 150%;
		background-repeat: no-repeat;
		background-position: center center;
		border-radius: 10px;
		padding: 15px;
		width: 500px;
		height: 500px;
	}
	.signupText {
		background-color: black;
		padding: 10px;
		border-radius: 10px;
	}
	link {
		width: 30%;
	}
	.btn-landing {

		color: white;
		width: 100%;
		&:hover {
		}
	}
`;

const LandingPage = (props) => {
	return (
		<Div>
			<motion.img src="https://i.imgur.com/Cwb6HA5.png" />
			{props.user ? (
				<div className="signupBox">
					<div className="signupText">
						<h2>Welcome back, {props.user.name}!</h2>
						<p>
						
						</p>
					</div>
				</div>
			) : (
				<div className="signupBox">
					<div className="signupText">
						<h2>Sign Up Now!</h2>
						<p>
						
						</p>
					</div>
					<Link to="/signup" style={{ textDecoration: 'none' }}>
						<button className="btn btn-landing">Sign Up</button>
					</Link>
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<button className="btn btn-landing">Log In</button>
					</Link>
				</div>
			)}
		</Div>
	);
};

export default LandingPage;