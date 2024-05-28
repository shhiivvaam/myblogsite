import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Blogslist from "./blogslist";
import BlogslistView from "./blogslist";
import CreateBlog from "./create";
import BlogView from "./show";
import BlogEdit from "./edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BlogslistView />} />
        <Route exact path="/Create" element={<CreateBlog />} />
        <Route exact path="/show/:id" element={<BlogView />} />
        <Route exact path="/EditBlog/:id" element={<BlogEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
