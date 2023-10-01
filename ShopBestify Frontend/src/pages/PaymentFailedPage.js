import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, fetchCurrentUserAsync } from "../features/auth/authSlice";
import { resetOrder, selectCurrentOrder, sendOrderAsync } from "../features/order/orderSlice";
import { fetchLoggedInUserAsync, selectUserOrders } from "../features/user/userSlice";

function PaymentFailedPage() {
  const params = useParams()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUserAsync()).then((u) => {
      dispatch(fetchLoggedInUserAsync(u.payload.user)).then((u) => {
        dispatch(resetCartAsync(u.payload.id)).then(() =>
          // reset currentOrder
          dispatch(resetOrder())
        )
      })
    })
    //dispatch(resetCartAsync(user.id));
    //dispatch(resetOrder());
  }, [dispatch])

  return (
    <>
      {!params.id && <Navigate to='/' replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Payment Failed
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default PaymentFailedPage;
