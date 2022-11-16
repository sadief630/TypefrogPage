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
        <a href="/" type='image/svg+xml' data='./frogTypeLOGO_brightverde.svg' className="logo"> </a>
        <HeaderLogin />
      </div>

      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/bugreport' element={<BugReport />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/merch' element={<Merch />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/prompts' element={<Prompts />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/settings' element={<Settings />} />
          
        </Routes>
      </Router>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
