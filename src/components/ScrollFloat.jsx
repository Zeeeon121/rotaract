import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'center bottom+=30%',
  scrollEnd = 'bottom bottom-=30%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split("").map((char, index) => (
      <span className="char" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;
    const charElements = el.querySelectorAll('.char');

    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === el) trigger.kill();
    });

    gsap.fromTo(
      charElements,
      {
        opacity: 0,
        yPercent: 30,
        scale: 0.95,
        transformOrigin: '50% 50%'
      },
      {
        opacity: 1,
        yPercent: 0,
        scale: 1,
        duration: animationDuration,
        ease: ease,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: 0.5,
          markers: false,
          anticipatePin: 1
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
        <span className={`scroll-float-text ${textClassName}`}>
          {splitText}
        </span>
      </h2>
    </div>
  );
};

export default ScrollFloat;