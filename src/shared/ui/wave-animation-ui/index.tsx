import dynamic from "next/dynamic";

export const WaveAnimationUI = dynamic(() => import("./wave-animation-ui.ui"), {
  ssr: false,
});
