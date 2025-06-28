import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';
import theme from '../assets/theme.png';
import rc from '../assets/rc.png';

const About = () => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const storyTitleRef = useRef(null);
  const facultyRef = useRef(null);
  const floatTextRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // New float animation for the title
    if (floatTextRef.current) {
      gsap.to(floatTextRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    gsap.set(
      [heroRef.current, storyTitleRef.current, contentRef.current, imageRef.current, statsRef.current, facultyRef.current],
      { opacity: 1 }
    );

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      );
    }

    if (storyTitleRef.current) {
      gsap.fromTo(
        storyTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: storyTitleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    const paragraphs = contentRef.current?.querySelectorAll('p');
    if (paragraphs?.length > 0) {
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    const statsCards = statsRef.current?.querySelectorAll('.stat-card');
    if (statsCards?.length > 0) {
      gsap.fromTo(
        statsCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    if (facultyRef.current) {
      const cards = facultyRef.current.querySelectorAll('.faculty-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: facultyRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <>
      <div className="about-container">
        <section ref={heroRef} className="about-hero" id="about-hero">
          <div className="background-pattern" />
          <div className="hero-content">
            <h1 ref={floatTextRef} className="float-title">
              About Us
            </h1>
            <div className="hero-description">
              Rotaract CRCE is a youth-driven club under Rotary International, focused on leadership and service.
            </div>
          </div>
        </section>
      <section className="main-content">
        <div className="content-grid">
          <div ref={contentRef} className="content-text">
            <h2 ref={storyTitleRef} className="content-title">Our Theme: Esencia</h2>
            <p>Esencia refers to the core spirit or identity that defines us. It’s the soul of our work and mission.</p>
          </div>
          <div ref={imageRef} className="image-wrapper">
            <div className="image-box">
              <img src={theme} alt="Theme" className="about-image" />
              <div className="image-decor" />
            </div>
          </div>
        </div>
      </section>

     
      <section ref={facultyRef} className="faculty-section">
  <div className="faculty-container">
    <div className="faculty-split">
      {/* Faculty In Charge */}
      <div className="faculty-column">
        <h2 className="faculty-title">Faculty In Charge</h2>
        <div className="faculty-grid">
          <div className="faculty-card">
            <div className="faculty-avatar">
              <img 
                src={rc} 
                alt="Faculty In Charge" 
                className="faculty-avatar-img"
              />
            </div>
            <div className="faculty-info">
              <h3 className="faculty-name">Sangeeta Parshionikar</h3>
              <p className="faculty-position">Faculty in charge</p>
             <p className="faculty-description">
  Dr. Sangeeta Parshionikar mentors the club with dedication, encouraging academic growth and meaningful community involvement.
</p>

              
            </div>
          </div>
        </div>
      </div>

      {/* Past President */}
      <div className="faculty-column">
        <h2 className="faculty-title">Immediate Past President</h2>
        <div className="faculty-grid">
          <div className="faculty-card">
            <div className="faculty-avatar">
              <img 
                src={rc} 
                alt="Past President" 
                className="faculty-avatar-img"
              />
            </div>
            <div className="faculty-info">
              <h3 className="faculty-name">Steve Antony</h3>
              <p className="faculty-position">President 2024–25</p>
              <p className="faculty-description">
  Steve led the club in 2024–25 with vision, launching key service projects and promoting an inclusive, active culture.
</p>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>




    </>
  );
};

export default About;
