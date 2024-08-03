import { useEffect } from "react";
import ReactDOM from "react-dom";

// Define the portal root element where all portals will be mounted
const portalRoot = document.getElementById("portal-root");

const Portal = ({ children }) => {
  // Create a new div element to serve as the portal container
  const el = document.createElement("div");

  useEffect(() => {
    // Append the created div to the portal root on mount
    portalRoot.appendChild(el);
    // Clean up: remove the div from the portal root on unmount
    return () => {
      portalRoot.removeChild(el);
    };
  }, [el]); // Dependency array with `el` ensures this effect runs only once after initial render

  // Use ReactDOM.createPortal to render the children into the created div
  return ReactDOM.createPortal(children, el);
};

export default Portal;
