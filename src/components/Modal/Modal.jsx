import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementProductQuantity,
  removeProductQuantity,
  incrementProductQuantity,
} from "../../redux/slices/productSlice";

Modal.propTypes = {
  showModal: PropTypes.bool,
  onClick: PropTypes.func,
};

export default function Modal({ showModal, onClick }) {
  const { buyProducts } = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  const handleIncrement = (productId) => {
    dispatch(incrementProductQuantity(productId));
  };

  const handleDecrement = (productId, quantity) => {
    if (quantity === 1) return;
    dispatch(decrementProductQuantity(productId));
  };

  const handleRemove = (productId) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (!isConfirm) return;

    dispatch(removeProductQuantity(productId));
  };

  const totalAll = buyProducts.reduce(
    (total, product) => total + product.price * product.quantityBuy,
    0
  );
  if (!showModal) return null;
  console.log("Modal component is rendering");

  return createPortal(
    <div className="modal-product d-flex justify-content-center align-items-center">
      <div className="overlay" onClick={onClick}></div>
      <div className="container-product ">
        <div className="heading text-center">
          <h2>Shopping Cart</h2>
        </div>
        {buyProducts.length > 0 ? (
          buyProducts.map((product) => (
            <div className="product-box d-flex mt-4" key={product._id}>
              <img src={product.image} alt="" />
              <div className="details">
                <span className="brand">{product.brand}</span>
                <span className="title">{product.name}</span>
                <div className="price">{product.price}$</div>
                <div className="quantity">
                  Còn lại: {product.quantity - product.quantityBuy}
                </div>
                <div className="edit d-flex">
                  Số lượng:
                  <i
                    className={`fa-solid fa-minus ${
                      product.quantityBuy === 1 && "disabled"
                    }`}
                    onClick={() =>
                      handleDecrement(product._id, product.quantityBuy)
                    }
                  ></i>
                  <span className="quantity-add">{product.quantityBuy}</span>
                  <i
                    className="fa-solid fa-plus"
                    disabled={product.quantityBuy === product.quantity}
                    onClick={() => handleIncrement(product._id)}
                  ></i>
                </div>
                <span className="total-price-product">
                  {product.price * product.quantityBuy}$
                </span>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleRemove(product._id)}
                ></i>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <span>Cart is empty</span>
          </div>
        )}
        <div className="btn-close close-modal-product" onClick={onClick}></div>
        <div className="total-all">
          <span>Total All: {totalAll} </span>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
}
