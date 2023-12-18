import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginPageLayout } from "./LoginPageLayout";
import LoginForm from "../../components/forms/LoginForm";

function LoginPage() {
	const navigate = useNavigate();

	const handleLoginSuccess = (userData) => {
		localStorage.setItem("jwt", userData.token);
		localStorage.setItem("refreshToken", userData.refreshToken);
		navigate("/available-assessments", { state: { internName: userData.name } });
	};

	return (
		<LoginPageLayout>
			<LoginForm onLoginSuccess={handleLoginSuccess} />
		</LoginPageLayout>
	);
}

export default LoginPage;

