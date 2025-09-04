/**
 * @file: split-text-to-words.ts
 * @description: Утилита разбиения текста на слова для анимации заголовков
 * @dependencies: DOM API
 * @created: 2025-01-27
 */

/**
 * Разбивает содержимое элемента на слова, оборачивая каждое в span.word
 * Возвращает NodeList со спанами для дальнейшей анимации
 */
export const splitTextToWords = (element: HTMLElement) => {
  const text = element.textContent || "";
  const words = text.trim().split(/\s+/);

  element.innerHTML = words
    .map(
      (word, index) =>
        `<span class="word" data-word-index="${index}">${word}</span>`
    )
    .join(" ");

  return element.querySelectorAll(".word");
};
