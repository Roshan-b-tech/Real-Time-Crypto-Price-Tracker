import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const dollarRef = useRef<HTMLDivElement>(null);
  const increasingGraphRef = useRef<SVGPathElement>(null);
  const decreasingGraphRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (loaderRef.current && dollarRef.current && increasingGraphRef.current && decreasingGraphRef.current) {
      // Create the animation timeline
      const tl = gsap.timeline();

      // Animate the dollar sign
      tl.to(dollarRef.current, {
        scale: 1.2,
        duration: 0.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Animate the loader background
      tl.to(loaderRef.current, {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        duration: 0.5,
        ease: 'power2.inOut',
      }, '-=0.5');

      // Animate the increasing graph
      tl.to(increasingGraphRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      }, '-=0.5');

      // Animate the decreasing graph
      tl.to(decreasingGraphRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      }, '-=0.5');

      // Cleanup animation on component unmount
      return () => {
        tl.kill();
      };
    }
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      {/* Background Graphs */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Increasing Graph */}
        <path
          ref={increasingGraphRef}
          d="M0,80 L20,60 L40,40 L60,20 L80,10 L100,0"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="200"
          className="opacity-30"
        />
        {/* Decreasing Graph */}
        <path
          ref={decreasingGraphRef}
          d="M0,20 L20,40 L40,60 L60,70 L80,80 L100,90"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset="200"
          className="opacity-30"
        />
      </svg>

      {/* Dollar Sign */}
      <div
        ref={dollarRef}
        className="text-6xl font-bold text-white relative z-10"
      >
        $
      </div>
    </div>
  );
};

export default Loader;