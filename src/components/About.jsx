import React from 'react';
import ScrollFloat from './ScrollFloat';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const About = () => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const storyTitleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Ensure all elements are visible first
    gsap.set([heroRef.current, storyTitleRef.current, contentRef.current, imageRef.current, statsRef.current], {
      opacity: 1
    });
    
    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }

    // Story title animation
    if (storyTitleRef.current) {
      gsap.fromTo(storyTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: storyTitleRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            onComplete: () => gsap.set(storyTitleRef.current, { opacity: 1 })
          }
        }
      );
    }

    // Animate text content
    const paragraphs = contentRef.current?.querySelectorAll('p');
    if (paragraphs && paragraphs.length > 0) {
      gsap.set(paragraphs, { opacity: 1 }); // Fallback visibility
      gsap.fromTo(paragraphs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            onComplete: () => gsap.set(paragraphs, { opacity: 1 })
          }
        }
      );
    }

    // Animate image
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 1 }); // Fallback visibility
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            onComplete: () => gsap.set(imageRef.current, { opacity: 1 })
          }
        }
      );
    }

    // Animate stats cards
    const statsCards = statsRef.current?.querySelectorAll('.stat-card');
    if (statsCards && statsCards.length > 0) {
      gsap.set(statsCards, { opacity: 1 }); // Fallback visibility
      gsap.fromTo(statsCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            onComplete: () => gsap.set(statsCards, { opacity: 1 })
          }
        }
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#011526', 
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        style={{ 
          padding: 'clamp(80px, 8vw, 120px) 20px clamp(60px, 6vw, 80px)', 
          textAlign: 'center',
          background: '#011526',
          position: 'relative'
        }}
      >
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 200, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 120, 200, 0.3) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <ScrollFloat
            animationDuration={1.5}
            ease="power3.out"
            scrollStart="top bottom-=100"
            scrollEnd="bottom top+=100"
            stagger={0.05}
          >
            About Us
          </ScrollFloat>
          
          <div style={{
            marginTop: 'clamp(20px, 3vw, 30px)',
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 300,
            letterSpacing: 'clamp(1px, 0.2vw, 2px)',
            maxWidth: 'min(90%, 600px)',
            margin: 'clamp(20px, 3vw, 30px) auto 0'
          }}>
           Rotaract CRCE is a youth-driven club under the umbrella of Rotary International, focused on personal development, leadership, and service to society through impactful projects and vibrant community engagement.
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ 
        padding: 'clamp(60px, 8vw, 100px) 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center'
        }}>
          {/* Content */}
          <div ref={contentRef} style={{ 
            paddingRight: 'clamp(0px, 2vw, 20px)'
          }}>
            <h2 
              ref={storyTitleRef}
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                marginBottom: 'clamp(30px, 4vw, 40px)',
                background: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
                textAlign: 'clamp(center, -webkit-left, left)'
              }}
            >
              Our Theme
            </h2>
            
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 'clamp(1.6, 0.2vw, 1.8)',
              marginBottom: 'clamp(20px, 3vw, 30px)',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 'clamp(1.6, 0.2vw, 1.8)',
              marginBottom: 'clamp(20px, 3vw, 30px)',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 'clamp(1.6, 0.2vw, 1.8)',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.
            </p>
          </div>

          {/* Image */}
          <div 
            ref={imageRef}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div style={{
              width: '100%',
              maxWidth: '500px',
              height: 'clamp(300px, 40vw, 400px)',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)',
              borderRadius: 'clamp(15px, 2vw, 20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 clamp(15px, 2.5vw, 25px) clamp(30px, 5vw, 50px) rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              margin: '0 auto'
            }}>
              {/* Placeholder content */}
              <div style={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                <div style={{
                  width: 'clamp(60px, 8vw, 80px)',
                  height: 'clamp(60px, 8vw, 80px)',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  margin: '0 auto clamp(15px, 2vw, 20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)'
                }}>
                  📸
                </div>
                <div style={{ 
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
                  fontWeight: 300 
                }}>
                  Image Placeholder
                </div>
              </div>
              
              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                animation: 'float 6s ease-in-out infinite'
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        style={{
          padding: 'clamp(60px, 8vw, 80px) 20px',
          background: '#011526',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 20vw, 250px), 1fr))',
          gap: 'clamp(20px, 4vw, 40px)',
          textAlign: 'center'
        }}>
          {[
            { number: '500+', label: 'Lorem Members' },
            { number: '50+', label: 'Ipsum Projects' },
            { number: '10+', label: 'Dolor Years' },
            { number: '25+', label: 'Amet Awards' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="stat-card"
              style={{
                padding: 'clamp(25px, 4vw, 40px) clamp(15px, 2vw, 20px)',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 'clamp(12px, 1.5vw, 15px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: 700,
                color: '#64b5f6',
                marginBottom: 'clamp(8px, 1vw, 10px)'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 300
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @media (min-width: 768px) {
          .content-grid {
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)) !important;
          }
          .content-text {
            padding-right: 20px !important;
          }
          h2 {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;