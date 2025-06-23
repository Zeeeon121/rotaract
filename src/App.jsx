import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Loader from './components/Loader'; // ✅ Import loader
import Contact from './components/Contact';
import About from './components/About';
import MarqueeComponent from './components/Marquee';
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
        <MarqueeComponent/>
          <Contact/>
        </>
      )}
    </>
  );
}

export default App;