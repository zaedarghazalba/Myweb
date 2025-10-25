import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';

// Large visible particles
function Particles() {
  const pointsRef = useRef();

  // Generate particles
  const positions = useMemo(() => {
    const positions = [];
    const particleCount = 300; // Reduced for performance

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in view
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      positions.push(x, y, z);
    }

    return new Float32Array(positions);
  }, []);

  // Animate particles
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      // Continuous rotation
      pointsRef.current.rotation.y = time * 0.1;
      pointsRef.current.rotation.x = time * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#4299e1"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Animated spheres
function AnimatedSpheres() {
  const sphere1Ref = useRef();
  const sphere2Ref = useRef();
  const sphere3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (sphere1Ref.current) {
      sphere1Ref.current.position.y = Math.sin(time) * 2;
      sphere1Ref.current.rotation.x = time * 0.5;
      sphere1Ref.current.rotation.y = time * 0.3;
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(time * 0.8) * 3;
      sphere2Ref.current.position.y = Math.sin(time * 0.8) * 3;
      sphere2Ref.current.rotation.z = time * 0.4;
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.position.x = Math.sin(time * 0.6) * 4;
      sphere3Ref.current.position.z = Math.cos(time * 0.6) * 4;
      sphere3Ref.current.rotation.y = time * 0.6;
    }
  });

  return (
    <group>
      {/* Sphere 1 - Wireframe */}
      <mesh ref={sphere1Ref} position={[-5, 0, -10]}>
        <sphereGeometry args={[1.5, 12, 12]} />
        <meshBasicMaterial color="#60a5fa" wireframe />
      </mesh>

      {/* Sphere 2 - Solid with glow */}
      <mesh ref={sphere2Ref} position={[5, 0, -8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Sphere 3 - Ring */}
      <mesh ref={sphere3Ref} position={[0, -3, -12]}>
        <torusGeometry args={[2, 0.3, 12, 32]} />
        <meshStandardMaterial
          color="#4299e1"
          emissive="#4299e1"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function SimpleParticlesBackground() {
  return (
    <>
      {/* Background Gradient Layer - Very subtle */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-gray-50/50 via-blue-50/20 to-gray-100/50 dark:from-gray-900/30 dark:via-blue-950/10 dark:to-gray-900/30" />

      {/* 3D Canvas Layer */}
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 75 }}
          style={{
            width: '100%',
            height: '100vh',
            background: 'transparent'
          }}
          gl={{ alpha: true }}
        >
          {/* Strong Lighting */}
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#4299e1" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#60a5fa" />

          {/* Animated Elements */}
          <Particles />
          <AnimatedSpheres />
        </Canvas>
      </div>
    </>
  );
}
