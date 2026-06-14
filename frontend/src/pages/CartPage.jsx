import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

export default function CartPage() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(
      localStorage.getItem("cart")
    ) || []
  );

  const increaseQty = (id) => {

    const updated =
      cart.map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1
            }
          : item
      );

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  const decreaseQty = (id) => {

    const updated =
      cart.map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                Math.max(
                  1,
                  item.quantity - 1
                )
            }
          : item
      );

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  const removeItem = (id) => {

    const updated =
      cart.filter(
        item => item.id !== id
      );

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.cmimi *
          item.quantity,
      0
    );

  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      {cart.map(item => (

        <div
          className="cart-item"
          key={item.id}
        >

          <img
            src={`http://localhost:3000/uploads/${item.foto}`}
            alt={item.emertimi}
          />

          <div>

            <h3>
              {item.emertimi}
            </h3>

            <p>
              €
              {item.cmimi}
            </p>

            <div className="qty-box">

              <button
                onClick={() =>
                  decreaseQty(
                    item.id
                  )
                }
              >
                -
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQty(
                    item.id
                  )
                }
              >
                +
              </button>

            </div>

            <button
              onClick={() =>
                removeItem(
                  item.id
                )
              }
            >
              Remove
            </button>

          </div>

        </div>

      ))}

      <h2>
        Total:
        €
        {total.toFixed(2)}
      </h2>

      <button
        onClick={() =>
          navigate("/checkout")
        }
      >
        Continue Order
      </button>

    </div>
  );
}