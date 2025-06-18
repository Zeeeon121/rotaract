import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Loader from './components/Loader'; // ✅ Import loader
import Contact from './components/Contact';
import About from './components/About';
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
          <Contact/>
        </>
      )}
    </>
  );
}

export default App;
