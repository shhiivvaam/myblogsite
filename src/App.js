import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

import BlogslistView from "./Pages/blogslist";
import CreateBlog from "./components/operations/create";
import BlogView from "./Pages/show";
import BlogEdit from "./components/operations/edit";
import Signin from "./auth/signup";
import PrivateRoute from "./auth/validation/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs"
          element={<PrivateRoute>
            <BlogslistView />
          </PrivateRoute>}
        />
        <Route path="/Create" element={<PrivateRoute>
          <CreateBlog />
        </PrivateRoute>} />
        <Route path="/show/:id" element={<BlogView />} />
        <Route path="/EditBlog/:id" element={<BlogEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
