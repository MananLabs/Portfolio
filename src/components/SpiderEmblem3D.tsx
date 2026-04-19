import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * SpiderEmblem3D
 * -----------------------------------------------------------
 * A premium, abstract 3D centerpiece for the hero. Built procedurally
 * with React Three Fiber so it ships small and runs fast everywhere.
 *
 * To swap in a real Spider-Man .glb model later:
 *   1. Place file at: src/assets/spiderman.glb
 *   2. Replace <EmblemMesh /> with:
 *        const { scene } = useGLTF("/spiderman.glb");
 *        return <primitive object={scene} scale={1.2} />;
 *      (and import { useGLTF } from "@react-three/drei")
 */

function EmblemMesh({ zoom }: { zoom: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow idle rotation
      groupRef.current.rotation.y += delta * 0.15;
      // Subtle mouse-influenced tilt
      const { x, y } = state.pointer;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        y * 0.2,
        0.05
      );
    }
    if (innerRef.current) {
      innerRef.current.rotation.z -= delta * 0.4;
    }
  });

  // Web-thread lines radiating outward
  const webLines = useMemo(() => {
    const lines: { points: THREE.Vector3[]; color: string }[] = [];
    const segments = 12;
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      lines.push({
        points: [
          new THREE.Vector3(x * 0.9, y * 0.9, 0),
          new THREE.Vector3(x * 2.2, y * 2.2, 0),
        ],
        color: i % 2 === 0 ? "#E11D48" : "#1D4ED8",
      });
    }
    return lines;
  }, []);

  // Concentric web rings
  const rings = useMemo(() => [1.2, 1.5, 1.85, 2.2], []);

  return (
    <group ref={groupRef} scale={1 + zoom * 0.3}>
      {/* Core glowing orb */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.95}
          roughness={0.15}
          emissive="#E11D48"
          emissiveIntensity={0.4}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay for tech feel */}
      <mesh>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshBasicMaterial color="#E11D48" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Outer web threads */}
      {webLines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(line.points);
        return (
          // @ts-expect-error - line is a valid r3f primitive
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color={line.color} transparent opacity={0.5} />
          {/* @ts-expect-error */}
          </line>
        );
      })}

      {/* Concentric rings */}
      {rings.map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.005, 8, 96]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#E11D48" : "#1D4ED8"}
            transparent
            opacity={0.3 - i * 0.05}
          />
        </mesh>
      ))}

      {/* Soft accent sphere for blue glow */}
      <mesh position={[0, 0, -0.3]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#1D4ED8" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

interface Props {
  /** 0 = far / idle, 1 = fully zoomed in */
  zoom: number;
}

export default function SpiderEmblem3D({ zoom }: Props) {
  // Camera moves closer as user scrolls
  const cameraZ = 6 - zoom * 2.2;

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, cameraZ], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        {/* Cinematic lighting — red key, blue rim */}
        <ambientLight intensity={0.25} />
        <pointLight position={[5, 4, 5]} intensity={2.5} color="#E11D48" />
        <pointLight position={[-5, -3, 3]} intensity={2} color="#1D4ED8" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#ffffff" />

        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
          <EmblemMesh zoom={zoom} />
        </Float>

        {/* Ambient sparkles — like web particles */}
        <Sparkles
          count={60}
          scale={8}
          size={2}
          speed={0.3}
          opacity={0.6}
          color="#ffffff"
        />

        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
