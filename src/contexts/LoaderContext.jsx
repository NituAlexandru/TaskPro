import PropTypes from "prop-types";
import { createContext, useState } from "react";
import Loader from "../utils/Loader/Loader";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = (timeout = 1000) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, timeout);
  };

  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};

LoaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LoaderContext };
