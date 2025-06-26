import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';
import rcImage from '../assets/rc.png'; // Adjust path if needed
import SplitText from './SplitText'; // Assuming you have a SplitText component
const Gallery = () => {
  const previewRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const containerRef = useRef(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const eventsRef = useRef(null);

  const items = [
    {
      title: "Installation Ceremony",
      description: "This innovative project combines modern design principles with cutting-edge technology to create a seamless user experience...",
      aim: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
      date: "21 June 2025",
      image: rcImage
    },
    {
      title: "Footslog",
      description: "A revolutionary approach to digital transformation...",
      aim: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      date: "18 June 2025",
      image: rcImage
    },
    {
      title: "Beach Cleanup",
      description: "An ambitious project that reimagines the future of interactive design...",
      aim: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      date: "15 June 2025",
      image: rcImage
    },
    {
      title: "Heart n Sole Run",
      description: "The culmination of months of research and development...",
      aim: "Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
      date: "12 June 2025",
      image: rcImage
    }
  ];

  const handleViewMore = (index) => {
    alert(`View more details for ${items[index].title}`);
  };

  const handlePreviewClick = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const itemsElements = Array.from(container.querySelectorAll('.item'));
    const item = itemsElements[index];
    if (item) {
      window.scrollTo({
        top: item.offsetTop - window.innerHeight * 0.1,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const preview = previewRef.current;
    const imagesContainer = imagesContainerRef.current;
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const container = containerRef.current;

    if (!preview || !imagesContainer || !nav || !indicator || !container) return;

    const previewItems = Array.from(container.querySelectorAll('.item-preview'));
    const itemsElements = Array.from(container.querySelectorAll('.item'));

    let itemPositions = [];
    let targetPreviewPosition = 0;
    let currentPreviewPosition = 0;
    let maxPreviewScroll = 0;
    let animationId;

    const recalculatePositions = () => {
      const containerTop = container.offsetTop + imagesContainer.offsetTop - nav.offsetHeight;
      const viewportHeight = window.innerHeight;

      itemPositions = itemsElements.map(item => ({
        top: item.offsetTop + containerTop - viewportHeight * 0.3,
        bottom: item.offsetTop + item.offsetHeight + containerTop - viewportHeight * 0.7,
        index: parseInt(item.dataset.index)
      }));

      maxPreviewScroll = Math.max(0, preview.offsetHeight - container.querySelector('.minimap').offsetHeight + 200);
    };

    const animate = () => {
      currentPreviewPosition += (targetPreviewPosition - currentPreviewPosition) * 0.1;
      preview.style.transform = `translateX(-50%) translateY(${-currentPreviewPosition}px)`;

      const activePreview = previewItems[activeItemIndex];
      if (activePreview) {
        const targetTop = activePreview.offsetTop + 100;
        const currentTop = parseFloat(indicator.style.top || '100px');
        const newTop = currentTop + (targetTop - currentTop) * 0.2;
        indicator.style.top = `${newTop}px`;
      }

      animationId = requestAnimationFrame(animate);
    };

    const updateScroll = () => {
      const scrollPosition = window.scrollY;
      const containerTop = container.offsetTop + imagesContainer.offsetTop - nav.offsetHeight;
      const containerHeight = imagesContainer.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollProgress = Math.min(1, Math.max(0, (scrollPosition - containerTop) / (containerHeight - viewportHeight)));
      targetPreviewPosition = scrollProgress * maxPreviewScroll;

      const activeItem = itemPositions.find(item =>
        scrollPosition >= item.top && scrollPosition <= item.bottom
      );

      if (activeItem) {
        setActiveItemIndex(Math.max(0, Math.min(3, activeItem.index)));
      }
    };

    previewItems.forEach((previewItem, index) => {
      previewItem.style.cursor = "pointer";
      previewItem.addEventListener('click', () => handlePreviewClick(index));
    });

    animate();
    updateScroll();
    recalculatePositions();

    let isScrolling;
    const handleScroll = () => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(updateScroll, 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      recalculatePositions();
      updateScroll();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => {
        recalculatePositions();
        updateScroll();
      });
    };
  }, [activeItemIndex, items.length, isMobile]);

  return (
    <>
      <section ref={eventsRef} className="events-section">
  <div className="events-container">
    <SplitText 
      text="Our Events"
      className="events-title"
      splitType="chars"
      delay={50}
      from={{ opacity: 0, y: 20 }}
      to={{ opacity: 1, y: 0 }}
        replayOnEnter={false}  
    />
    <p className="events-subtitle">Discover our upcoming and past events</p>
  </div>
</section>
    <div className="container" ref={containerRef}>
      <div className="wrapper" id='gallery'>
        <nav ref={navRef}>
          {/* Navigation links can be added here */}
        </nav>

        <div className="gallery">
          {!isMobile && (
            <div className="minimap">
              <div className="preview" ref={previewRef}>
                {items.map((item, index) => (
                  <div key={index} className="item-preview">
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
              <div className="active-img-indicator" ref={indicatorRef}></div>
            </div>
          )}

          <div className={`images ${isMobile ? 'mobile' : ''}`} ref={imagesContainerRef}>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <div className={`item ${isMobile ? 'mobile' : ''}`} data-index={index}>
                  <div className="item-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <div className="item-description">
                      <div className="item-title">{item.title}</div>
                      <div className="item-desc-text">{item.description}</div>
                    </div>
                    <div className={`item-bottom ${isMobile ? 'mobile' : ''}`}>
                      <div className="item-aim">
                        <div className="aim-label">Aim</div>
                        <div className="aim-text">{item.aim}</div>
                      </div>
                      <div className="item-actions">
                        <div className="item-info">
                          <div className="item-date">{item.date}</div>
                        </div>
                        <button
                          className="view-more-btn"
                          onClick={() => handleViewMore(index)}
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {index < items.length - 1 && (
                  <hr style={{ margin: '2rem 0', borderColor: '#ccc' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Gallery