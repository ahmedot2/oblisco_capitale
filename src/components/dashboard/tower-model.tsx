'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BentoCardContent, BentoCardHeader, BentoCardTitle } from '../ui/bento-card';

export function TowerModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.BoxGeometry(1, 4, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.8,
    });
    
    const tower = new THREE.Mesh(geometry, material);
    scene.add(tower);

    // Twist the tower
    const position = tower.geometry.attributes.position;
    const vertex = new THREE.Vector3();
    for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);
        const angle = vertex.y * 0.5;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        const x = vertex.x * cos - vertex.z * sin;
        const z = vertex.x * sin + vertex.z * cos;
        position.setX(i, x);
        position.setZ(i, z);
    }
    position.needsUpdate = true;


    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00aaff, 50, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff00aa, 50, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      tower.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-white/5 p-4 rounded-lg border border-white/10">
      <BentoCardHeader className="p-0">
        <BentoCardTitle className="font-headline text-base">A Generational Asset Secured by an Unrivaled Partnership</BentoCardTitle>
      </BentoCardHeader>
      <BentoCardContent className="flex-grow relative p-0 mt-4">
        <div ref={mountRef} className="absolute inset-0" />
      </BentoCardContent>
    </div>
  );
}
