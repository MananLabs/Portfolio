import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SpiderModel from "./SpiderModel";
import Particles from "./Particles";
import CameraController from "./CameraController";

interface SceneProps {
  zoom: number;
  isMobile?: boolean;
}

export default function Scene({ zoom, isMobile = false }: SceneProps) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 6], fov: isMobile ? 52 : 46 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows={false}
    >
      <color attach="background" args={["#03040a"]} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[-5, 2, 5]} color="#E11D48" intensity={1} />
      <directionalLight position={[5, 2, 5]} color="#1D4ED8" intensity={1} />
      <spotLight
        position={[0, 4, 3]}
        angle={0.36}
        penumbra={0.8}
        intensity={isMobile ? 0.7 : 1}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <Particles isMobile={isMobile} />
        <SpiderModel scale={isMobile ? 1.6 : 2} isMobile={isMobile} />
      </Suspense>

      <CameraController progress={zoom} isMobile={isMobile} />
    </Canvas>
  );
}
