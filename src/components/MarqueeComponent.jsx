
import React from 'react';
import Marquee from 'react-fast-marquee';

const MarqueeComponent = () => {
  return (
    <div className="marquee-container">
      <Marquee speed={50} gradient={false} loop={0}>
        {[...Array(12)].map((_, index) => (
          <img
            key={`row1-${index}`}
            src={`https://placehold.co/400x300?text=Image${index + 1}`}
            alt={`Image ${index + 1}`}
            style={{ margin: '0 20px', height: '150px' }}
          />
        ))}
      </Marquee>
<br></br>
      <Marquee speed={40} gradient={false} direction="right" loop={0}>
        {[...Array(12)].map((_, index) => (
          <img
            key={`row2-${index}`}
            src={`https://placehold.co/400x300?text=Image${index + 1}.jpg`}
            alt={`Image ${index + 1}`}
            style={{ margin: '0 20px', height: '120px' }}
          />
        ))}
      </Marquee>

      {/* <Marquee speed={45} gradient={false}>
        {[...Array(12)].map((_, index) => (
          <img
            key={`row3-${index}`}
            src={`/path/to/image${index + 1}.jpg`}
            alt={`Image ${index + 1}`}
            style={{ margin: '0 20px', height: '100px' }}
          />
        ))}
      </Marquee> */}
    </div>
  );
};
export default MarqueeComponent;
