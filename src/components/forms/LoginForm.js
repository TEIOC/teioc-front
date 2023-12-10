import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/form.css'; // Importez le fichier CSS générique pour le formulaire

function LoginForm({ onLoginSuccess }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLoginClick = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("http://localhost:8080/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			const data = await response.json();
			onLoginSuccess(data);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="form-container">
			<div className="form-title">
				<h2>Login</h2>
			</div>
			<form className="form" onSubmit={handleLoginClick}>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<div className="form-footer">
					<button type="submit" className="button">
						Login
					</button>
					<Link to="/forgot-password" className="link">
						Forgot password?
					</Link>
				</div>
			</form>
			{error && <div className="error-message">{error}</div>}
			<div className="additional-section">
				Don't have an account?{" "}
				<Link to="/register" className="link">
					Register
				</Link>
			</div>
		</div>
	);
}

export default LoginForm;


