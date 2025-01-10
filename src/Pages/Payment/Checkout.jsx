import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import Layout from "../../Layout/Layout";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/razorpaySlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorPayKey = useSelector((state) => state.razorpay.key);
  const subscription_id = useSelector(
    (state) => state.razorpay.subscription_id
  );
  const userData = useSelector((state) => state.auth.data);
  const { isPaymentVerified } = useSelector((state) => state.razorpay);

  // for storing the payment details after successfull transaction
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  const handleSubscription = async (event) => {
    event.preventDefault();

    // checking for empty payment credential
    if (!razorPayKey || !subscription_id) {
      return;
    }

    const options = {
      key: razorPayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Monthly Subscription",
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        // displaying the success message
        toast.success("Payment Successfull");

        // verifying the payment
        const res = await dispatch(verifyUserPayment(paymentDetails));

        // redirecting the user according to the verification status
        !isPaymentVerified
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
      prefill: {
        name: userData.fullName,
        email: userData.email,
      },
      theme: {
        color: "#F37254",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    (async () => {
      await dispatch(getRazorPayId());
      await dispatch(purchaseCourseBundle());
    })();
  }, []);

  return (
    <Layout>
      {/* checkout page container */}
       <div className="h-[90vh]  flex items-center text-white justify-center">
            {/* checkout page container */}
            <form
              onSubmit={handleSubscription}
               className="min-h[90vh] mt-5 items-center justify-center text-white"
        
            >
              {/* checkout card */}
              <div className="w-80 h-[30rem] m-auto text-center flex flex-col justify-center shadow-[0_0_10px_black] relative rounded-lg">
                <h1 className="bg-blue-500 absolute left-4 top-2 w-[90%] text-center py-4 text-2xl font-bold rounded-badge ">
                  Subscription Bundle
                </h1>
    
                <div className="px-4 space-y-5 mt-5 text-center">
                  <p className="text-[1.1rem] mt-8">
                    This purchase will allow you to access all the available courses
                    of our platform for{" "}
                    <span className="text-blue-500 font-bold">1 Year Duration</span>
                    . <br />
                    All the existing and new launched courses will be available to
                    you in this subscription bundle
                  </p>
    
                  <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                    <BiRupee /> <span>499</span>only
                  </p>
                  <button
                    type="submit"
                    className="bg-blue-500 py-3 px-16 hover:bg-blue-400 rounded-lg transition-all ease-in-out duration-300"
                  >
                    Buy Now
                  </button>
                  <div className="text-gray-200 items-center justify-center">
                    <p> 100 % refund On Cancellation </p>
                    <Link to="/about">
                      {" "}
                      <p className="text-xs items-center justify-center absolute bottom-2 right-4 text-blue-600">
                        {" "}
                        *Terms and Condition applied*{" "}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
    </Layout>
  );
};

export default Checkout;