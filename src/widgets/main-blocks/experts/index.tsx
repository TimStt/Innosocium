"use client";

import dynamic from "next/dynamic";

export const Experts = dynamic(() => import("./experts.ui"), {
  ssr: false,
});
