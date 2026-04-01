import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const UserName = e.target.UserName.value;
        const Password = e.target.Password.value;
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify({ UserName, Password }),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            alert("Login failed: " + (await response.json().message));
            return;
        }

        const data = await response.json();
        console.log(data);
        setUser(data.UserID);
        navigate("/"); // Redirect to homepage after successful login
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="username">UserName</label>
            <input type="text" id="username" name="UserName" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}

function RegisterForm() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Email = e.target.Email.value;
        const UserName = e.target.UserName.value;
        const Password = e.target.Password.value;
        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            body: JSON.stringify({ Email, UserName, Password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 201) {
            navigate("/login"); // Redirect to login page after successful registration
        } else {
            alert("Registration failed: " + (await response.json().message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="Email" required />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="UserName" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="Password" required />
            <button type="submit">Register</button>
        </form>
    );
}

export { LoginForm, RegisterForm };
