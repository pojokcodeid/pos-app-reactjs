import { Row } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent.jsx";
import Category from "./components/Category.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Order from "./components/Order.jsx";

function App() {
  return (
    <>
      <NavbarComponent />
      <div className="container-fluid mt-3">
        <Row>
          <Category />
          <ProductDetail />
          <Order />
        </Row>
      </div>
    </>
  );
}

export default App;
