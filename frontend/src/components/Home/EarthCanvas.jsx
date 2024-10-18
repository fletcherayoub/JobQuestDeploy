import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Earth from "./Earth.jsx"

function RotatingEarth() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const elapsedTime = clock.getElapsedTime()
      groupRef.current.rotation.y = elapsedTime * 0.1 // Adjust rotation speed here
    }
  })

  return (
    <group ref={groupRef}>
      <Earth />
    </group>
  )
}

function EarthCanvas() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Canvas camera={{ position: [0.5, 0.5, 0.5] }}>
        <ambientLight intensity={2} />
        <OrbitControls />
        <Suspense fallback={null}>
          <RotatingEarth />
        </Suspense>
        <Environment preset='sunset' />
      </Canvas>
    </>
  )
}

export default EarthCanvas