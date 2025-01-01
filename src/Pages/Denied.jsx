import {useNavigate} from 'react-router-dom'
function Denied(){
    const navigate = useNavigate();
    return(
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className=" text-9xl font-extrabold tracking-widest"> 403 </h1>
        <div className="bg-black  text-white px-2 text-2xl rounded rotate-12 absolute">Access denied</div>
       <div>
          {/* <CiFaceFrown className="relative inline-block text-6xl ml-4 text-white" /> */}

       </div>
        <span className="mt-5 relative inline-block "> 
            <button onClick={()=>navigate(-1)} className="px-8 py-3 rounded-md border border-current text-sm font-medium text-[#ff6a3d] group active:text-yellow-300">Go Back..</button>
        </span>
    
    
    </div>
    )

}
export default Denied;