import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";


const NavBar = () => {
    const { currentUser, signOut } = useAuth();

    return (
        <nav className="flex fixed top-0 w-full z-50 bg-white items-center justify-between shadow px-5 py-3">
            <Link to="/">
                <h1 className="text-[#1e1e1e] text-2xl font-bold">PPT Cloud</h1>
            </Link>
            <div>
                {
                    currentUser && <button onClick={signOut} className="bg-[#f5f5f5] text-gray-800 font-medium rounded-xl px-4 py-2.5 ml-3">Logout</button>
                }
            </div>
        </nav>
    )
}

export default NavBar;