import { useCallback } from 'react'

export const useIntersection = <Element extends HTMLElement>(
  callback: () => void,
  options: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  },
) => {
  return useCallback(
    (element: Element | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback()
          }
        })
      }, options)

      if (element) {
        observer.observe(element)
      }

      return () => {
        observer.disconnect()
      }
    },
    [callback, options],
  )
}
