import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Blogslist from "./blogslist";
import BlogslistView from "./blogslist";
import CreateBlog from "./create";
import BlogView from "./show";
import BlogEdit from "./edit";

// firebase imports -> Pages
import Signin from "./signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BlogslistView />} />
        <Route path="/signin/" element={<Signin />} />
        <Route path="/Create" element={<CreateBlog />} />
        <Route path="/show/:id" element={<BlogView />} />
        <Route path="/EditBlog/:id" element={<BlogEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
