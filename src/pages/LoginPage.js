import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import NavBar from "../components/navigation/NavBar";
import Separator from "../components/navigation/Separator";

function LoginPage() {
	const navigate = useNavigate();

	const handleLoginSuccess = (userData) => {
		localStorage.setItem("jwt", userData.token);
		localStorage.setItem("refreshToken", userData.refreshToken);

		navigate("/available-assessments", { state: { internName: userData.name } });
	};

	return (
		<div>
			<NavBar />
			<Separator />
			<LoginForm onLoginSuccess={handleLoginSuccess} />
		</div>
	);
}

export default LoginPage;
