/**
 * @file: horizontal-loop.ts
 * @description: Бесшовная горизонтальная лента с равномерной скоростью
 * @dependencies: gsap
 * @created: 2025-01-27
 */

import { gsap } from "gsap";

export type HorizontalLoopConfig = {
  repeat?: number;
  paused?: boolean;
  reversed?: boolean;
  paddingRight?: number;
  speed?: number; // 1 = ~100px/sec
  snap?: number | false;
};

export function horizontalLoop(
  items: React.RefObject<HTMLDivElement[]>,
  config: HorizontalLoopConfig = {}
) {
  const elements = gsap.utils.toArray(items.current) as HTMLElement[];
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    // @ts-ignore
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  }) as gsap.core.Timeline & {
    next?: (vars?: gsap.TweenVars) => gsap.core.Tween;
    previous?: (vars?: gsap.TweenVars) => gsap.core.Tween;
    toIndex?: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
    current?: () => number;
    times?: number[];
  };

  if (!elements.length) return tl;

  const length = elements.length;
  const widths: number[] = [];
  const xPercents: number[] = [];
  const times: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snapFn =
    config.snap === false
      ? (v: number) => v
      : (gsap.utils.snap((config.snap as number) || 1) as (
          v: number
        ) => number);

  // Считаем ширины и позиции
  elements.forEach((el, i) => {
    widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
    const x = parseFloat(gsap.getProperty(el, "x", "px") as string);
    const xPercent = gsap.getProperty(el, "xPercent") as number;
    xPercents[i] = snapFn((x / widths[i]) * 100 + xPercent);
  });
  gsap.set(elements, { xPercent: (i) => xPercents[i], x: 0 });

  // Общая ширина всех элементов + паддинг
  const totalWidth = elements.reduce(
    (sum, el, i) =>
      sum +
      widths[i] * (gsap.getProperty(el, "scaleX") as number) +
      (config.paddingRight || 0),
    0
  );

  // Формируем таймлайн для бесшовного цикла
  elements.forEach((el, i) => {
    const distanceToLoop = totalWidth;
    const duration = distanceToLoop / pixelsPerSecond;

    tl.to(
      el,
      {
        xPercent: snapFn(((xPercents[i] - distanceToLoop) / widths[i]) * 100),
        duration,
        ease: "none",
      },
      0
    ).fromTo(
      el,
      {
        xPercent: snapFn(
          ((xPercents[i] - distanceToLoop + totalWidth) / widths[i]) * 100
        ),
      },
      {
        xPercent: xPercents[i],
        duration,
        ease: "none",
        immediateRender: false,
      },
      0
    );

    times[i] = 0; // пока фиктивно, для методов next/prev можно улучшить
  });

  // Методы управления
  function toIndex(index: number, vars?: gsap.TweenVars) {
    const newIndex = gsap.utils.wrap(0, length, index);
    curIndex = newIndex;
    return tl.tweenTo(tl.duration() * (newIndex / length), {
      ...vars,
      overwrite: true,
    });
  }

  tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
  tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
  tl.current = () => curIndex;
  tl.times = times;

  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    (tl.vars as any).onReverseComplete();
    tl.reverse();
  }

  return tl;
}
