
import "./Navbar.css";
import CartWidget from "./CartWidget";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>NEOTECH</h1>

      <div className="categories">
        <a href="#">Notebooks</a>
        <a href="#">Periféricos</a>
        <a href="#">Monitores</a>
        <a href="#">Componentes</a>
      </div>

      <CartWidget />
    </nav>
  );
}

export default Navbar;