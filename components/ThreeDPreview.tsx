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
    scene.fog = new THREE.FogExp2(0x020617, 0.05);

    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Geometry - Cyberpunk Icosahedron
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2dd4bf,
      emissive: 0x112244,
      side: THREE.DoubleSide,
      flatShading: true,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Inner Core
    const coreGeo = new THREE.IcosahedronGeometry(1, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: false });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(10, 10, 10);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.005;
      
      core.rotation.x -= 0.005;
      core.rotation.y -= 0.01;

      // Pulse effect
      const time = Date.now() * 0.001;
      const scale = 1 + Math.sin(time) * 0.1;
      core.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full bg-[#020617] relative cursor-move group"
    >
      <div className="absolute bottom-2 left-2 text-[10px] text-[#2dd4bf] font-mono opacity-70">
        INTERACTIVE PREVIEW // RENDER_CORE_V2
      </div>
    </div>
  );
};

export default ThreeDPreview;