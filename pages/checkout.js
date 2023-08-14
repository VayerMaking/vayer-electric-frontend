import { useState } from 'react'
import Head from 'next/head'
import { SiteContext, ContextProviderComponent } from "../context/mainContext"
import DENOMINATION from "../utils/currencyProvider"
import { FaLongArrowAltLeft } from "react-icons/fa"
import Link from "next/link"
import Image from "../components/Image"
import { v4 as uuid } from "uuid"
import * as consts from '../consts/consts'

function CheckoutWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {context => <Checkout {...props} context={context} />}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

const Input = ({ onChange, value, name, placeholder }) => (
  <input
    onChange={onChange}
    value={value}
    className="mt-2 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    placeholder={placeholder}
    name={name}
  />
)

const Checkout = ({ context }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postal_code: "",
    state: "",
  })
  const [selectedshippingMethod, setSelectedShippingMethod] = useState('')

  const onChange = e => {
    setErrorMessage(null)
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const calculateShipping = () => {
    if (selectedshippingMethod === 'free') {
      return 0
    } else if (selectedshippingMethod === 'express') {
      return 10
    } else if (selectedshippingMethod === 'overnight') {
      return 20
    } else {
      return 0
    }
  }


  const handleSubmit = async event => {
    event.preventDefault()
    const { name, email, phone, street, city, postal_code, state } = input
    const { total, clearCart } = context

    // Validate input
    if (!street || !city || !postal_code || !state || !phone) {
      setErrorMessage("Please fill in the form!")
      return
    }

    const order = {
      email,
      amount: total,
      address: state, // should this be {street, city, postal_code, state} ?
      payment_method_id: paymentMethod.id,
      receipt_email: "customer@example.com",
      id: uuid(),
    }
    // TODO call API
    setOrderCompleted(true)
    clearCart()
  }

  const { numberOfItemsInCart, cart, total } = context
  const cartEmpty = numberOfItemsInCart === Number(0)

  if (orderCompleted) {
    return (
      <div>
        <h3>Thanks! Your order has been successfully processed.</h3>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center pb-10">
      <Head>
        <title>Vayer Electric - Checkout</title>
        <meta name="description" content={`Check out`} />
        <meta property="og:title" content="Vayer Electric - Checkpit" key="title" />
      </Head>
      <div
        className="
            flex flex-col w-full
            c_large:w-c_large
          "
      >
        <div className="pt-10 pb-8">
          <h1 className="text-5xl font-light mb-6">Checkout</h1>
          <Link href="/cart">
            <a aria-label="Cart">
              <div className="cursor-pointer flex  items-center">
                <FaLongArrowAltLeft className="mr-2 text-gray-600" />
                <p className="text-gray-600 text-sm">Edit Cart</p>
              </div>
            </a>
          </Link>
        </div>

        {cartEmpty ? (
          <h3>No items in cart.</h3>
        ) : (
          <div className="flex flex-col">
            <div className="">
              {cart.map((item, index) => {
                return (
                  <div className="border-b py-10" key={index}>
                    <div className="flex items-center">
                      <Image
                        className="w-32 m-0"
                        src={`${consts.IMAGES_BASE_URL}/${item.image_url}`}
                        alt={item.name}
                      />
                      <p className="m-0 pl-10 text-gray-600">
                        {item.name}
                      </p>
                      <div className="flex flex-1 justify-end">
                      <p className="m-0 pl-10 text-gray-900 font-semibold">
                          {item.quantity}
                        </p>
                        <p className="m-0 pl-10 text-gray-900 font-semibold">
                          {item.price + DENOMINATION}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-1 flex-col md:flex-row">
              <div className="flex flex-1 pt-8 flex-col">
                <div className="mt-4 border-t pt-10 border-gray-300">
                  <form onSubmit={handleSubmit}>
                    {errorMessage ? <span>{errorMessage}</span> : ""}
                    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3">
                      <div>
                        <Input
                          onChange={onChange}
                          value={input.name}
                          name="name"
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <Input
                          onChange={onChange}
                          value={input.email}
                          name="email"
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <Input
                          onChange={onChange}
                          value={input.phone}
                          name="phone"
                          placeholder="Phone"
                        />
                      </div>
                    </div>


                    <div>
                      <Input
                        onChange={onChange}
                        value={input.street}
                        name="street"
                        placeholder="Street"
                      />
                    </div>
                    <div>
                      <Input
                        onChange={onChange}
                        value={input.city}
                        name="city"
                        placeholder="City"
                      />
                    </div>
                    <Input
                      onChange={onChange}
                      value={input.postal_code}
                      name="postal_code"
                      placeholder="Postal Code"
                    />
                    <select
                      className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedshippingMethod}
                      onChange={e => setSelectedShippingMethod(e.target.value)}
                      placeholder="Shipping Method"
                    >
                      <option label="Shipping Method" disabled></option>
                      <option value="free">Free Shipping</option>
                      <option value="express">Express Shipping</option>
                      <option value="overnight">Overnight Shipping</option>
                    </select>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="hidden md:block bg-primary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Confirm order
                    </button>
                  </form>
                </div>
              </div>
              <div className="md:pt-20">
                <div className="pl-4 flex flex-1 pt-2 md:pt-8 mt-2 sm:mt-0">
                  <p className="text-sm pr-10 text-left">Subtotal</p>
                  <p className="w-38 flex text-right justify-end">
                    {total + DENOMINATION}
                  </p>
                </div>
                <div className="pl-4 flex flex-1 my-2">
                  <p className="text-sm pr-10">Shipping</p>
                  <p className="w-38 flex justify-end">
                    {calculateShipping(selectedshippingMethod) + DENOMINATION}
                  </p>
                </div>
                <div className="md:ml-4 pl-2 flex flex-1 bg-gray-200 pr-4 pb-1 pt-2 mt-2">
                  <p className="text-sm pr-10">Total</p>
                  <p className="font-semibold w-38 flex justify-end">
                    {(total + calculateShipping(selectedshippingMethod)) + DENOMINATION}
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="md:hidden bg-primary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}

export default CheckoutWithContext