// src/components/ThreeDModel.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Example component to load a GLTF model
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const ThreeDModel = ({ modelUrl }) => {
    

return (
    <div style={{ width: '100%', height: '100%' }}>
        <Canvas>
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <Model url={modelUrl} rotation-y={Math.PI / 2} />
            </Suspense>
            <OrbitControls 
                enableRotate={true} 
                enableZoom={true} 
                enablePan={false} 
                zoom0={10}
                />
        </Canvas>
    </div>
);
};

export default ThreeDModel;
