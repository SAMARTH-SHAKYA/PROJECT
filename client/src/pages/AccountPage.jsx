import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import './AccountPage.css'; 

export default function AccountPage() {
    const [Redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    if (!ready) {
        return 'Loading......';
    }

    if (ready && !user && !Redirect) {
        return <Navigate to={'/login'} />;
    }

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    function LinkClasses(type = null) {
        let classes = 'link-style';
        if (type === subpage || (subpage === undefined && type === "profile")) {
            classes += ' active-link';
        }
        return classes;
    }

    if (Redirect) {
        window.location.reload();
        return <Navigate to={Redirect} />;
    }

    return (
        <div>
            <nav className="nav-bar">
                <Link className={LinkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={LinkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={LinkClasses('places')} to={'/account/places'}>My accommodation</Link>
            </nav>
            {subpage === "profile" && (
                <div className="profile-info">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="logout-button">Logout</button>
                </div>
            )}
        </div>
    );
}
