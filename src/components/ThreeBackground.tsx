import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  scrollProgress: number; // 0.0 to 1.0
  activeChapter: number;  // 1 to 5
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ scrollProgress, activeChapter }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene & Camera
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030712, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 3. Particle Starfield / Quantum Field
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f0ff); // Cyan (Tekno/Intelek)
    const color2 = new THREE.Color(0xff2a55); // Red (Kombat)
    const color3 = new THREE.Color(0xf59e0b); // Gold (Neuro)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const mixedColor = Math.random() > 0.6 ? color1 : (Math.random() > 0.3 ? color2 : color3);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, pMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // 4. M.A.T.A Holographic Gyro Rings Group
    const ringsGroup = new THREE.Group();
    ringsRef.current = ringsGroup;

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff2a55,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(8, 0.04, 16, 100), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(12, 0.04, 16, 100), ringMat2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(16, 0.05, 16, 100), ringMat3);

    ringsGroup.add(ring1);
    ringsGroup.add(ring2);
    ringsGroup.add(ring3);
    scene.add(ringsGroup);

    // 5. Central Physics 3D Icosahedron Core
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMeshRef.current = coreMesh;
    scene.add(coreMesh);

    // 6. Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 7. Mouse Listener
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 8. Resize Listener
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      camera.position.x += (mouseRef.current.x * 2.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouseRef.current.y * 2.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Rotate Quantum Particles
      if (particles) {
        particles.rotation.y = elapsedTime * 0.04;
        particles.rotation.x = elapsedTime * 0.02;
      }

      // Rotate Holographic Rings
      if (ringsGroup) {
        ring1.rotation.x = elapsedTime * 0.4;
        ring1.rotation.y = elapsedTime * 0.3;
        ring2.rotation.y = -elapsedTime * 0.35;
        ring2.rotation.z = elapsedTime * 0.2;
        ring3.rotation.x = -elapsedTime * 0.25;
        ring3.rotation.z = -elapsedTime * 0.3;
      }

      // Rotate Center Core
      if (coreMesh) {
        coreMesh.rotation.x = elapsedTime * 0.2;
        coreMesh.rotation.y = elapsedTime * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Sync with scroll & active chapter
  useEffect(() => {
    if (!ringsRef.current || !coreMeshRef.current) return;

    // Morph scale and position based on scrollProgress
    const targetScale = 1 + scrollProgress * 0.6;
    ringsRef.current.scale.set(targetScale, targetScale, targetScale);
    coreMeshRef.current.scale.set(1 + Math.sin(scrollProgress * Math.PI) * 0.5, 1 + Math.sin(scrollProgress * Math.PI) * 0.5, 1 + Math.sin(scrollProgress * Math.PI) * 0.5);

    // Color shift on chapter change
    const coreMat = coreMeshRef.current.material as THREE.MeshBasicMaterial;
    if (activeChapter === 1) coreMat.color.setHex(0x00f0ff); // Cyan
    if (activeChapter === 2) coreMat.color.setHex(0x10b981); // Emerald
    if (activeChapter === 3) coreMat.color.setHex(0x0284c7); // Deep Sky
    if (activeChapter === 4) coreMat.color.setHex(0xff2a55); // Red Kombat
    if (activeChapter === 5) coreMat.color.setHex(0xf59e0b); // Gold Apex
  }, [scrollProgress, activeChapter]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-85 transition-opacity duration-700"
    />
  );
};
