import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Create } from "./components/Pages/Create";
import { Details } from "./components/Pages/Details";
import { Edit } from "./components/Pages/Edit";
import CustomizedTables from "./components/Table";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/teste" element={<CustomizedTables />}></Route>
      </Routes>
    </div>
  );
}

export default App;
