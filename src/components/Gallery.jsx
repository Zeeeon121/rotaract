import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  // Refs
  const previewRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const containerRef = useRef(null);
  const eventsRef = useRef(null);
  
  // State
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Custom SVG component with better styling and accessibility
  const EventImage = ({ className, title }) => (
    <svg 
      className={className} 
      viewBox="0 0 400 400" 
      role="img"
      aria-label={`${title} illustration`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a90e2" />
          <stop offset="100%" stopColor="#8e44ad" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#f8f9fa" rx="8" ry="8" />
      <circle cx="200" cy="150" r="80" fill="url(#gradient)" />
      <text 
        x="200" 
        y="150" 
        fontFamily="Arial, sans-serif" 
        fontSize="24" 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontWeight="bold"
      >
        {title.split(' ')[0]}
      </text>
    </svg>
  );

  // Gallery items data
  const items = [
    {
      title: "Installation Ceremony",
      description: "Installation marks the ceremonial handover from the outgoing council to the new team. It celebrates past achievements, introduces the vision for the year ahead, and sets the tone with inspiring speeches and heartfelt gratitude.",
      aim: "The event honours continuity and change, reinforcing leadership, responsibility, and alignment with the club’s yearly goals and theme.",
      date: "21 June 2025",
      image: (props) => <EventImage title="Installation" {...props} />
    },
    {
      title: "Footslog",
      description: "Footslog is not just a trek.... It’s an experience of togetherness, self-discovery, and unplugged joy. Away from screens, schedules, and city stress, students venture into nature to reconnect with themselves and one another. Whether it’s scaling rocky paths or pushing through the final stretch together, Footslog brings out a spirit of adventure, spontaneity, and carefree fun.",
      aim: "To spark spontaneous connections, encourage stepping out of comfort zones, and build lasting camaraderie through shared experiences in nature.",
      date: "18 June 2025",
      image: (props) => <EventImage title="Footslog" {...props} />
    },
    {
      title: "Beach Cleanup",
      description: "An ambitious project that reimagines the future of interactive design...",
      aim: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      date: "15 June 2025",
      image: (props) => <EventImage title="Beach" {...props} />
    },
    {
      title: "Heart n Sole Run",
      description: "Heart and Sole is our flagship charity marathon — a vibrant convergence of fitness, philanthropy, and community spirit. It’s a platform where people from all walks of life come together to run for a cause, to contribute to something larger than themselves. With over 1000 participants joining in recent editions, the event blends energy and empathy at scale. Each stride taken fuels not just momentum, but meaningful change.",

      aim: "To inspire social responsibility through movement, uniting participants in a shared mission to uplift the lives of children at Father Agnel Ashram.",
      date: "12 June 2025",
      image: (props) => <EventImage title="Run" {...props} />
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
      const itemTop = item.offsetTop;
      const containerTop = container.offsetTop;
      const navHeight = navRef.current?.offsetHeight || 0;
      
      window.scrollTo({
        top: itemTop + containerTop - navHeight - 20,
        behavior: 'smooth'
      });
    }
  };

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll and animation effects
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
      const containerTop = container.offsetTop;
      const viewportHeight = window.innerHeight;

      itemPositions = itemsElements.map(item => ({
        top: item.offsetTop + containerTop - viewportHeight * 0.3,
        bottom: item.offsetTop + item.offsetHeight + containerTop - viewportHeight * 0.7,
        index: parseInt(item.dataset.index)
      }));

      maxPreviewScroll = Math.max(0, preview.scrollHeight - container.querySelector('.minimap').offsetHeight + 300);
    };

    const animate = () => {
      currentPreviewPosition += (targetPreviewPosition - currentPreviewPosition) * 0.1;
      preview.style.transform = `translateX(-50%) translateY(${-currentPreviewPosition}px)`;

      const activePreview = previewItems[activeItemIndex];
      if (activePreview) {
        const targetTop = activePreview.offsetTop + 200;
        const currentTop = parseFloat(indicator.style.top || '200px');
        const newTop = currentTop + (targetTop - currentTop) * 0.2;
        indicator.style.top = `${newTop}px`;
      }

      animationId = requestAnimationFrame(animate);
    };

    const updateScroll = () => {
      const scrollPosition = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = imagesContainer.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollProgress = Math.min(1, Math.max(0, (scrollPosition - containerTop) / (containerHeight - viewportHeight)));
      targetPreviewPosition = scrollProgress * maxPreviewScroll;

      const activeItem = itemPositions.find(item =>
        scrollPosition >= item.top && scrollPosition <= item.bottom
      );

      if (activeItem) {
        setActiveItemIndex(Math.max(0, Math.min(items.length - 1, activeItem.index)));
      }
    };

    // Add click handlers to preview items
    previewItems.forEach((previewItem, index) => {
      previewItem.style.cursor = "pointer";
      previewItem.onclick = (e) => {
        e.preventDefault();
        handlePreviewClick(index);
      };
    });

    recalculatePositions();
    animate();

    const handleScroll = () => {
      updateScroll();
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
      
      // Clean up click handlers
      previewItems.forEach(previewItem => {
        previewItem.onclick = null;
      });
    };
  }, [activeItemIndex, items.length, isMobile]);

  return (
    <>
      <section ref={eventsRef} className="events-section">
        <div className="events-container">
          <h1 className="events-title">Our Events</h1>
        </div>
      </section>
      
      <div className="container" ref={containerRef}>
        <div className="wrapper" id='gallery'>
          <nav ref={navRef} aria-label="Gallery navigation">
            {/* Navigation links can be added here */}
          </nav>

          <div className="gallery">
            {!isMobile && (
              <div className="minimap">
                <div className="preview" ref={previewRef}>
                  {items.map((item, index) => (
                    <button 
                      key={index} 
                      className={`item-preview ${activeItemIndex === index ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePreviewClick(index);
                      }}
                      aria-label={`View ${item.title}`}
                    >
                      <span>{item.title}</span>
                    </button>
                  ))}
                </div>
                <div className="active-img-indicator" ref={indicatorRef} aria-hidden="true"></div>
              </div>
            )}

            <div className={`images ${isMobile ? 'mobile' : ''}`} ref={imagesContainerRef}>
              {items.map((item, index) => (
                <article 
                  key={index} 
                  className={`item ${isMobile ? 'mobile' : ''}`} 
                  data-index={index}
                  aria-labelledby={`item-title-${index}`}
                >
                  <figure className="item-img">
                    {item.image({ className: 'event-svg-image' })}
                  </figure>
                  <div className="item-details">
                    <div className="item-description">
                      <h2 id={`item-title-${index}`} className="item-title">{item.title}</h2>
                      <p className="item-desc-text">{item.description}</p>
                    </div>
                    <div className={`item-bottom ${isMobile ? 'mobile' : ''}`}>
                      <div className="item-aim">
                        <h3 className="aim-label">Aim</h3>
                        <p className="aim-text">{item.aim}</p>
                      </div>
                      <div className="item-actions">
                        <div className="item-info">
                          <time className="item-date" dateTime="2025-06-21">{item.date}</time>
                        </div>
                        <button
                          className="view-more-btn"
                          onClick={() => handleViewMore(index)}
                          aria-label={`More details about ${item.title}`}
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;