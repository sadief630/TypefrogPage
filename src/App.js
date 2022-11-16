import { React } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Home from './pages';
import About from './pages/About/about';
import BugReport from './pages/BugReport/bugReport';
import Contact from './pages/Contact/contact';
import FAQ from './pages/FAQ/faq';
import Merch from './pages/Merch/merch';
import Profile from './pages/Profile/profile';
import Prompts from './pages/Prompts/prompts';
import Settings from './pages/Settings/settings';
import Shop from './pages/Shop/shop';
import HeaderLogin from './components/UserComponents/HeaderLogin/HeaderLogin';

import Footer from './components/Footer/Footer.js';
import './components/Footer/Footer.css';

document.body.style.background = '#16161b';


function App() {
  return (
    <>
      <div className='header'>
        <a href="/TypefrogPage" type='image/svg+xml' data='./frogTypeLOGO_brightverde.svg' className="logo"> </a>
        <HeaderLogin />
      </div>

      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/TypefrogPage' element={<Home />} />
          <Route path='/TypefrogPage/about' element={<About />} />
          <Route path='/TypefrogPage/bugreport' element={<BugReport />} />
          <Route path='/TypefrogPage/contact' element={<Contact />} />
          <Route path='/TypefrogPage/faq' element={<FAQ />} />
          <Route path='/TypefrogPage/merch' element={<Merch />} />
          <Route path='/TypefrogPage/profile' element={<Profile />} />
          <Route path='/TypefrogPage/prompts' element={<Prompts />} />
          <Route path='/TypefrogPage/shop' element={<Shop />} />
          <Route path='/TypefrogPage/settings' element={<Settings />} />
          
        </Routes>
      </Router>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
