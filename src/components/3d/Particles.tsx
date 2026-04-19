import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticlesProps {
  isMobile?: boolean;
}

export default function Particles({ isMobile = false }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = isMobile ? 180 : 420;

  const { positions, baseSpeeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speed = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = THREE.MathUtils.randFloatSpread(26);
      pos[i3 + 1] = THREE.MathUtils.randFloatSpread(16);
      pos[i3 + 2] = THREE.MathUtils.randFloat(-22, 8);
      speed[i] = THREE.MathUtils.randFloat(0.003, 0.012);
    }

    return { positions: pos, baseSpeeds: speed };
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }

    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const parallax = isMobile ? 0 : state.pointer.x * 0.12;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 2] += baseSpeeds[i] * (isMobile ? 0.6 : 1);
      arr[i3] += (parallax - arr[i3] * 0.0025) * 0.001;

      if (arr[i3 + 2] > 8) {
        arr[i3 + 2] = -22;
      }
    }

    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={isMobile ? 0.02 : 0.03} sizeAttenuation transparent opacity={0.8} depthWrite={false} />
    </points>
  );
}
