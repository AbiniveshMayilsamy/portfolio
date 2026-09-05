import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import styles from './ThreeAvatar.module.css';

// Module-level persistent cache for textures to eliminate reload lag and GPU re-upload
let cachedOpenTex = null;
let cachedBlinkTex = null;
let cachedGreenTexture = null;
let cachedGreyTexture = null;
let texturesPromise = null;

/**
 * Creates or retrieves a cached seamless canvas texture for the 3D rotating text ribbons
 */
function getRollingTextTexture(variant = 'green') {
  if (variant === 'green' && cachedGreenTexture) return cachedGreenTexture;
  if (variant === 'grey' && cachedGreyTexture) return cachedGreyTexture;

  const canvas = document.createElement('canvas');
  const tempCtx = canvas.getContext('2d');
  if (!tempCtx) return null;

  const fontStr = '900 74px "Syne", "Inter", -apple-system, sans-serif';
  tempCtx.font = fontStr;

  const isGreen = variant === 'green';

  const segments = isGreen
    ? [
        { text: '✦ ABINIVESH MAYILSAMY', color: '#99ff00' },
        { text: '✦ CLOUD ARCHITECT', color: '#ffffff' },
        { text: '✦ SAA-C03 & CLF-C02', color: '#99ff00' },
        { text: '✦ SYSTEM ENGINEER', color: '#ffffff' },
      ]
    : [
        { text: '✦ LINUX ADMINISTRATION', color: '#e2e8f0' },
        { text: '✦ TERRAFORM', color: '#94a3b8' },
        { text: '✦ AWS INFRASTRUCTURE', color: '#ffffff' },
        { text: '✦ DEVOPS', color: '#94a3b8' },
      ];

  const padding = 75;
  let singleCycleWidth = 0;
  for (const seg of segments) {
    singleCycleWidth += Math.ceil(tempCtx.measureText(seg.text).width) + padding;
  }

  const repeats = 2;
  const totalWidth = Math.ceil(singleCycleWidth * repeats);

  canvas.width = totalWidth;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background ribbon
  ctx.fillStyle = isGreen ? 'rgba(6, 16, 8, 0.55)' : 'rgba(15, 20, 26, 0.55)';
  ctx.fillRect(0, 36, canvas.width, 184);

  // Top & bottom border lines
  ctx.strokeStyle = isGreen ? 'rgba(153, 255, 0, 0.7)' : 'rgba(148, 163, 184, 0.65)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 38);
  ctx.lineTo(canvas.width, 38);
  ctx.moveTo(0, 218);
  ctx.lineTo(canvas.width, 218);
  ctx.stroke();

  // Typography
  ctx.font = fontStr;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  let currentX = 0;
  for (let r = 0; r < repeats; r++) {
    for (const seg of segments) {
      ctx.shadowColor = isGreen
        ? (seg.color === '#99ff00' ? 'rgba(153, 255, 0, 0.85)' : 'rgba(255, 255, 255, 0.4)')
        : 'rgba(226, 232, 240, 0.5)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = seg.color;
      ctx.fillText(seg.text, currentX + padding / 2, 128);
      currentX += Math.ceil(ctx.measureText(seg.text).width) + padding;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  if (isGreen) {
    cachedGreenTexture = texture;
  } else {
    cachedGreyTexture = texture;
  }

  return texture;
}

/**
 * Loads and caches the transparent cutout PNG textures once in memory
 */
function loadAvatarTextures() {
  if (cachedOpenTex && cachedBlinkTex) {
    return Promise.resolve({ openTex: cachedOpenTex, blinkTex: cachedBlinkTex });
  }

  if (!texturesPromise) {
    const loader = new THREE.TextureLoader();
    texturesPromise = Promise.all([
      new Promise((resolve, reject) => {
        loader.load(
          '/avatar_open.png',
          (tex) => {
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            cachedOpenTex = tex;
            resolve(tex);
          },
          undefined,
          reject
        );
      }),
      new Promise((resolve, reject) => {
        loader.load(
          '/avatar_blink.png',
          (bTex) => {
            bTex.generateMipmaps = true;
            bTex.minFilter = THREE.LinearMipmapLinearFilter;
            cachedBlinkTex = bTex;
            resolve(bTex);
          },
          undefined,
          reject
        );
      }),
    ]).then(([openTex, blinkTex]) => ({ openTex, blinkTex }));
  }

  return texturesPromise;
}

export default function ThreeAvatar() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(Boolean(cachedOpenTex && cachedBlinkTex));
  const triggerBlinkRef = useRef(null);

  const handleClick = useCallback(() => {
    if (triggerBlinkRef.current) {
      triggerBlinkRef.current();
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let animId;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 480;

    // WebGL Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Root interactive group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Ambient & directional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const neonLight = new THREE.DirectionalLight(0x99ff00, 2.2);
    neonLight.position.set(3, 4, 3);
    scene.add(neonLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00e5ff, 1.4);
    cyanRimLight.position.set(-3, -2, 2);
    scene.add(cyanRimLight);

    // Dual Crossed 3D Rings: Green & Grey positioned near head crown (y = 1.72)
    const greenTexture = getRollingTextTexture('green');
    let greenRibbonMesh = null;

    if (greenTexture) {
      const greenCylinderGeo = new THREE.CylinderGeometry(1.36, 1.36, 0.28, 64, 1, true);
      const greenRibbonMat = new THREE.MeshStandardMaterial({
        map: greenTexture,
        transparent: true,
        opacity: 0.96,
        side: THREE.DoubleSide,
        roughness: 0.2,
        metalness: 0.3,
        emissive: new THREE.Color(0x99ff00),
        emissiveIntensity: 0.3,
        depthTest: true,
        depthWrite: false,
      });

      greenRibbonMesh = new THREE.Mesh(greenCylinderGeo, greenRibbonMat);
      greenRibbonMesh.position.set(0, 1.72, 0.05);
      greenRibbonMesh.rotation.x = 0.26;
      greenRibbonMesh.rotation.z = -0.22;
      greenRibbonMesh.renderOrder = 2;
      rootGroup.add(greenRibbonMesh);
    }

    const greyTexture = getRollingTextTexture('grey');
    let greyRibbonMesh = null;

    if (greyTexture) {
      const greyCylinderGeo = new THREE.CylinderGeometry(1.42, 1.42, 0.28, 64, 1, true);
      const greyRibbonMat = new THREE.MeshStandardMaterial({
        map: greyTexture,
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.7,
        emissive: new THREE.Color(0x94a3b8),
        emissiveIntensity: 0.2,
        depthTest: true,
        depthWrite: false,
      });

      greyRibbonMesh = new THREE.Mesh(greyCylinderGeo, greyRibbonMat);
      greyRibbonMesh.position.set(0, 1.72, 0.05);
      greyRibbonMesh.rotation.x = -0.26;
      greyRibbonMesh.rotation.z = 0.22;
      greyRibbonMesh.renderOrder = 2;
      rootGroup.add(greyRibbonMesh);
    }

    // Floating cyber particles ring around head halo
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x99ff00);
    const color2 = new THREE.Color(0x94a3b8);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.48 + (Math.random() - 0.5) * 0.4;
      const px = Math.cos(angle) * radius;
      const py = 1.72 + (Math.random() - 0.5) * 0.9;
      const pz = Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 0.4;

      particlePositions[i * 3] = px;
      particlePositions[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = pz;

      const c = Math.random() > 0.4 ? color1 : color2;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    let avatarMesh = null;

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    // Smooth Blink State
    let blinkStartTime = -10;
    let isBlinkingNow = false;
    let nextBlinkTime = 3.2;

    const clock = new THREE.Clock();
    const LOOP_DURATION = 30;

    const triggerSmoothBlink = () => {
      if (isBlinkingNow) return;
      blinkStartTime = clock.getElapsedTime();
      isBlinkingNow = true;
    };

    triggerBlinkRef.current = triggerSmoothBlink;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    const handlePointerLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // Animation Loop with delta-time smoothing to eliminate jitter
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05); // capped delta to prevent jumps
      lastTime = now;

      const elapsedTime = clock.getElapsedTime();

      // 1. Dual Text Ribbons Roll
      if (greenTexture) {
        greenTexture.offset.x = (elapsedTime / LOOP_DURATION) % 1;
      }
      if (greenRibbonMesh) {
        greenRibbonMesh.rotation.y = -(elapsedTime / LOOP_DURATION) * Math.PI * 2;
      }
      if (greyTexture) {
        greyTexture.offset.x = -(elapsedTime / 32) % 1;
      }
      if (greyRibbonMesh) {
        greyRibbonMesh.rotation.y = (elapsedTime / 32) * Math.PI * 2;
      }

      // 2. Natural gentle slow blink scheduler
      if (!isBlinkingNow && elapsedTime >= nextBlinkTime) {
        triggerSmoothBlink();
        nextBlinkTime = elapsedTime + (Math.random() * 2.2 + 3.8);
      }

      // 3. Smooth slow blink and smile animation (zero jitter, zero jerk)
      if (avatarMesh && avatarMesh.material && avatarMesh.material.uniforms) {
        const uBlinkMix = avatarMesh.material.uniforms.uBlinkMix;
        if (isBlinkingNow) {
          const dt = elapsedTime - blinkStartTime;
          const closeDuration = 0.18; // 180ms smooth closing
          const holdDuration = 0.16;  // 160ms relaxed smile hold
          const openDuration = 0.22;  // 220ms smooth opening
          const totalDuration = closeDuration + holdDuration + openDuration; // ~560ms

          if (dt < closeDuration) {
            const p = Math.max(0, Math.min(1, dt / closeDuration));
            uBlinkMix.value = 0.5 - 0.5 * Math.cos(p * Math.PI);
          } else if (dt < closeDuration + holdDuration) {
            uBlinkMix.value = 1.0;
          } else if (dt < totalDuration) {
            const p = Math.max(0, Math.min(1, (dt - closeDuration - holdDuration) / openDuration));
            uBlinkMix.value = 0.5 + 0.5 * Math.cos(p * Math.PI);
          } else {
            uBlinkMix.value = 0.0;
            isBlinkingNow = false;
          }
        } else {
          uBlinkMix.value = 0.0;
        }
      }

      // 4. 3D Tilt with frame-rate independent exponential smoothing (zero jitter)
      targetRotY = mouseX * 0.28;
      targetRotX = -mouseY * 0.2;
      const damp = 1.0 - Math.exp(-8.0 * delta);

      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * damp;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * damp;

      // 5. Natural breathing & gentle floating idle motion
      const breathing = Math.sin(elapsedTime * 1.6) * 0.035;
      const sway = Math.cos(elapsedTime * 1.1) * 0.018;

      rootGroup.position.y = breathing;
      rootGroup.position.x = sway;

      // 6. Particles slow orbit
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    // Load textures using memory cache, construct avatarMesh, pre-compile WebGL shaders, then start
    loadAvatarTextures().then(({ openTex, blinkTex }) => {
      if (!isMounted) return;

      const planeGeo = new THREE.PlaneGeometry(4.35, 5.82);

      const avatarMat = new THREE.ShaderMaterial({
        uniforms: {
          uOpenTex: { value: openTex },
          uBlinkTex: { value: blinkTex },
          uBlinkMix: { value: 0.0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uOpenTex;
          uniform sampler2D uBlinkTex;
          uniform float uBlinkMix;
          varying vec2 vUv;

          void main() {
            vec4 colOpen = texture2D(uOpenTex, vUv);
            vec4 colBlink = texture2D(uBlinkTex, vUv);
            
            // Smooth crossfade blend between open eyes and serene smiling blink
            vec4 baseColor = mix(colOpen, colBlink, uBlinkMix);
            
            // Discard transparent background pixels so edges of image are completely invisible
            if (baseColor.a < 0.05) discard;

            gl_FragColor = baseColor;
          }
        `,
        transparent: true,
        depthTest: true,
        depthWrite: true,
      });

      avatarMesh = new THREE.Mesh(planeGeo, avatarMat);
      avatarMesh.position.set(0, -0.38, 0);
      avatarMesh.renderOrder = 1;
      rootGroup.add(avatarMesh);

      // Pre-compile shaders and upload GPU buffers ahead of time to eliminate initial stutter/jitter
      renderer.compile(scene, camera);
      renderer.render(scene, camera);

      setIsLoaded(true);
      animate();
    });

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW && newH) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.clear();
      // Keep cached textures in memory for instant reuse on remount
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.threeAvatarContainer}
      onClick={handleClick}
      title="Interactive 3D Avatar — Move cursor to tilt, click to interact!"
      role="region"
      aria-label="Interactive 3D Toon Avatar of Abinivesh"
    >
      {/* Loading placeholder while Three.js initializes */}
      {!isLoaded && (
        <div className={styles.avatarSkeleton}>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  );
}
