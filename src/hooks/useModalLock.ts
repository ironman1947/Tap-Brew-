import { useEffect } from 'react';

/**
 * Hook to lock body scroll and dismiss modal on Escape key press.
 */
export function useModalLock(isOpen: boolean, onClose?: () => void): void {
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}
