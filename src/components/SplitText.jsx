import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  replayOnEnter = true,
}) => {
  const ref = useRef(null);
  const splitterRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Clean up previous instances
    if (splitterRef.current) {
      splitterRef.current.revert();
    }
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create new splitter instance
    splitterRef.current = new GSAPSplitText(el, {
      type: splitType,
      linesClass: "split-line",
    });

    let targets;
    switch (splitType) {
      case "lines":
        targets = splitterRef.current.lines;
        break;
      case "words":
        targets = splitterRef.current.words;
        break;
      default:
        targets = splitterRef.current.chars;
    }

    // Set initial state
    gsap.set(targets, { ...from, willChange: "transform, opacity" });

    // Create timeline with ScrollTrigger
    animationRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${(1 - threshold) * 100}%${rootMargin}`,
        end: "bottom top",
        toggleActions: replayOnEnter ? "play none reverse none" : "play none none none",
        onEnter: () => {
          gsap.set(targets, { ...from });
          animationRef.current.play(0);
        },
        onLeaveBack: () => {
          if (replayOnEnter) {
            gsap.set(targets, { ...from });
          }
        },
      },
    });

    animationRef.current.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }
      if (splitterRef.current) {
        splitterRef.current.revert();
      }
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, textAlign, replayOnEnter]);

  return (
    <div
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        width: "100%",
      }}
    >
      {text}
    </div>
  );
};

export default SplitText;