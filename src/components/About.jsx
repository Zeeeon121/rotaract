// About.jsx
import React, { useEffect, useRef } from 'react';
import ScrollFloat from './ScrollFloat';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';
import theme from '../assets/theme.png'; // Adjust the path as necessary
const About = () => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const storyTitleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set([heroRef.current, storyTitleRef.current, contentRef.current, imageRef.current, statsRef.current], {
      opacity: 1
    });

    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }

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

    const paragraphs = contentRef.current?.querySelectorAll('p');
    if (paragraphs && paragraphs.length > 0) {
      gsap.set(paragraphs, { opacity: 1 });
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

    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 1 });
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

    const statsCards = statsRef.current?.querySelectorAll('.stat-card');
    if (statsCards && statsCards.length > 0) {
      gsap.set(statsCards, { opacity: 1 });
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="about-container">
      <section ref={heroRef} className="about-hero" id="about-hero">
        <div className="background-pattern" />
        <div className="hero-content">
          <ScrollFloat
            animationDuration={1.5}
            ease="power3.out"
            scrollStart="top bottom-=100"
            scrollEnd="bottom top+=100"
            stagger={0.05}
          >
            About Us
          </ScrollFloat>
          <div className="hero-description">
            Rotaract CRCE is a youth-driven club under the umbrella of Rotary International, focused on personal development, leadership, and service to society through impactful projects and vibrant community engagement.
          </div>
        </div>
      </section>

      <section className="main-content">
        <div className="content-grid">
          <div ref={contentRef} className="content-text">
            <h2 ref={storyTitleRef} className="content-title">Our Theme : Ecensia</h2>
            <p>Esencia refers to the core, soul, or essential nature of something. It's about what makes something truly what it is — its spirit, values, and identity.

</p>
          </div>

          <div ref={imageRef} className="image-wrapper">
            <div className="image-box">
              <img src={theme} alt="About Us" className="about-image" />
              <div className="image-decor" />
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="stats-section">
        <div className="stats-grid">
          {[{ number: '500+', label: 'Lorem Members' }, { number: '50+', label: 'Ipsum Projects' }, { number: '10+', label: 'Dolor Years' }, { number: '25+', label: 'Amet Awards' }].map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
