
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
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