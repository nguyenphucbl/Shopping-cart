import { useSelector } from "react-redux";
import "./App.css";
import Counter from "./components/Counter";
import Products from "./components/Products/Products";
import Todo from "./components/Todo";

//import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "./components/Modal/Modal";
import { useState } from "react";

function App() {
  const { quantityTotal } = useSelector((state) => state.productList);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="
    container
    "
      >
        <div className="nav-bar container">
          <div className="row">
            <div className="col-md-2 col-sm-6">
              <h1 style={{ lineHeight: 1.6 }}>Logo</h1>
            </div>
            <div className="col-md-10 col-sm-6">
              <div className="product-quantity d-flex justify-content-end ">
                <i
                  className="fa-solid fa-cart-shopping
              shopping-cart-btn
            "
                  onClick={() => setShowModal(true)}
                ></i>
                <span className="quantity">{quantityTotal}</span>
              </div>
            </div>
          </div>
        </div>
        {/* <Counter /> */}
        {/* <Todo /> */}
        <Products />
        <Modal showModal={showModal} onClick={handleClose} />
      </div>
    </>
  );
}

export default App;
