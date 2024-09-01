import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Atest from "./pages/Atest";
import Ptest from "./pages/Ptest";
import Btest from "./pages/Btest";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/atest" element={<Atest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
