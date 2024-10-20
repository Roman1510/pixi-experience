import { useEffect, useState, useCallback } from 'react';
import { Stage } from '@pixi/react';
import { MainContainer } from './MainContainer';
import { calculateCanvasSize } from '../../helpers/common';



export const PixiGrid = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize());

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calculateCanvasSize());
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  return (
    <Stage
      width={canvasSize.width}
      height={canvasSize.height}
      options={{
        backgroundAlpha: 0,
      }}
    >
      <MainContainer canvasSize={canvasSize} />
    </Stage>
  );
};
