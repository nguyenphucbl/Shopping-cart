import { useDispatch, useSelector } from "react-redux";
import "./Products.scss";
import { useEffect, useRef } from "react";
import { getProducts } from "../../redux/middlewares/productsMiddleware";
import { incrementProduct } from "../../redux/slices/productSlice";

import { Loading, Show } from "../Core";

export default function Products() {
  const { data } = useSelector((state) => state.productList.products);
  const { status, error } = useSelector((state) => state.productList);
  const listProduct = data?.listProduct;
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      dispatch(getProducts());
    }
    return () => {
      isMounted.current = true;
    };
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(incrementProduct(product));
  };

  return (
    <Show>
      <Show.When isTrue={status === "pending"}>
        <div className="row mt-5 justify-content-center">
          <Loading />
        </div>
      </Show.When>
      <Show.When isTrue={error}>
        <div>{error}</div>
      </Show.When>
      <Show.Else>
        <div className="row mt-4">
          {listProduct?.map((product) => (
            <div
              className="col-md-3 col-sm-6 d-flex justify-content-center mt-4"
              key={`product-${product._id}`}
            >
              <div className="product mb-4 d-flex flex-column">
                <div className="product-cart">
                  <div
                    className="product-image"
                    onClick={() => handleAddToCart(product)}
                  >
                    <img src={product.image} alt="product" />
                  </div>
                  <div className="product-details text-center">
                    <h2>{product.name}</h2>
                    <div className="product-cart d-flex justify-content-around align-items-center">
                      <p>{product.price}$</p>
                      <button
                        className="product-shopping"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="fa-solid fa-cart-shopping "></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Show.Else>
    </Show>
  );
}
