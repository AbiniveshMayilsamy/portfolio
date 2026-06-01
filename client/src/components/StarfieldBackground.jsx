import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

let scrollY = 0, mouseX = 0, mouseY = 0
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => { scrollY = window.scrollY }, { passive: true })
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1
  })
}

function MovingCube() {
  const outer = useRef()
  const inner = useRef()
  const wire1 = useRef()
  const wire2 = useRef()
  const glow  = useRef()

  useFrame((s) => {
    const t = s.clock.elapsedTime
    const sr = scrollY * 0.002
    if (outer.current) { outer.current.rotation.x = t * 0.18 + sr; outer.current.rotation.y = t * 0.24 + sr * 1.2; outer.current.rotation.z = t * 0.1 }
    if (inner.current) { inner.current.rotation.x = -t * 0.22 + sr * 0.8; inner.current.rotation.y = -t * 0.3 + sr; inner.current.rotation.z = t * 0.14 }
    if (wire1.current) { wire1.current.rotation.x = t * 0.14; wire1.current.rotation.y = t * 0.2 + sr * 1.5; wire1.current.rotation.z = -t * 0.08 }
    if (wire2.current) { wire2.current.rotation.x = -t * 0.1; wire2.current.rotation.y = -t * 0.16 + sr; wire2.current.rotation.z = t * 0.12 }
    if (glow.current) { glow.current.rotation.x = t * 0.08; glow.current.rotation.y = t * 0.12; glow.current.material.opacity = 0.04 + Math.sin(t * 0.8) * 0.02 }
  })

  return (
    <group>
      <mesh ref={glow} scale={2.2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <mesh ref={outer} scale={1.6}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#001a0d" emissive="#00ff88" emissiveIntensity={0.08} roughness={0.05} metalness={0.1} transmission={0.85} thickness={0.5} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={wire1} scale={1.62}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner} scale={0.9}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#001a0d" emissive="#00cc6a" emissiveIntensity={0.1} roughness={0.05} metalness={0.1} transmission={0.9} thickness={0.3} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={wire2} scale={0.92}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#00cc6a" wireframe transparent opacity={0.4} />
      </mesh>
      {[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]].map((p, i) => (
        <CornerDot key={i} position={p.map(v => v * 0.82)} color={i % 2 === 0 ? '#00ff88' : '#00cc6a'} index={i} />
      ))}
    </group>
  )
}

function CornerDot({ position, color, index }) {
  const ref = useRef()
  useFrame((s) => { if (ref.current) ref.current.material.opacity = 0.5 + Math.sin(s.clock.elapsedTime * 1.2 + index * 0.8) * 0.3 })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  )
}

function FloatingCubes() {
  const cubes = useMemo(() => [
    { pos: [-4.5, 2, -6],  scale: 0.35, speed: 0.5,  color: '#00ff88' },
    { pos: [4.5, -2, -7],  scale: 0.28, speed: 0.7,  color: '#00cc6a' },
    { pos: [-3, -3.5, -5], scale: 0.22, speed: 0.9,  color: '#00ff88' },
    { pos: [3.5, 3, -8],   scale: 0.4,  speed: 0.4,  color: '#00cc6a' },
    { pos: [0, -4, -6],    scale: 0.18, speed: 1.1,  color: '#00ff88' },
    { pos: [-5, -1, -8],   scale: 0.3,  speed: 0.6,  color: '#00cc6a' },
    { pos: [5, 1.5, -9],   scale: 0.25, speed: 0.8,  color: '#00ff88' },
  ], [])
  const refs = useRef([])
  useFrame((s) => {
    refs.current.forEach((r, i) => {
      if (!r) return
      r.rotation.x = s.clock.elapsedTime * cubes[i].speed * 0.6
      r.rotation.y = s.clock.elapsedTime * cubes[i].speed * 0.8
      r.position.y = cubes[i].pos[1] + Math.sin(s.clock.elapsedTime * cubes[i].speed * 0.4) * 0.4
    })
  })
  return (
    <>
      {cubes.map((c, i) => (
        <mesh key={i} ref={el => refs.current[i] = el} position={c.pos} scale={c.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={c.color} wireframe transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  )
}

function GradientBlobs() {
  const blobs = [
    { pos: [-2, 1, -5],  color: '#00ff88', scale: [5, 4, 1] },
    { pos: [2, -1, -6],  color: '#00cc6a', scale: [6, 4, 1] },
    { pos: [0, 2, -7],   color: '#00ff88', scale: [4, 3, 1] },
  ]
  const refs = useRef([])
  useFrame((s) => {
    refs.current.forEach((r, i) => { if (r) r.material.opacity = 0.06 + Math.sin(s.clock.elapsedTime * 0.4 + i * 1.5) * 0.03 })
  })
  return (
    <>
      {blobs.map((b, i) => (
        <mesh key={i} ref={el => refs.current[i] = el} position={b.pos} scale={b.scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={b.color} transparent opacity={0.07} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  )
}

function Scene() {
  const group = useRef()
  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouseX * 0.12, 0.03)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouseY * 0.07, 0.03)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -scrollY * 0.001, 0.06)
  })
  return (
    <group ref={group}>
      <Stars radius={140} depth={60} count={3500} factor={3} saturation={0.2} fade speed={0.6} />
      <GradientBlobs />
      <FloatingCubes />
      <MovingCube />
    </group>
  )
}

export default function StarfieldBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.15} />
        <pointLight position={[4, 4, 3]} intensity={1.5} color="#00ff88" />
        <pointLight position={[-4, -3, 2]} intensity={0.9} color="#00cc6a" />
        <pointLight position={[0, 4, -2]} intensity={0.7} color="#00ff88" />
        <Scene />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.85} height={400} opacity={1.6} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0006, 0.0006]} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
