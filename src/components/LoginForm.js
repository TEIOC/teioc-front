import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/form.css'; // Importez le fichier CSS générique pour le formulaire

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
		<div className="form-container"> {/* Utilisez la classe CSS générique pour le formulaire */}
			<div className="form-title"> {/* Utilisez la classe CSS générique pour le titre du formulaire */}
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

				<div className="form-footer"> {/* Utilisez la classe CSS générique pour le pied de formulaire */}
					<button type="submit" className="button"> {/* Utilisez la classe CSS générique pour le bouton */}
						Login
					</button>
					<Link to="/forgot-password" className="link"> {/* Utilisez la classe CSS générique pour le lien */}
						Forgot password?
					</Link>
				</div>
			</form>
			{error && <div className="error-message">{error}</div>} {/* Utilisez la classe CSS générique pour le message d'erreur */}
			<div className="additional-section"> {/* Utilisez la classe CSS générique pour la section supplémentaire */}
				Don't have an account?{" "}
				<Link to="/register" className="link"> {/* Utilisez la classe CSS générique pour le lien */}
					Register
				</Link>
			</div>
		</div>
	);
}

export default LoginForm;


