
import "./Navbar.css";
import CartWidget from "./CartWidget";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>NEOTECH</h1>  
      <CartWidget />      
    </nav>
  );
}

export default Navbar;