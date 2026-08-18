
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ItemListContainer from "./components/ItemListContainer";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className="app">
      <Navbar />

      <main>
        <h2 className="store-title">
          {t("store.title")}
        </h2>

        <div className="products-container">
          <ItemListContainer />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;