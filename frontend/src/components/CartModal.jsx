import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { delCart, updCart } from "../features/CartSlice.js";
import Swal from "sweetalert2";
const CartModal = (props) => {
  const dispatch = useDispatch();
  const dataEdit = useSelector((state) => state.cart.dataEdit);
  const [data, setData] = useState({});

  const updateData = () => {
    dispatch(updCart(data));
    props.onHide();
    Swal.fire("Update Success!", "", "success");
  };

  const deleteData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delCart(id));
        props.onHide();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    setData(dataEdit);
  }, [dataEdit]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {data ? data.name : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Jumlah</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={data ? data.qty : 0}
              onChange={(e) => setData({ ...data, qty: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data ? data.note : ""}
              onChange={(e) => setData({ ...data, note: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide(), updateData();
          }}
          variant="success"
        >
          Update
        </Button>
        <Button
          onClick={() => {
            props.onHide(), deleteData(data.id);
          }}
          variant="danger"
        >
          Delete
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

CartModal.propTypes = {
  onHide: PropTypes.func,
};

export default CartModal;
