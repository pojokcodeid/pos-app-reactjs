import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/ProductSlice.js";
import CardComponent from "./CardComponent.jsx";
import axios from "axios";
import { inputCart, updateCart } from "../features/CartSlice.js";

const ProductDetail = () => {
  const products = useSelector((state) => state.product.data);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const setCart = async (product) => {
    const response = await axios.get(`/carts?productId=${product.id}`);
    if (response.data && response.data.length > 0) {
      // update cart
      const orderItem = response.data[0];
      orderItem.qty = parseInt(orderItem.qty) + 1;
      orderItem.totalPrice =
        parseInt(orderItem.price) * parseInt(orderItem.qty);
      dispatch(updateCart(orderItem));
    } else {
      // insert cart
      const orderItem = {
        qty: 1,
        price: product.price,
        name: product.name,
        totalPrice: product.price,
        note: "",
        productId: product.id,
      };
      dispatch(inputCart(orderItem));
    }
  };
  return (
    <>
      <Col md={7}>
        <h4>Product Detail</h4>
        {error ? error : ""}
        <hr />
        <Row>
          {products ? (
            products.map((item) => (
              <CardComponent key={item.id} product={item} setCart={setCart} />
            ))
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <p>No data</p>
          )}
        </Row>
      </Col>
    </>
  );
};

export default ProductDetail;
