import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import necessary MUI components
import Home from './Component/Home';
import Userlisting from './Component/Userlisting';
import AddUser from './Component/AddUser';
import Updateuser from './Component/Updateuser';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Header from './Component/Header';
import BookDetails from './Component/BookDetails';
import Footer from './Component/Footer';
import LoginForm from './Component/LoginForm';
import Logout from './Component/Logout';
import ProfilePage from './Component/ProfilePage';
import BookList from './Component/BookList';
import OrderDetails from './Component/OrderDetails';
import OrdersList from './Component/OrdersList';
import KidsBookList from './Component/KidsBookList';
import AboutUs from './Component/AboutUs';
import Wishlist from './Component/Wishlist';
// Create a custom theme with monospace font
const theme = createTheme({
  typography: {
    fontFamily: '"Courier New", monospace',
    h5: {
      fontSize: 16,
      fontWeight: 600,
    }, 
    h4: {
      fontSize: 23,
      fontWeight: 600,
    }
  },
});

function App() {
  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}> {/* Wrap the app with ThemeProvider */}
        <BrowserRouter>
          <Header />
          <div className="App">
            <Routes>
              {/* Define Routes here */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/book-details/:id" element={<BookDetails />} />
              <Route path="/trending" element={<BookList />} />
              <Route path="/kids" element={<KidsBookList />} />
              <Route path="/user" element={<Userlisting />} />
              <Route path="/user/add" element={<AddUser />} />
              <Route path="/user/edit/:code" element={<Updateuser />} />
              <Route path="/order-details" element={<OrderDetails />} />
              <Route path="/all-order-list" element={<OrdersList />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
            <ToastContainer
              className="toast-position"
              position="bottom-right"
            />
          </div>
          <Footer />
        </BrowserRouter>
      </ThemeProvider> {/* End ThemeProvider */}
    </Provider>
  );
}

export default App;
