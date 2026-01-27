import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const BackgroundCanvas = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return

    const mountNode = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountNode.appendChild(renderer.domElement)

    const count = 800
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 1) {
      positions[i] = (Math.random() - 0.5) * 20
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying float vAlpha;
      void main() {
          vec3 pos = position;
          pos.y += sin(pos.x * 0.5 + uTime * 0.5) * 0.5;
          pos.z += cos(pos.y * 0.5 + uTime * 0.5) * 0.5;
          float dist = distance(uMouse * 10.0, pos.xy);
          float interaction = smoothstep(5.0, 0.0, dist);
          pos.z += interaction * 2.0;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = 2.5 * (10.0 / -mvPosition.z);
          vAlpha = smoothstep(20.0, 0.0, -mvPosition.z) * 0.4;
      }
    `

    const fragmentShader = `
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
          if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
          gl_FragColor = vec4(uColor, vAlpha);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color('#111111') },
      },
      transparent: true,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const mouse = new THREE.Vector2()
    const clock = new THREE.Clock()

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    let animationId: number
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsedTime
      material.uniforms.uMouse.value.lerp(mouse, 0.05)
      points.rotation.y = elapsedTime * 0.05
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      id="canvas-container"
      className="fixed inset-0 z-0 opacity-60 pointer-events-none"
    />
  )
}
