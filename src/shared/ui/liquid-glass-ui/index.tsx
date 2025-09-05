import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useId,
} from "react";
import gsap from "gsap";
import { cls } from "@/shared/libs/cls";

/**
 * Adaptive Glass Effect Component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display inside the glass effect
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {number} props.radius - Border radius in pixels (default: 16)
 * @param {number} props.scale - Displacement scale effect (default: -180)
 * @param {number} props.minPadding - Minimum padding in pixels (default: 16)
 * @param {number} props.maxPadding - Maximum padding in pixels (default: 32)
 * @param {boolean} props.draggable - Enable dragging functionality (default: true)
 * @param {Function} props.onDragStart - Callback when drag starts
 * @param {Function} props.onDragEnd - Callback when drag ends
 * @param {Object} props.initialPosition - Initial position { x, y } or 'center'
 * @param {boolean} props.bounds - Constrain dragging to viewport (default: true)
 * @param {Object} props.glassConfig - Advanced glass effect configuration
 */

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  scale?: number;
  minPadding?: number;
  maxPadding?: number;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  initialPosition?: "center" | { x: number; y: number };
  classNameContainer?: string;
  ref?: React.RefObject<HTMLDivElement>;
  bounds?: boolean;
  glassConfig?: GlassConfig;
}

interface GlassConfig {
  border?: number;
  lightness?: number;
  alpha?: number;
  blur?: number;
  x?: string;
  y?: string;
}

export const LiquidGlassUI = ({
  children,
  className = "",
  style = {},
  radius = 16,
  scale = -180,
  minPadding = 16,
  maxPadding = 32,
  draggable = true,
  onDragStart,
  onDragEnd,
  classNameContainer,
  initialPosition = "center",
  bounds = true,
  glassConfig = {},
  ref,
  ...props
}: GlassEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 200, height: 80 });

  const filterId = useId();

  // Merge default glass config with user config
  const config = {
    border: 0.07,
    lightness: 50,
    alpha: 0.93,
    blur: 11,
    x: "R",
    y: "B",
    ...glassConfig,
  };

  // Build displacement image
  const buildDisplacementImage = useCallback(
    (width: number, height: number) => {
      const border = Math.min(width, height) * (config.border * 0.5);
      const redId = `red-${filterId}`;
      const blueId = `blue-${filterId}`;

      const svg = `
      <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#${redId})" />
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#${blueId})" style="mix-blend-mode: difference" />
        <rect x="${border}" y="${border}" width="${width - border * 2}" height="${height - border * 2}" rx="${radius}" fill="hsl(0 0% ${config.lightness}% / ${config.alpha})" style="filter:blur(${config.blur}px)" />
      </svg>
    `;

      const encoded = encodeURIComponent(svg);
      return `data:image/svg+xml,${encoded}`;
    },
    [dimensions]
  );

  // Update size based on content
  const updateSize = useCallback(() => {
    if (!contentRef.current || !containerRef.current) return;

    const content = containerRef.current;

    // Get content dimensions
    const contentRect = content.getBoundingClientRect();
    const contentWidth = contentRect.width;
    const contentHeight = contentRect.height;

    if (
      contentWidth === dimensions.width &&
      contentHeight === dimensions.height
    )
      return;

    // Skip if dimensions are 0 (element not visible)
    if (contentWidth === 0 && contentHeight === 0) return;

    // Adaptive padding based on content size

    setDimensions({ width: contentWidth, height: contentHeight });
  }, []);

  // Resize observer for content changes
  useEffect(() => {
    if (!contentRef.current) return;

    let resizeObserver: ResizeObserver | null = null;

    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updateSize);
      });
      resizeObserver.observe(contentRef.current);
    }

    // Initial size update
    updateSize();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [updateSize, children]);

  const displacementImageUrl = buildDisplacementImage(
    dimensions.width,
    dimensions.height
  );

  return (
    <div
      ref={containerRef}
      className={cls("liquidGlass", className)}
      style={
        {
          backdropFilter: `url(#${filterId}) brightness(1.1) saturate(1.5)`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        ref={contentRef}
        className={cls("liquidGlass__content", classNameContainer)}
      >
        {children}
      </div>

      {/* SVG Filter */}
      <svg
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feImage
              x="0"
              y="0"
              width="100%"
              height="100%"
              href={displacementImageUrl}
              result="map"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              xChannelSelector={config.x}
              yChannelSelector={config.y}
              scale={scale}
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="0" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
