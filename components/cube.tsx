'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const ThreeJS = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvasRef.current) {
            const scene = new THREE.Scene();
            const renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
                antialias: true,
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            const camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                100
            );
            const controls = new OrbitControls(camera, canvasRef.current);
            controls.enableDamping = true;

            camera.position.set(0, 0, 10);
            scene.background = new THREE.Color('white');
            const light = new THREE.DirectionalLight(0xffff00, 10);
            scene.add(light);
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(6, 6, 6),
                new THREE.MeshBasicMaterial({ color: 0xff0000 })
            );
            mesh.rotation.y = 0.2;
            scene.add(mesh);

            const tick = () => {
                controls.update();
                renderer.render(scene, camera);
                window.requestAnimationFrame(tick);
            };
            tick();
        }
    }, [canvasRef]);

    return (
        <canvas ref={canvasRef} id="canvas" width="300" height="300"></canvas>
    );
};

export default ThreeJS;
