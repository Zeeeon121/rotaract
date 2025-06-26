import React, { useEffect, useRef } from 'react';
import './Hero.css';
import photo from '../assets/bg.jpg';

const Hero = () => {
  const captureRef = useRef(null);
  const textRef = useRef(null);
  const animatedElements = useRef([]);

  // Text animation effect
  useEffect(() => {
    const splitText = (element, type) => {
      const text = element.textContent.trim();
      element.textContent = '';
      
      if (type === 'words') {
        const words = text.split(/\s+/);
        words.forEach(word => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word';
          wordSpan.textContent = word;
          element.appendChild(wordSpan);
          element.appendChild(document.createTextNode(' '));
        });
      } else if (type === 'letters') {
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const charSpan = document.createElement('span');
          charSpan.className = 'letter';
          charSpan.textContent = char;
          element.appendChild(charSpan);
        }
      }
    };

    const applyMouseEffect = () => {
      const elems = animatedElements.current;
      const radius = 150;
      
      const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        elems.forEach(elem => {
          const rect = elem.getBoundingClientRect();
          const elemX = rect.left + rect.width / 2;
          const elemY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(mouseX - elemX, 2) + 
            Math.pow(mouseY - elemY, 2)
          );
          
          if (distance < radius) {
            const force = (radius - distance) / radius;
            const angle = Math.atan2(elemY - mouseY, elemX - mouseX);
            const moveX = Math.cos(angle) * force * 20;
            const moveY = Math.sin(angle) * force * 20;
            
            elem.style.transform = `translate(${moveX}px, ${moveY}px)`;
          } else {
            elem.style.transform = 'translate(0, 0)';
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    };

    // Initialize text animation
    if (textRef.current) {
      const h2 = textRef.current.querySelector('h2');
      const h1 = textRef.current.querySelector('h1');
      const p = textRef.current.querySelector('p');
      
      if (h2) splitText(h2, 'letters');
      if (h1) splitText(h1.querySelector('span'), 'words');
      if (p) splitText(p, 'letters');
      
      animatedElements.current = [
        ...Array.from(textRef.current.querySelectorAll('.word')),
        ...Array.from(textRef.current.querySelectorAll('.letter'))
      ];
      
      return applyMouseEffect();
    }
  }, []);

  // Original GSAP effect
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeEffect = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');

        const checkGSAP = () => {
          return new Promise((resolve) => {
            const check = () => {
              if (window.gsap && window.ScrollTrigger && window.html2canvas) {
                resolve();
              } else {
                setTimeout(check, 100);
              }
            };
            check();
          });
        };

        await checkGSAP();

        window.gsap.registerPlugin(window.ScrollTrigger);
        
        const COUNT = 75;
        const REPEAT_COUNT = 3;
        
        const createCanvases = (captureEl) => {
          window.html2canvas(captureEl).then((canvas) => {
            const width = canvas.width;
            const height = canvas.height;
            const ctx = canvas.getContext("2d");
            const imageData = ctx.getImageData(0, 0, width, height);
            let dataList = [];
            
            captureEl.style.display = "none";
            
            for (let i = 0; i < COUNT; i++) {
              dataList.push(ctx.createImageData(width, height));
            }
            
            for (let x = 0; x < width; x++) {
              for (let y = 0; y < height; y++) {
                for (let l = 0; l < REPEAT_COUNT; l++) {
                  const index = (x + y * width) * 4;
                  const dataIndex = Math.floor(
                    (COUNT * (Math.random() + (2 * x) / width)) / 3
                  );
                  for (let p = 0; p < 4; p++) {
                    dataList[dataIndex].data[index + p] = imageData.data[index + p];
                  }
                }
              }
            }
            
            dataList.forEach((data, i) => {
              let clonedCanvas = canvas.cloneNode();
              clonedCanvas.getContext("2d").putImageData(data, 0, 0);
              clonedCanvas.className = "capture-canvas";
              captureEl.parentElement.appendChild(clonedCanvas);
              
              const randomAngle = (Math.random() - 0.5) * 2 * Math.PI;
              const randomRotationAngle = 30 * (Math.random() - 0.5);
              
              let tl = window.gsap.timeline({
                scrollTrigger: {
                  scrub: 0.5,
                  start: () => 0,
                  end: () => window.innerHeight * 0.5
                }
              });
              
              tl.to(clonedCanvas, {
                duration: 0.5,
                rotate: randomRotationAngle,
                translateX: 20 * Math.sin(randomAngle),
                translateY: 20 * Math.cos(randomAngle),
                opacity: 0,
                delay: (i / dataList.length) * 0.5
              });
            });
          });
        };

        if (captureRef.current) {
          const img = captureRef.current.querySelector('img');
          if (img.complete) {
            createCanvases(captureRef.current);
          } else {
            img.addEventListener('load', () => {
              createCanvases(captureRef.current);
            });
          }
        }

      } catch (error) {
        console.error('Failed to load libraries:', error);
      }
    };

    initializeEffect();

    return () => {
      const canvases = document.querySelectorAll('.capture-canvas');
      canvases.forEach(canvas => canvas.remove());
    };
  }, []);

  return (
    <>
      <section className="hero" id='hero'>
        <div ref={captureRef} id="capture">
          <img src={photo} alt="Background" />
        </div>

        <div className="hero-content" ref={textRef}>
          <h2 className="anime-header">Welcome to</h2>
          <h1 className="anime-title">
            <span className="anime-text highlight">CRCE ROTARACT</span>
            <br />CLUB
          </h1>
          <p className="anime-footer">Rotary club of Bombay 3141 zone 1A</p>
        </div>
      </section>
      
      <div className="scroll-area"></div>
    </>
  );
};

export default Hero;