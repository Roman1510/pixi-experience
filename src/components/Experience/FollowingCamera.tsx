import { useRef, PropsWithChildren } from 'react';
import { Container, useTick } from '@pixi/react';
import { Graphics as PIXIGraphics } from 'pixi.js';
import { TILE_SIZE } from '../../constants/game-world';

interface FollowingCameraProps {
  radius: number;
  zoom: number;
  heroPosition: { x: number; y: number };
  canvasSize: number;
}

const lerp = (start: number, end: number, t: number) => {
  return start + (end - start) * t;
};

export const FollowingCamera = ({

  zoom,
  heroPosition,
  canvasSize,
  children,
}: PropsWithChildren<FollowingCameraProps>) => {

  const containerRef = useRef<PIXIGraphics>(null);

  const cameraPosition = useRef<{ x: number; y: number }>({
    x: canvasSize / 2,
    y: canvasSize / 2,
  });

  const lerpFactor = 0.03;

  useTick(() => {
    if (containerRef.current) {

      const targetX = canvasSize / 2 - heroPosition.x * TILE_SIZE * zoom - TILE_SIZE;
      const targetY = canvasSize / 2 - heroPosition.y * TILE_SIZE * zoom - TILE_SIZE;

      cameraPosition.current.x = lerp(cameraPosition.current.x, targetX, lerpFactor);
      cameraPosition.current.y = lerp(cameraPosition.current.y, targetY, lerpFactor);

      containerRef.current.x = cameraPosition.current.x;
      containerRef.current.y = cameraPosition.current.y;
    }
  });

  return (


    <Container ref={containerRef} scale={zoom}>
      {children}
    </Container>

  );
};
