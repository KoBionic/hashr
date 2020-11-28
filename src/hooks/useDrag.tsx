import { useEffect, useState } from 'react';

/**
 * Registers to drag events & updates to true if an object is being dragged over the Browser Window.
 */
function useDrag() {
  const [isDragged, setIsDragged] = useState(false);
  useEffect(() => {
    const handleDragEnter = () => setIsDragged(true);
    const handleDragDrop = () => setIsDragged(false);
    const handleDragLeave = (e: DragEvent) => {
      if (!e.clientX && !e.clientY) setIsDragged(false);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('dragenter', handleDragEnter);
      window.addEventListener('dragleave', handleDragLeave);
      window.addEventListener('drop', handleDragDrop);
      return () => {
        window.removeEventListener('dragenter', handleDragEnter);
        window.removeEventListener('dragleave', handleDragLeave);
        window.removeEventListener('drop', handleDragDrop);
      };
    }
  }, []);
  return isDragged;
}

export default useDrag;
