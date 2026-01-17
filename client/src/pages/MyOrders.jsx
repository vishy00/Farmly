import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([])
    const {currency, axios, user} = useAppContext()

    const fetchMyOrders = async () => {
        try {
            const {data} = await axios.get('/api/order/user', { withCredentials: true })
            if(data.success){
                setMyOrders(data.orders)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(user){
            fetchMyOrders()
        }
    },[user])

return (
  <div className="mt-20 pb-20 px-4">
    {/* Heading */}
    <div className="flex flex-col items-start mb-12">
      <p className="text-3xl font-semibold uppercase tracking-wide text-gray-900">
        My Orders
      </p>
      <div className="w-20 h-1 bg-primary rounded-full mt-2"></div>
    </div>

    {myOrders.map((order, index) => (
      <div
        key={index}
        className="backdrop-blur-xl bg-white/70 border border-gray-200
                   rounded-2xl mb-12 p-6 max-w-5xl shadow-lg"
      >
        {/* Order summary */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between
                        gap-3 mb-6 text-gray-900 font-medium">
          <span>Order ID: {order._id}</span>
          <span>Payment: {order.paymentType}</span>
          <span>Total: {currency}{order.amount}</span>
        </div>

        {/* Order items */}
        {order.items.map((item, index) => (
          <div
            key={index}
            className={`relative bg-white/80 backdrop-blur-md rounded-xl
              ${order.items.length !== index + 1 && "border-b"}
              border-gray-200 flex flex-col md:flex-row md:items-center
              justify-between gap-6 p-6`}
          >
            {/* Left */}
            <div className="flex items-center gap-5">
              <div className="bg-primary/15 p-4 rounded-xl">
                <img
                  src={item?.product?.image?.[0] || "/placeholder.png"}
                  alt={item?.product?.name || "product"}
                  className="w-16 h-16 object-contain"
                />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {item?.product?.name || "Product removed"}
                </h2>
                <p className="text-gray-700">
                  Category: {item?.product?.category || "N/A"}
                </p>
              </div>
            </div>

            {/* Middle */}
            <div className="flex flex-col text-gray-800 space-y-1">
              <p>Quantity: {item.quantity || "1"}</p>
              <p>Status: {order.status}</p>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Right */}
            <div className="text-primary text-xl font-semibold">
              {currency}{(item?.product?.offerPrice || 0) * (item?.quantity || 1)}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
)
}

export default MyOrders