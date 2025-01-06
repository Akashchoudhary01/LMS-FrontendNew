import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import {BiRupee} from 'react-icons/bi'
import { useEffect } from "react";
import {Link} from 'react-router-dom'
import { getRazorPayId, 
    purchaseCourseBundle,
     verifyUserPayment 
    } from "../../redux/Slices/RazorPaySlice";
import toast from "react-hot-toast";


const Checkout=() =>{
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const razorPayKey = useSelector((state)=>state?.razorpay?.key);
    const subscription_Id = useSelector((state) => state?.razorpay?.subscription_Id);
    const userData = useSelector((state)=> state?.auth?.data);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
    
    // for storing the payment details after successfull transaction
    const paymentDetails = {
        razorpay_payment_id : " ", 
        razorpay_subscription_id : " ",
        razorpay_signature: ""
    }

    async function handelSubscription(e){
        e.preventDefault();
        if(!razorPayKey || !subscription_Id){
            toast.error('Something Went Wrong');
            return;
        }
        const options = {
            key: razorPayKey,
            subscription_id: subscription_Id,
            name: "Code Craft Pvt.Ltd.",
            description: "Subscription",
            handler : async function (response){
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                 // displaying the success message
                toast.success("Payment Successfull");

                // verifying the payment
                const res = await dispatch(verifyUserPayment(paymentDetails));
                // redirecting the user according to the verification status
                isPaymentVerified ? nevigate ("/checkout/success") : nevigate('/checkout/failed')
            },
            prefill: {
                name: userData.fullName,
                email: userData.email,
              },
              theme: {
                color: "#F37254",
              },
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
          
    };
    useEffect(() => {
        (async () => {
          await dispatch(getRazorPayId());
          await dispatch(purchaseCourseBundle());
        })();
      }, []);


    // Ui
    return(
        <HomeLayout>
            <div className="h-[90vh] flex items-center text-white justify-center">
                <form action=""
                className="min-h[90vh] items-center justify-center text-white"
                 onSubmit={handelSubscription}
                 >
                    <div className="w-80 h-[26rem] m-auto text-center flex flex-col justify-center shadow-[0_0_10px_black] relative rounded-lg">
                        <h1 className="bg-blue-500 absolute left-4 top-2 w-[90%] text-center py-4 text-2xl font-bold rounded-badge ">Subscription Bundle</h1>
                        <div className="px-4 space-y-5 text-center">
                            <p className="text-[1.1rem] mt-8">
                                This Purchase Will Allow You To Access all available courses of out plateform for {""}
                                <span className="text-blue-500">
                                    <br />
                                    1 year Duration {""}
                                </span>
                                    All The existing and New Courses will also Available
                            </p>
                            <p className="flex item-center justify-center gap-1 text-2xl font-bold text-blue-500">
                                <BiRupee/> <span className="">499 Only</span>
                            </p>
                            <button type="submit" className="bg-blue-500 py-3 px-16 hover:bg-blue-400 rounded-lg transition-all ease-in-out duration-300">
                                Buy Now
                            </button>

                            <div className="text-gray-200 items-center justify-center">
                                <p> 100 % refund On Cancellation </p>
                                <Link to='/about'> <p className="text-xs items-center justify-center absolute bottom-2 right-4 text-blue-600"> *Terms and Condition applied* </p></Link>
                        
                            </div>

                        </div>
                    </div>
                 </form>



            </div>

        </HomeLayout>
    )

}
export default Checkout;