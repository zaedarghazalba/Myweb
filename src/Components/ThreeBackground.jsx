import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Particles Component
function Particles({ count = 2000 }) {
  const mesh = useRef();
  const light = useRef();

  // Generate random positions for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  // Animate particles
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (mesh.current) {
      mesh.current.rotation.x = time * 0.05;
      mesh.current.rotation.y = time * 0.075;
    }

    if (light.current) {
      light.current.position.x = Math.sin(time * 0.5) * 10;
      light.current.position.z = Math.cos(time * 0.5) * 10;
    }
  });

  return (
    <group>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#4299e1"
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <pointLight ref={light} position={[10, 10, 10]} intensity={1.5} color="#4299e1" />
    </group>
  );
}

// Floating Spheres Component
function FloatingSpheres() {
  const group = useRef();

  const spheres = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      ],
      scale: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.5 + 0.2
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={group}>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={sphere.position}>
          <sphereGeometry args={[sphere.scale, 12, 12]} />
          <meshStandardMaterial
            color="#60a5fa"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Background Component
export default function ThreeBackground() {
  return (
    <>
      {/* Background Gradient Layer - Very subtle */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-gray-50/50 via-indigo-50/20 to-gray-100/50 dark:from-gray-900/30 dark:via-indigo-950/10 dark:to-gray-900/30" />

      {/* 3D Canvas Layer */}
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 75 }}
          style={{
            width: '100%',
            height: '100vh',
            background: 'transparent'
          }}
          gl={{ alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#4299e1" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#60a5fa" />

          {/* Particles */}
          <Particles count={500} />

          {/* Floating Spheres */}
          <FloatingSpheres />
        </Canvas>
      </div>
    </>
  );
}
