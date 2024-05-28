import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./utils/navbar/Navbar";
import { Toaster } from "react-hot-toast";

import BlogslistView from "./Pages/blogslist";
import CreateBlog from "./utils/operations/create";
import BlogView from "./Pages/show";
import BlogEdit from "./utils/operations/edit";
import Signin from "./auth/signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route path="/signin/" element={<Signin />} />
        <Route path="/blogs" element={<BlogslistView />} />
        <Route path="/Create" element={<CreateBlog />} />
        <Route path="/show/:id" element={<BlogView />} />
        <Route path="/EditBlog/:id" element={<BlogEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
