import React, { useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCart, setDetail } from "../features/CartSlice.js";
import TotalCart from "./TotalCart.jsx";
import CartModal from "./CartModal.jsx";

const Order = () => {
  const carts = useSelector((state) => state.cart.data);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  return (
    <>
      <Col md={3} className="mb-5 pb-5">
        <h4>Order List</h4>
        {error ? error : ""}
        <hr />
        <ListGroup variant="flush">
          {carts ? (
            carts.map((item) => (
              <ListGroup.Item
                key={item.id}
                variant="flush"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setDetail(item)), setModalShow(true);
                }}
              >
                <div className="fw-bold">{item.name}</div>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="me-auto">
                    <small>
                      Rp {parseInt(item.price).toLocaleString("id-ID")} x{" "}
                      {item.qty}
                    </small>
                    <p>
                      <small>{item.note}</small>
                    </p>
                  </div>
                  <div>
                    <strong>
                      <small>
                        Rp{" "}
                        {parseInt(item.price * item.qty).toLocaleString(
                          "id-ID"
                        )}
                      </small>
                    </strong>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <p>No data</p>
          )}
        </ListGroup>
        <TotalCart carts={carts} />
      </Col>
      <CartModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Order;
