import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './header/navbar/NavBar'; 
import SignIn from './SignIn';
import SignUp from './SignUp';
import Post from './Post/index.js';
import { SnackbarProvider } from './components/snackbar';  // Adjust import path
import { UsernameProvider } from './components/user';  // Adjust import path
import HomePage from './pages/HomePage';
import { SearchProvider } from './components/searchbar';
import Footer from './footer';
import BlogsListing from './pages/BlogsListing';
import RecentPosts from './Post/RecentPosts.js';
import { PostCountProvider } from './components/pagination/index.js';

import UserDashboard from './Dashboard/index.js';
import { ModalProvider } from './components/modal/index.js';
import ResetPassword from './pages/ResetPassword.js';
import { ResetPasswordProvider } from './components/user/passwordResetState.js';


// Separate component to manage location and navbar visibility
function AppContent() {
  const location = useLocation();
  const noNavBarRoutes = ['/post','/dashboard','/reset-password']; 
  const noFooterRoutes=['/blogs','/post'] // Define routes where NavBar shouldn't appear

  return (
    <div className="App">
      {/* Conditionally render NavBar based on the route */}
      {!noNavBarRoutes.includes(location.pathname) && <NavBar />}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsListing />} />
          <Route path="/sign-in" element={<SignIn asPage={true} />} />
          <Route path="/sign-up" element={<SignUp asPage={true} />} />
          <Route path="/post" element={<Post />} />
          <Route path="/dashboard" element={<UserDashboard/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
         

        </Routes>
      </main>

     
     
    </div>
  );
}

function App() {
  return (
    <ResetPasswordProvider>
    <ModalProvider>
    <SnackbarProvider> {/* Wrap the app with SnackbarProvider */}
      <UsernameProvider>
        <SearchProvider>
        <PostCountProvider>{/* Wrap the app with UsernameProvider to provide global username access */}
          <Router>
            <AppContent />
          </Router>
          </PostCountProvider>
        </SearchProvider>
      </UsernameProvider>
    </SnackbarProvider>
    </ModalProvider>
    </ResetPasswordProvider>
  );
}

export default App;
