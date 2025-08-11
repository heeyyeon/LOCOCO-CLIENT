import { useCallback, useEffect, useRef, useState } from 'react';

export const useIntersect = (
  initialVisible: boolean,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(initialVisible);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (!entry) return;

    const isAtTop = window.scrollY <= 0;

    if (!entry.isIntersecting && !isAtTop) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, {
      ...options,
      threshold: 0,
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options, callback]);

  return [ref, isVisible] as const;
};
