import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Loader from './components/Loader'; // ✅ Import loader

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
          {/* Add more sections here like <Footer />, etc. */}
        </>
      )}
    </>
  );
}

export default App;
