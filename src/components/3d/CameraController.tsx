import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  progress: number;
  isMobile?: boolean;
}

export default function CameraController({ progress, isMobile = false }: CameraControllerProps) {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    const t = THREE.MathUtils.clamp(progress, 0, 1);
    const targetX = isMobile ? 0 : pointer.x * 0.15;
    const targetY = THREE.MathUtils.lerp(0, 0.5, t) + (isMobile ? 0 : pointer.y * 0.08);
    const targetZ = THREE.MathUtils.lerp(6, 2, t);

    const damping = 1 - Math.exp(-delta * 3.8);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, damping);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, damping);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, damping);
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}
