import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  categorySelectors,
  getAllCategory,
} from "../features/CategorySlice.js";
import { useEffect, useState } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaUtensils } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";
import { TbBrandCakephp } from "react-icons/tb";
import { getProduct, getProductByCategory } from "../features/ProductSlice.js";

const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector(categorySelectors.selectAll);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategory()).finally(() => setLoading(false));
  }, [dispatch]);

  function setActive(elem) {
    var a = document.getElementsByClassName("active");
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active");
    }
    elem.classList.add("active");
  }

  const setIcon = (categori) => {
    if (categori == 1) {
      return <FaUtensils />;
    } else if (categori == 2) {
      return <CiCoffeeCup />;
    } else {
      return <TbBrandCakephp />;
    }
  };

  const showAll = () => {
    dispatch(getProduct());
  };

  const categoryClicked = (id) => {
    dispatch(getProductByCategory(id));
  };
  return (
    <>
      <Col md={2}>
        <h4>Product Kategori</h4>
        <p>{loading ? "Loading..." : ""}</p>
        <hr />
        <ListGroup key="all001">
          <ListGroup.Item
            id={`all001`}
            className="mb-1 shadow-sm"
            active
            action
            onClick={() => {
              setActive(document.getElementById(`all001`)), showAll();
            }}
          >
            <IoFastFoodSharp /> All Product
          </ListGroup.Item>
        </ListGroup>
        {category &&
          category.map((item) => (
            <ListGroup key={item.id}>
              <ListGroup.Item
                id={`key${item.id}`}
                className="mb-1 shadow-sm"
                action
                onClick={() => {
                  setActive(document.getElementById(`key${item.id}`)),
                    categoryClicked(item.id);
                }}
              >
                {setIcon(item.id)} {item.name}
              </ListGroup.Item>
            </ListGroup>
          ))}
      </Col>
    </>
  );
};

export default Category;
