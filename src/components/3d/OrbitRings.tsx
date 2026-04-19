import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface OrbitRingsProps {
  isMobile?: boolean;
}

export default function OrbitRings({ isMobile = false }: OrbitRingsProps) {
  const groups = useRef<Array<THREE.Group | null>>([]);

  const rings = useMemo(
    () => [
      { radius: 1.5, tube: 0.015, color: "#E11D48", speed: 0.15, tilt: [1.0, 0.2, 0.1] as const },
      { radius: 1.9, tube: 0.015, color: "#1D4ED8", speed: -0.12, tilt: [1.15, -0.3, 0.35] as const },
      { radius: 2.35, tube: 0.012, color: "#E11D48", speed: 0.08, tilt: [0.92, 0.5, -0.2] as const },
      { radius: 2.75, tube: 0.01, color: "#1D4ED8", speed: -0.05, tilt: [1.25, -0.45, 0.1] as const },
    ],
    []
  );

  useFrame((_, delta) => {
    groups.current.forEach((group, idx) => {
      if (!group) {
        return;
      }
      const speedMultiplier = isMobile ? 0.65 : 1;
      group.rotation.z += rings[idx].speed * delta * speedMultiplier;
      group.rotation.y += rings[idx].speed * 0.35 * delta * speedMultiplier;
    });
  });

  return (
    <group>
      {rings.map((ring, i) => (
        <group
          key={ring.radius}
          ref={(el) => {
            groups.current[i] = el;
          }}
          rotation={[ring.tilt[0], ring.tilt[1], ring.tilt[2]]}
        >
          <mesh>
            <torusGeometry args={[ring.radius, ring.tube, 16, 160]} />
            <meshBasicMaterial color={ring.color} transparent opacity={0.3} />
          </mesh>
          <mesh>
            <torusGeometry args={[ring.radius, ring.tube * 1.9, 16, 160]} />
            <meshBasicMaterial color={ring.color} transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
