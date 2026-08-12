
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ItemListContainer from "./components/ItemListContainer";
import Item from "./components/Item";


function App() {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="¡Bienvenido a NEOTECH!"/>
      <main>
        <Item /><Item /><Item /><Item />
      </main>
      <Footer />
    </>  
  );
}

export default App; 