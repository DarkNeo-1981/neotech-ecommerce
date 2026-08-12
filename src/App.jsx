
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ItemListContainer from "./components/ItemListContainer";
import products from "./data/products";

function App() {
  return (
    <>
      <Navbar />

      <ItemListContainer
        greeting="¡Bienvenido a NEOTECH!"
        products={products}
      />

      <Footer />
    </>
  );
}

export default App;