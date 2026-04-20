import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  progress: number;
  isMobile?: boolean;
}

export default function CameraController({ progress, isMobile = false }: CameraControllerProps) {
  const { camera, pointer } = useThree();
  void progress;

  useFrame((state, delta) => {
    const targetX = isMobile ? 0 : pointer.x * 0.15;
    const targetY = 0.2 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04 + (isMobile ? 0 : pointer.y * 0.08);
    const targetZ = 6;

    const damping = 1 - Math.exp(-delta * 3.8);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, damping);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, damping);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, damping);
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}
