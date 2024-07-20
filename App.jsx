import SomeComponent from "./src/components/SomeComponent";
import ThemeProvider from "./src/utils/ThemeProvider";

function App() {
  return (
    <>
      <h1>TaskPro</h1>
      <ThemeProvider>
        <SomeComponent />
      </ThemeProvider>
    </>
  );
}

export default App;
