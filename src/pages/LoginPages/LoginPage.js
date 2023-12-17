import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginPageLayout } from "./LoginPageLayout";
import LoginForm from "../../components/forms/LoginForm";

function LoginPage() {
	const navigate = useNavigate();

	const handleLoginSuccess = (userData) => {
		localStorage.setItem("jwt", userData.token);
		navigate("/available-assessments", { state: { internName: userData.name } });
	};

	return (
		<LoginPageLayout> {/* Use LoginPageLayout for LoginPage */}
			<LoginForm onLoginSuccess={handleLoginSuccess} />
		</LoginPageLayout>
	);
}

export default LoginPage;

