import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Animated Wave Grid
function WaveGrid() {
  const mesh = useRef();
  const gridSize = 30;
  const gridDivisions = 20; // Reduced for performance

  // Create grid geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
    return geo;
  }, []);

  // Animate wave effect
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const waveX = Math.sin(x * 0.3 + time) * 0.5;
      const waveY = Math.sin(y * 0.3 + time * 0.8) * 0.5;
      positions.setZ(i, waveX + waveY);
    }

    positions.needsUpdate = true;
    mesh.current.rotation.x = -Math.PI / 3;
    mesh.current.rotation.z = time * 0.05;
  });

  return (
    <mesh ref={mesh} position={[0, -5, -10]} geometry={geometry}>
      <meshStandardMaterial
        color="#4299e1"
        wireframe
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Rotating Rings
function RotatingRings() {
  const group = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.x = time * 0.1;
      group.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * (Math.PI / 3)]}>
          <torusGeometry args={[3 + i * 0.5, 0.05, 12, 48]} />
          <meshStandardMaterial
            color={`hsl(${200 + i * 10}, 70%, 60%)`}
            transparent
            opacity={0.6}
            emissive={`hsl(${200 + i * 10}, 70%, 50%)`}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating Particles with Mouse Interaction
function InteractiveParticles({ count = 1000 }) {
  const points = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = time * 0.05;
      points.current.rotation.x = Math.sin(time * 0.1) * 0.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60a5fa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function AnimatedBackground() {
  return (
    <>
      {/* Background Gradient Layer - Very subtle */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-gray-50/50 via-blue-50/20 to-gray-100/50 dark:from-gray-900/30 dark:via-gray-800/10 dark:to-gray-900/30" />

      {/* 3D Canvas Layer */}
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 75 }}
          style={{
            width: '100%',
            height: '100vh',
            background: 'transparent'
          }}
          gl={{ alpha: true }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#4299e1" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#60a5fa" />
          <pointLight position={[0, 10, 0]} intensity={1} color="#60a5fa" />

          {/* Stars in background */}
          <Stars
            radius={100}
            depth={50}
            count={1000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          {/* Main Elements */}
          <InteractiveParticles count={300} />
          <RotatingRings />
          <WaveGrid />
        </Canvas>
      </div>
    </>
  );
}
