import { useContext } from "react";
import { LoaderContext } from "../contexts/LoaderContext";

export const useLoader = () => useContext(LoaderContext);
