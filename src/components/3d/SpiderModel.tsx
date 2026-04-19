import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface SpiderModelProps {
  scale?: number;
  isMobile?: boolean;
}

export default function SpiderModel({ scale = 2, isMobile = false }: SpiderModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Meshy_AI_Spider_Man_Swinging_T_0419205219_texture.glb");
  const model = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    groupRef.current.position.y = 0.2 + Math.sin(t * 1.5) * 0.05;
    groupRef.current.rotation.y += delta * 0.1;

    if (!isMobile) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.1 + state.pointer.y * 0.05, 0.04);
    }
  });

  return (
    <group ref={groupRef} rotation={[0.1, 0.5, 0]} scale={scale}>
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}

useGLTF.preload("/models/Meshy_AI_Spider_Man_Swinging_T_0419205219_texture.glb");
