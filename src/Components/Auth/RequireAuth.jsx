import { Navigate, Outlet , useLocation} from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuth(){
    const {isLoggedIn , role} = useSelector((state) => state.auth);
    const location = useLocation();
     
return isLoggedIn && allowedRoles.find((myRole) =>myRole == role) ? (
    <Outlet/>
): isLoggedIn ? (<Navigate to="/denied" />) : (<Navigate to='/login'/>)

}
export default RequireAuth;