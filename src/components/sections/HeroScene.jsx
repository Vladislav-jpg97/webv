'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Единственный 3D-элемент сайта: торус-узел + каркасная сфера + облако частиц.
// Реагирует на движение мыши, ставится на паузу вне экрана и при prefers-reduced-motion.

function Core({ mobile, reduced, pointer }) {
  const group = useRef();
  const knot = useRef();
  const shell = useRef();
  const dust = useRef();

  const dustPositions = useMemo(() => {
    const n = mobile ? 140 : 340;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.3 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [mobile]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const k = Math.min(1, dt * 3);
    group.current.rotation.y += (pointer.current.x * 0.7 - group.current.rotation.y) * k;
    group.current.rotation.x += (-pointer.current.y * 0.45 - group.current.rotation.x) * k;
    if (!reduced) {
      knot.current.rotation.x = t * 0.18;
      knot.current.rotation.y = t * 0.24;
      shell.current.rotation.y = -t * 0.08;
      shell.current.rotation.z = t * 0.05;
      dust.current.rotation.y = t * 0.03;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1, 0.34, mobile ? 120 : 240, mobile ? 18 : 36, 2, 3]} />
        <meshPhysicalMaterial
          color="#2a2078"
          metalness={0.7}
          roughness={0.28}
          clearcoat={1}
          clearcoatRoughness={0.12}
          emissive="#140f4a"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={shell} scale={1.75}>
        <icosahedronGeometry args={[1, mobile ? 1 : 2]} />
        <meshBasicMaterial wireframe color="#7c8cff" transparent opacity={0.16} />
      </mesh>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={mobile ? 0.03 : 0.024} color="#b9b0ff" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  );
}

export default function HeroScene({ mobile = false, reduced = false }) {
  const wrapRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      if (!(c.getContext('webgl2') || c.getContext('webgl'))) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {supported ? (
        <Canvas
          dpr={[1, mobile ? 1.25 : 1.75]}
          camera={{ position: [0, 0, 6.2], fov: 42 }}
          gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
          frameloop={visible && !reduced ? 'always' : 'demand'}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          style={{ background: 'transparent' }}
          aria-hidden="true"
        >
          <ambientLight intensity={0.35} />
          <pointLight position={[4, 3, 4]} intensity={55} color="#8b7bff" />
          <pointLight position={[-4, -2, 3]} intensity={40} color="#2f7bff" />
          <pointLight position={[0, 4, -3]} intensity={45} color="#5fd0ff" />
          <Core mobile={mobile} reduced={reduced} pointer={pointer} />
        </Canvas>
      ) : (
        <div className="absolute inset-[18%] rounded-full bg-[conic-gradient(from_0deg,#6d5cff,#2f7bff,#5fd0ff,#6d5cff)] opacity-40 blur-2xl" />
      )}
    </div>
  );
}
