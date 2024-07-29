import { useContext } from "react";
import { ThemeContext } from "../../utils/ThemeProvider";
import { LoaderWrapper, Spinner } from "./Loader.styles";

const Loader = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <LoaderWrapper theme={theme}>
      <Spinner theme={theme} />
    </LoaderWrapper>
  );
};

export default Loader;
