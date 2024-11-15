import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
// import { disconnect } from "mongoose";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import PlacesPlace from "./PlacesPage";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const [Redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    if (!ready) {
        return 'Loading......';
    }
    if (ready && !user && !Redirect) {
        return <Navigate to={'/login'} />
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

    return (
        <div>
            <AccountNav/>
            {subpage === "profile" && (
                <div className="text-center max-w-lg  mx-auto ">

                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-sm mt-2"> Logout</button>

                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}