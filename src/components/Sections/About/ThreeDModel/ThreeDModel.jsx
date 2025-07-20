// src/components/ThreeDModel.js
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';


function AnimatedModel({ url, isActive }) {
    const ref = useRef();
    const { scene } = useGLTF(url);

    useFrame((state) => {
        if (!isActive && ref.current) {
            // Spin
            ref.current.rotation.y += 0.01;
            // Bob
            ref.current.position.y = -1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
        }
    });

    return <primitive ref={ref} object={scene}/>;
}

const ThreeDModel = ({ modelUrl }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div
            style={{ width: '100%', height: '100%' }}
            onMouseOver={() => setIsActive(true)}
            onMouseOut={() => setIsActive(false)}
        >
            <Canvas>
                <ambientLight intensity={3} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <AnimatedModel url={modelUrl} isActive={isActive} />
                </Suspense>
                <OrbitControls
                    enableRotate={true}
                    enableZoom={true}
                    enablePan={false}
                    zoom0={10}
                    makeDefault
                />
            </Canvas>
        </div>
    );
};

export default ThreeDModel;
