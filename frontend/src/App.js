/*routing for application pages*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm, RegisterForm } from "./components/LoginForm";
import Navbar from "./components/Navbar";
import CourseList from "./pages/CourseList";
import CourseDetails from "./pages/CourseDetails";
import ReviewForm from "./pages/ReviewForm";
import "./App.css";
import { UserProvider } from "./UserContext";

/*link pathways for 3 pages*/
function App() {
    return (
        <UserProvider>
            <Router>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<CourseList />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/course/:id" element={<CourseDetails />} />
                        <Route path="/course/:id/review" element={<ReviewForm />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
