import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { disconnect } from "mongoose";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

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
   
    function LinkClasses(type=null){
        let classes = 'py-2 px-6';
        if(type === subpage || (subpage === undefined && type === "profile")){
            classes += ' bg-primary text-black rounded-full';
        }
        return classes;
    }

    if (Redirect) {
        window.location.reload();
        return <Navigate to={Redirect} />;
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            
                <Link className={LinkClasses('profile')} to={'/account'}>My profile</Link>

                <Link className={LinkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={LinkClasses('places')} to={'/account/places'}>My accomodation</Link>

            </nav>
            {subpage === "profile" && (
                <div className="profile-info">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="logout-button">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage></PlacesPage>
            )}
        </div>
    );
}
