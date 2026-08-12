
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ItemListContainer from "./components/ItemListContainer";
import Item from "./components/Item";
import products from "./data/products";

function App() {
  console.log(products);
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="¡Bienvenido a NEOTECH!"/>
      <main>
        {products.map((product) => (
          <Item
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </main>
      <Footer />
    </>  
  );
}

export default App; 