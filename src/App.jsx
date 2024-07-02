// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import CreateBook from './pages/CreateBooks'
// import EditBook from './pages/EditBook'
// import DeleteBook from './pages/DeleteBook'
// import Post from './pages/Post'

// const App = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/books/create' element={<CreateBook />} />
//       <Route path='/books/details/:id' element={<Post />} />
//       <Route path='/books/edit/:id' element={<EditBook />} />
//       <Route path='/books/delete/:id' element={<DeleteBook />} />
//     </Routes>
//   );
// };

// export default App

import AuthProvider from "./provider/authProvider";
import PostProvider from "./provider/postProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Routes />
      </PostProvider>
    </AuthProvider>
  );
}

export default App;