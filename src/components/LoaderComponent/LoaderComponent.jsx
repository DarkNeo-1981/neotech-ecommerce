
import "./LoaderComponent.css";

function LoaderComponent({ text }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}

export default LoaderComponent;