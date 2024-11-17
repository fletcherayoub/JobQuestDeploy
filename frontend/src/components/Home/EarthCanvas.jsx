import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Earth from "./Earth.jsx"

function RotatingEarth({ isMobile }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current && !isMobile) {
      const elapsedTime = clock.getElapsedTime()
      groupRef.current.rotation.y = elapsedTime * 0.1 // Rotate only on non-mobile
    }
  })

  return (
    <group ref={groupRef}>
      <Earth />
    </group>
  )
}

function EarthCanvas() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <>
      {isMobile ? (
        <img
        className="w-full h-full object-cover"
        src="/kind.png"
        alt="Earth"
        style={{ opacity: 0.4  }}
      />
      ) : (
        <Canvas camera={{ position: [0.5, 0.5, 0.5] }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <OrbitControls />
          <Suspense fallback={<span>Loading Earth...</span>}>
            <RotatingEarth isMobile={isMobile} />
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>
      )}
    </>
  )
}

export default EarthCanvas
