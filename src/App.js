import logo from "./logo.svg";
import "./App.css";
import MyBioScreen from "./Bio";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditBio from "./EditBio";

function App() {
  return (
    <div className="App-container">
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MyBioScreen />}>
            <Route exact path="/edit" element={<EditBio />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      <div className="App">
        <MyBioScreen />
      </div>
    </div>
  );
}

export default App;
