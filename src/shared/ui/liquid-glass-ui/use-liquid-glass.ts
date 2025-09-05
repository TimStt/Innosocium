"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

export const useLiquidGlass = () => {
  const svgEl = useRef<SVGSVGElement>(null);
  const debugPen = useRef<HTMLDivElement>(null);

  const refContainer = useRef<HTMLDivElement>(null);

  const config = useRef({
    width: 0,
    height: 0,
    radius: 16,
    border: 0.07,
    lightness: 50,
    alpha: 0.93,
    blur: 11,
    scale: -180,
    x: "R",
    y: "B",
  });

  // создаём SVG для displacement map
  const buildDisplacementImage = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      if (!refContainer.current) return;

      console.log(config.current.width, config.current.height);
      const border =
        Math.min(config.current.width, config.current.height) *
        (config.current.border * 0.5);
      const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
          <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#000"/>
              <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#000"/>
              <stop offset="100%" stop-color="blue"/>
          </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${config.current.radius}" fill="url(#red)" />
      <rect x="0" y="0" width="${width}" height="${height}" rx="${config.current.radius}" fill="url(#blue)" style="mix-blend-mode: difference" />
      <rect x="${border}" y="${border}" width="${width - border * 2}" height="${height - border * 2}" rx="${config.current.radius}" fill="hsl(0 0% ${config.current.lightness}% / ${config.current.alpha})" style="filter:blur(${config.current.blur}px)" />
  </svg> `;

      const encoded = encodeURIComponent(svg);
      const dataUri = `data:image/svg+xml,${encoded}`;

      gsap.set("feImage", {
        attr: {
          href: dataUri,
        },
      });
      gsap.set("feDisplacementMap", {
        attr: {
          xChannelSelector: config.current.x,
          yChannelSelector: config.current.y,
          scale: config.current.scale,
        },
      });
    },
    []
  );

  const resizeContainer = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!refContainer.current) return;

      if (
        config.current.width === entries[0].contentRect.width ||
        config.current.height === entries[0].contentRect.height
      )
        return;
      buildDisplacementImage({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height,
      });
    },
    [buildDisplacementImage]
  );

  useEffect(() => {
    if (!refContainer.current) return;
    buildDisplacementImage({
      width: refContainer.current.offsetWidth,
      height: refContainer.current.offsetHeight,
    });
  }, []);

  // запускаем эффект только один раз
  useEffect(() => {
    if (!refContainer.current) return;
    const observer = new ResizeObserver(resizeContainer);
    observer.observe(refContainer.current);

    return () => {
      observer.disconnect();
    };
  }, [buildDisplacementImage]);

  return {
    svgEl,
    debugPen,
    refContainer,
  };
};
