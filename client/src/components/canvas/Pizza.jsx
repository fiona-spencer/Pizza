import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Main/Loader";

// Pizza Component that loads the GLTF model
const Pizza = () => {
  const { scene } = useGLTF('/models/pizza_box/scene.gltf'); // 

  // useEffect for cleanup of resources
  useEffect(() => {
    return () => {
      // Dispose of the scene and all of its children properly when the component unmounts
      if (scene) {
        scene.traverse((child) => {
          if (child.dispose) child.dispose(); // Dispose of all child meshes and resources
        });
        scene.dispose(); // Dispose of the scene itself
      }
    };
  }, [scene]);

  return <primitive object={scene} scale={1.2} position-y={2} rotation-y={10} />;
};

// Canvas Component that renders the 3D scene
const PizzaCanvas = () => {
  return (
<Canvas
  shadows
  frameloop="demand"
  dpr={[1, 4]}
  gl={{ preserveDrawingBuffer: true }}
  camera={{
    fov: 45,
    near: 0.1,
    far: 200,
    position: [-3, 3, 6], // Camera position: move the camera back to make the object bigger
  }}
>
  <Suspense fallback={<CanvasLoader />}>
    <OrbitControls
      autoRotate
      enableZoom={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
    />

    {/* Lighting Setup */}
    <ambientLight intensity={8} />
    <directionalLight position={[0, 5, 4]} intensity={3.5} castShadow />
    <pointLight position={[0, 0, 0]} intensity={10} distance={10} />
    <spotLight
      position={[10, 10, 10]}
      angle={Math.PI / 6}
      penumbra={1}
      intensity={1}
      castShadow
    />

    {/* Pizza Component */}
    <Pizza scale={3} position={[0, 0, 0]} /> {/* Increased scale and centered */}
    <Preload all />
  </Suspense>
</Canvas>

  );
};

export default PizzaCanvas;
