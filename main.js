import React, { useEffect, useRef } from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";
import { gsap } from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "https://esm.sh/gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

function SplitText({ text }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const splitter = new GSAPSplitText(el, { type: "chars" });
    const targets = splitter.chars;

    gsap.fromTo(
      targets,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(targets);
      splitter.revert();
    };
  }, [text]);

  return (
    <p
      ref={ref}
      style={{ fontSize: "2rem", textAlign: "center", marginTop: "50vh" }}
    >
      {text}
    </p>
  );
}

function App() {
  return (
    <div>
      <SplitText text="GSAP Split Text Animation!" />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
