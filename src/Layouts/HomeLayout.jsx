import { FiMenu } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { Logout } from '../redux/Slices/AuthSlice';


function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check if the user is logged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    // Display options according to role
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = '0';
    }

    async function handelLogout(e) {
        e.preventDefault();
        
        const res = await dispatch(Logout());
        if(res?.payload?.success)
        navigate('/');
    }

    return (
        <div className="min-h-[90vh] ">
            {/* Drawer */}
            <div className="drawer absolute left-0 z-50 w-fit">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu size="32px" className="font-bold text-white m-4" onClick={changeWidth} />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 h-[100%] w-48 sm:w-80 bg-base-100 text-base-content">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/dashbord">Admin Dashboard</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li>
                            <Link to="/contect">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        {!isLoggedIn && (
                            <li className="bottom-7 absolute w-[90%] gap-3 h-22 hover:bg-transparent">
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn-primary bg-blue-500 py-1 px-4 font-semibold rounded-md w-full hover:bg-blue-700 transition-all ease-in-out duration-300">
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className="btn-secondary text-black bg-yellow-400 py-1 px-4 font-semibold rounded-md w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                                        <Link to="/register">Signup</Link>
                                    </button>
                                </div>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li className="bottom-7 absolute w-[90%] gap-3 hover:bg-transparent">
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn-primary bg-blue-500 py-1 px-4 font-semibold rounded-md w-full hover:bg-blue-700 transition-all ease-in-out duration-300">
                                        <Link to="/user/profile">Profile</Link>
                                    </button>
                                    <button
                                        onClick={handelLogout}
                                        className="btn-secondary text-black bg-yellow-400 py-1 px-4 font-semibold rounded-md w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {children}

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default HomeLayout;
