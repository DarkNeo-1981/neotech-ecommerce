
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <ItemListContainer />
      </main>

      <Footer />
    </div>
  );
}

export default App;