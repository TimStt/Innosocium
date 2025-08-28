import { useEffect, useRef, useState } from "react";

export const useFitText = (
  refContainer: React.RefObject<HTMLDivElement | null>
) => {
  const refText = useRef<HTMLParagraphElement | HTMLHeadingElement>(null);

  const [ratioText, setRatioText] = useState<number | null>(null);

  useEffect(() => {
    if (refText.current && !ratioText) {
      const ratio =
        (refText.current?.computedStyleMap().get("font-size") as CSSUnitValue)
          .value / refText.current?.getBoundingClientRect().width;
      setRatioText(ratio);
    }

    if (refContainer.current) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { width: containerWidth } = entry.contentRect;

          if (ratioText) {
            const fontSize = containerWidth * ratioText + "px";
            refText.current!.style.fontSize = fontSize;
          }
        });
      });

      observer.observe(refContainer.current);
    }
  }, [refContainer, ratioText]);

  return { refText };
};
