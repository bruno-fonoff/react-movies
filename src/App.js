import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Create } from "./components/Pages/Create";
import { Details } from "./components/Pages/Details";
import { Edit } from "./components/Edit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
