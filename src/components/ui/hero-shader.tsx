"use client"

import type React from "react"

import { useEffect, useRef, useState, useMemo } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

// Extender las definiciones de tipo de Navigator para las APIs experimentales
declare global {
  interface Navigator {
    deviceMemory?: number
    connection?: {
      effectiveType?: '4g' | '3g' | '2g' | 'slow-2g'
    }
  }
}

// Detectar si el dispositivo puede manejar shaders WebGL
function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    supportsWebGL: true,
    reducedMotion: false,
    lowEndDevice: false
  })

  useEffect(() => {
    // Detectar prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reducedMotion = mediaQuery.matches

    // Detectar soporte WebGL
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')
    const supportsWebGL = !!gl

    // Detectar dispositivos de bajo rendimiento
    const lowEndDevice =
      // Menos de 4GB de RAM (si está disponible)
      (navigator.deviceMemory !== undefined && navigator.deviceMemory < 4) ||
      // Menos de 4 cores lógicos
      (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4) ||
      // Conexión lenta
      (navigator.connection !== undefined && (navigator.connection.effectiveType === 'slow-2g' ||
                                 navigator.connection.effectiveType === '2g' ||
                                 navigator.connection.effectiveType === '3g'))

    setCapabilities({
      supportsWebGL,
      reducedMotion,
      lowEndDevice
    })

    // Limpiar canvas
    if (gl && gl instanceof WebGLRenderingContext) {
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return capabilities
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { supportsWebGL, reducedMotion, lowEndDevice } = useDeviceCapabilities()

  // Determinar si se debe usar el shader o el fallback
  const useShader = useMemo(() => {
    return supportsWebGL && !reducedMotion && !lowEndDevice
  }, [supportsWebGL, reducedMotion, lowEndDevice])

  return (
    <div ref={containerRef} className="min-h-screen w-full relative overflow-hidden flex flex-col">
      {/* SVG Filters - Solo si se usan shaders */}
      {useShader && (
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0.02
                        0 1 0 0 0.02
                        0 0 1 0 0.05
                        0 0 0 0.9 0"
                result="tint"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* Background - Shader o Fallback CSS */}
      {useShader ? (
        // Un solo MeshGradient optimizado para mejor rendimiento
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#0f172a", "#3b82f6", "#8b5cf6", "#1e1b4b", "#1e293b"]}
          speed={0.2}
        />
      ) : (
        // Fallback con gradiente CSS estático (mucho más eficiente)
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
          style={{
            backgroundImage: `
              radial-gradient(at 27% 37%, rgb(15, 23, 42) 0px, transparent 50%),
              radial-gradient(at 97% 21%, rgb(59, 130, 246) 0px, transparent 50%),
              radial-gradient(at 52% 99%, rgb(139, 92, 246) 0px, transparent 50%),
              radial-gradient(at 10% 29%, rgb(30, 27, 75) 0px, transparent 50%),
              radial-gradient(at 97% 96%, rgb(30, 41, 59) 0px, transparent 50%)
            `
          }}
        />
      )}

      {children}
    </div>
  )
}
