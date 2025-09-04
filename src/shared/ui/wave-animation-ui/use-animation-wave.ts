import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const useAnimationWave = ({
  noAnimation = false,
}: {
  noAnimation?: boolean;
}) => {
  // ====== Константы ======

  // ширина грани
  const P_MAX = 98; // у курсора: градиент почти до низа
  const P_MIN = 55; // далеко: короче, но заметный
  const CENTER = 0.5; // центр экрана в долях
  const BLEND_WIDTH = 0.2; // ширина зоны смешения парабола→волна
  const ALPHA = 0.1; // сглаживание движения курсора (меньше → плавнее)
  const LAMBDA = 1; // длина волны (фиксированная для стабильности)
  const SPREAD = 1.0; // ширина параболы (|u - u0| = 1 → минимум)

  // ====== Утилиты ======
  const clamp = (v: number, a: number, b: number) =>
    Math.max(a, Math.min(b, v));
  const smoothstep = (e0: number, e1: number, x: number) => {
    const t = clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  };

  // ====== DOM ======
  const bgRef = useRef<HTMLDivElement>(null);

  const renderCells = () => {
    if (typeof window === "undefined" || !bgRef.current) return;

    const cellWidth = +window
      .getComputedStyle(bgRef.current)
      .getPropertyValue("grid-auto-columns")
      .replace("px", "");

    console.log("cellWidthCurrent", cellWidth);
    const needed = Math.max(
      1,
      Math.ceil(window.innerWidth / (+cellWidth || 0))
    );

    const current = bgRef.current.children.length;
    for (let i = current; i < needed; i++) {
      const cell = document.createElement("div");
      cell.className = "wave-background__cell";
      bgRef.current.appendChild(cell);
    }
    for (let i = bgRef.current.children.length - 1; i >= needed; i--) {
      bgRef.current.removeChild(bgRef.current.children[i]);
    }
  };

  // ====== Анимация градиента ======
  let lastX = typeof window !== "undefined" ? window.innerWidth / 2 : 0; // последняя позиция курсора (px)
  let smoothU = 0.5; // сглаженная позиция курсора (0..1)

  const updateGradients = (x: number) => {
    if (typeof x === "number") lastX = x;
    if (!(bgRef.current?.children.length || 0)) renderCells();

    // Геометрия контейнера (кэшируем часто используемые величины)
    const rect = bgRef.current?.getBoundingClientRect();
    const rectLeft = rect?.left || 0;
    const width = Math.max(1, rect?.width || 0);
    const invWidth = 1 / width;

    // Нормализуем и сглаживаем позицию курсора
    const uMouseRaw = clamp((lastX - rectLeft) * invWidth, 0, 1);
    smoothU += ALPHA * (uMouseRaw - smoothU);

    // Плавное смешение режимов: 0 — парабола, 1 — волна
    const blend = smoothstep(0, BLEND_WIDTH, Math.abs(smoothU - CENTER));

    // Предварительные коэффициенты для быстроты
    const m = smoothU * 2 - 1; // центр параболы в [-1,1]
    const range = P_MAX - P_MIN;

    // Обход без создания массивов на каждый кадр
    const n = bgRef.current?.children.length || 0;
    for (let i = 0; i < n; i++) {
      const cell = bgRef.current?.children[i];

      // Центр ячейки в координатах контейнера (используем offset для стабильности)
      const u = clamp(
        ((cell as HTMLElement).offsetLeft +
          (cell as HTMLElement).offsetWidth * 0.5) *
          invWidth,
        0,
        1
      );

      // 1) Параболическая компонента
      const uu = u * 2 - 1;
      const d = (uu - m) / SPREAD;
      const parabola = Math.max(0, 1 - d * d);
      const pinkParabola = P_MIN + range * parabola;

      // 2) Волновая компонента (стабильная фаза)
      const phase = (2 * Math.PI * (u - smoothU)) / LAMBDA;
      const wave = (Math.cos(phase) + 1) * 0.5; // 0..1
      const pinkWave = P_MIN + range * wave;

      // 3) Итог с плавным смешением
      let pinkStop = pinkParabola * (1 - blend) + pinkWave * blend;
      pinkStop = clamp(pinkStop, 20, 99);

      (cell as HTMLElement).style.background =
        `linear-gradient(180deg, #0279C1 0%, #FF2A92 ${pinkStop}%, #FF2A92 100%)`;
    }
  };

  // ====== Инициализация и события ======
  const init = useCallback(() => {
    renderCells();
    const rect = bgRef.current?.getBoundingClientRect();
    const width = Math.max(1, rect?.width || 0);
    smoothU = clamp((lastX - (rect?.left || 0)) / width, 0, 1);
    requestAnimationFrame(() => updateGradients(lastX));
  }, []);

  useEffect(() => {
    const resize = () => {
      renderCells();
      requestAnimationFrame(() => updateGradients(lastX));
    };

    const pointermove = (e: MouseEvent) => {
      if (noAnimation) return;
      requestAnimationFrame(() => updateGradients(e.clientX));
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointermove);
    init();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", pointermove);
    };
  }, [noAnimation, init]);

  return { bgRef };
};
