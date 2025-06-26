import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Loader from './components/Loader'; // ✅ Import loader
import Contact from './components/Contact';
import About from './components/About';
import Gallery from './components/Gallery';
import MarqueeComponent from './components/MarqueeComponent';
import Team from './components/Team';
// import MinimapGallery from './components/MinimapGallery';
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
        <About/>
        <Gallery/>
        <Team/>
      {/* <MinimapGallery/> */}
        <MarqueeComponent/>
          <Contact/>
     
        </>
      )}
    </>
  );
}

export default App;