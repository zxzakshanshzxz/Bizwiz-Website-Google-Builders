/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDPreview: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Dark Blue/Black fog for depth
    scene.fog = new THREE.FogExp2(0x020617, 0.035);

    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Group to hold all objects for unified rotation
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Cyber Core (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2dd4bf, // Teal
      emissive: 0x0f172a,
      specular: 0xffffff,
      shininess: 50,
      flatShading: true,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(geometry, material);
    group.add(core);

    // 2. Wireframe Shell
    const wireGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6, // Blue
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const shell = new THREE.Mesh(wireGeo, wireMat);
    group.add(shell);

    // 3. Floating Particles (Orbiting Data)
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
        // Spread particles in a sphere around the core
        posArray[i] = (Math.random() - 0.5) * 8; 
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    scene.add(light);
    
    const blueLight = new THREE.PointLight(0x3b82f6, 5, 10);
    blueLight.position.set(-5, -2, 2);
    scene.add(blueLight);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Mouse Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
        const rect = mountRef.current?.getBoundingClientRect();
        if (rect) {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            mouseX = (x / rect.width) * 2 - 1;
            mouseY = - (y / rect.height) * 2 + 1;
        }
    };
    
    // Add listener to the specific div only
    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Constant slow rotation
      core.rotation.y += 0.005;
      shell.rotation.y -= 0.002;
      particles.rotation.y += 0.001;
      
      // Mouse interaction (Smooth Lerp)
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;

      group.rotation.x += 0.05 * (targetRotationX - group.rotation.x);
      group.rotation.y += 0.05 * (targetRotationY - group.rotation.y);

      // Pulse effect
      const time = Date.now() * 0.001;
      const scale = 1 + Math.sin(time * 2) * 0.05;
      core.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
        if (!mountRef.current) return;
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        if (renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
      }
      geometry.dispose();
      material.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full bg-gradient-to-b from-[#020617] to-[#0f172a] relative cursor-crosshair group overflow-hidden"
    >
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-[#2dd4bf] font-mono tracking-widest uppercase">Live Render</span>
          </div>
          <div className="text-[10px] text-white/50 font-mono">
            WEBGL // THREE.JS
          </div>
      </div>
      
      <div className="absolute bottom-4 right-4 z-10 text-right pointer-events-none">
        <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">
            Interactive<br/>Model
        </div>
      </div>
    </div>
  );
};

export default ThreeDPreview;