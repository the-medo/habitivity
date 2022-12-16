import { useCallback, useEffect, useState } from 'react';

interface UseResizeProps {
  minWidth: number;
  maxWidth?: number;
}

interface UseResizeReturn {
  width: number;
  enableResize: () => void;
}

const useResize = ({ minWidth, maxWidth }: UseResizeProps): UseResizeReturn => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(minWidth);

  const enableResize = useCallback(() => {
    setIsResizing(true);
  }, [setIsResizing]);

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX; // You may want to add some offset here from props
        console.log(
          'offsetWidth: ',
          document.body.offsetWidth,
          'offsetLeft:',
          document.body.offsetLeft,
          'clientX:',
          e.clientX,
        );
        if (newWidth >= minWidth && (!maxWidth || newWidth <= maxWidth)) {
          setWidth(newWidth);
        }
      }
    },
    [minWidth, maxWidth, isResizing, setWidth],
  );

  useEffect(() => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', disableResize);

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', disableResize);
    };
  }, [disableResize, resize]);

  return { width, enableResize };
};

export default useResize;
