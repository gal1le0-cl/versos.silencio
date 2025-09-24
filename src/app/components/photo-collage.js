"use client"

import { useState, useRef, useEffect } from "react"
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'

// Custom Button component to replace the imported one
const Button = ({ variant, size, onClick, className, children }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors"
  const variantClasses = {
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-800",
    ghost: "hover:bg-gray-100 text-gray-800",
  }
  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
  }

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant] || ''} ${sizeClasses[size] || ''} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// Custom Icon components to replace the imported ones
const ZoomIn = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
)

const ZoomOut = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
)

const RotateCcw = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 2v6h6"></path>
    <path d="M3 8c3.314-3.314 8.686-3.314 12 0s3.314 8.686 0 12-8.686 3.314-12 0"></path>
  </svg>
)

const X = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const ChevronLeft = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15,18 9,12 15,6"></polyline>
  </svg>
)

const ChevronRight = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
)

export default function PhotoCollage() {
  const [openedPhoto, setOpenedPhoto] = useState(null)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalTouchStart, setModalTouchStart] = useState(null)
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/photos")
        const data = await res.json()
        
        // Check if the response is successful and data is an array
        if (res.ok && Array.isArray(data)) {
          const locations = [
            "proximamente...",
          ]

          // Enhance the API data with display properties
          const enhancedPhotos = data.map((photo, index) => {
            const location = locations[index % locations.length]
            const orientation = index % 3 === 0 ? "vertical" : "horizontal"

            let size
            if (orientation === "horizontal") {
              if (index % 8 === 0) size = "wide"
              else if (index % 4 === 0) size = "large"
              else if (index % 3 === 0) size = "medium"
              else size = "small"
            } else {
              if (index % 3 === 0) size = "large"
              else if (index % 2 === 0) size = "medium"
              else size = "small"
            }

            return {
              ...photo,
              location,
              orientation,
              size,
            }
          })

          setPhotos(enhancedPhotos)
          setError(null)
        } else {
          // Handle API error response
          setError(data.error || "Error loading photos")
          setPhotos([])
        }
      } catch (error) {
        console.error("❌ Error cargando fotos:", error)
        setError("Network error loading photos")
        setPhotos([])
      } finally {
        setLoading(false)
      }
    }
    fetchPhotos()
  }, [])


  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      setIsPanning(true)
      setPanStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y })
    }
  }

  const handleTouchMove = (e) => {
    if (!isPanning || e.touches.length !== 1) return
    e.preventDefault()
    const touch = e.touches[0]
    setPanOffset({
      x: touch.clientX - panStart.x,
      y: touch.clientY - panStart.y,
    })
  }

  const handleTouchEnd = () => {
    setIsPanning(false)
  }

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget || e.target.closest(".photo-item")) return
    setIsPanning(true)
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
  }

  const handleMouseMove = (e) => {
    if (!isPanning) return
    setPanOffset({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom((prev) => Math.max(0.5, Math.min(3, prev * delta)))
  }

  const resetView = () => {
    setPanOffset({ x: 0, y: 0 })
    setZoom(1)
  }

  const handlePhotoClick = (photo) => {
    setOpenedPhoto(photo)
  }

  const closeModal = () => {
    setOpenedPhoto(null)
  }

  const goToPrevious = () => {
    if (!openedPhoto || photos.length === 0) return
    const currentIndex = photos.findIndex(p => p.id === openedPhoto.id)
    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
    setOpenedPhoto(photos[prevIndex])
  }

  const goToNext = () => {
    if (!openedPhoto || photos.length === 0) return
    const currentIndex = photos.findIndex(p => p.id === openedPhoto.id)
    const nextIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1
    setOpenedPhoto(photos[nextIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && openedPhoto) {
        closeModal()
      }
      
      if (openedPhoto) {
        // Navegación en modal
        const currentIndex = photos.findIndex(p => p.id === openedPhoto.id)
        switch (e.key) {
          case "ArrowLeft":
            const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
            setOpenedPhoto(photos[prevIndex])
            break
          case "ArrowRight":
            const nextIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1
            setOpenedPhoto(photos[nextIndex])
            break
        }
      } else {
        // Navegación en collage
        const moveDistance = 50
        switch (e.key) {
          case "ArrowUp":
            setPanOffset((prev) => ({ ...prev, y: prev.y + moveDistance }))
            break
          case "ArrowDown":
            setPanOffset((prev) => ({ ...prev, y: prev.y - moveDistance }))
            break
          case "ArrowLeft":
            setPanOffset((prev) => ({ ...prev, x: prev.x + moveDistance }))
            break
          case "ArrowRight":
            setPanOffset((prev) => ({ ...prev, x: prev.x - moveDistance }))
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [openedPhoto, photos])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-stone-50">
        <div className="text-xl text-stone-600">Cargando imágenes...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-stone-50">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    )
  }

  console.log(`📸 Cargadas ${photos.length} fotos en el collage`)

  return (
    <div className="w-full h-screen bg-stone-50 overflow-hidden relative">
      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 flex gap-1 md:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((prev) => Math.min(3, prev * 1.2))}
          className="bg-white/90 backdrop-blur-sm text-xs md:text-sm p-2 md:p-3"
        >
          <ZoomIn className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((prev) => Math.max(0.5, prev * 0.8))}
          className="bg-white/90 backdrop-blur-sm text-xs md:text-sm p-2 md:p-3"
        >
          <ZoomOut className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="bg-white/90 backdrop-blur-sm text-xs md:text-sm p-2 md:p-3"
        >
          <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </div>

      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-2 md:p-3 text-xs md:text-sm text-stone-600 max-w-[200px] md:max-w-none">
        <div className="mb-1 font-medium">{photos.length} fotografías</div>
        <div className="hidden md:block">Arrastra para mover • Rueda para zoom • Flechas para navegar</div>
        <div className="md:hidden">Arrastra para mover</div>
      </div>

      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-x touch-pan-y"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div
          ref={canvasRef}
          className="p-4 md:p-8 relative"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: isPanning ? "none" : "transform 0.2s ease-out",
            width: "150vw",
            height: "120vh",
          }}
        >
          <div
            className="relative"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {photos.map((photo, index) => {
              // Calcular posición en grid con variaciones
              const cols = 8 // Número de columnas
              const row = Math.floor(index / cols)
              const col = index % cols
              
              // Posición base en grid
              const baseX = (col + 0.5) * (100 / cols) // Centrar cada celda
              const baseY = (row + 0.5) * 15 // 15% de altura por fila
              
              // Pequeñas variaciones aleatorias para que no se vea rígido
              const seedX = (index * 123456) % 1000000
              const seedY = (index * 789012) % 1000000
              const seedRot = (index * 345678) % 1000000
              const seedSize = (index * 901234) % 1000000
              
              const offsetX = ((seedX / 1000000) - 0.5) * 3 // ±1.5% de variación
              const offsetY = ((seedY / 1000000) - 0.5) * 2 // ±1% de variación
              
              const x = baseX + offsetX
              const y = baseY + offsetY
              
              // Rotación muy sutil para mantener naturalidad
              const rotation = ((seedRot / 1000000) - 0.5) * 8 // -4° a +4°
              
              // Tamaños más uniformes para evitar superposiciones
              const sizeVariant = seedSize / 1000000
              let maxWidth = 140
              if (sizeVariant < 0.15) maxWidth = 180 // 15% fotos un poco más grandes
              else if (sizeVariant < 0.85) maxWidth = 150 // 70% fotos estándar
              // 15% fotos un poco más pequeñas (140px)

              return (
                <div
                  key={photo.id}
                  className="photo-item group cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg hover:z-20 absolute"
                  onClick={() => handlePhotoClick(photo)}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `rotate(${rotation}deg) translate(-50%, -50%)`,
                    transformOrigin: 'center center',
                    zIndex: 1
                  }}
                >
                  <div
                    className="relative bg-white rounded-lg overflow-hidden shadow-md border border-stone-300/50 inline-block"
                    style={{ 
                      borderRadius: "8px",
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                    }}
                  >
                    <CldImage
  src={photo.publicId}
  alt={photo.alt}
  className="block transition-all duration-300 group-hover:brightness-110"
  draggable={false}
  width={maxWidth}
  height={maxWidth}
  sizes="(max-width: 768px) 100vw, 33vw"
  style={{
    objectFit: 'contain',
    width: 'auto',
    height: 'auto',
    maxWidth: `${maxWidth}px`,
    display: 'block'
  }}
/>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-medium bg-black/60 px-2 py-1 rounded-full">
                        Ver imagen
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {openedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
          onTouchStart={(e) => {
            const touch = e.touches[0]
            setModalTouchStart({ x: touch.clientX, y: touch.clientY })
          }}
          onTouchEnd={(e) => {
            if (!modalTouchStart) return
            const touch = e.changedTouches[0]
            const deltaX = touch.clientX - modalTouchStart.x
            const deltaY = Math.abs(touch.clientY - modalTouchStart.y)
            
            // Solo procesar swipes horizontales (no verticales)
            if (Math.abs(deltaX) > 50 && deltaY < 100) {
              if (deltaX > 0) {
                goToPrevious() // Swipe right = foto anterior
              } else {
                goToNext() // Swipe left = foto siguiente
              }
            }
            setModalTouchStart(null)
          }}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] md:max-w-5xl md:max-h-[90vh]">
            {/* Botón cerrar */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeModal}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-8 h-8 md:w-10 md:h-10 p-0"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            {/* Botón anterior */}
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-10 h-10 md:w-12 md:h-12 p-0"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>

            {/* Botón siguiente */}
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-10 h-10 md:w-12 md:h-12 p-0"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>

            <div className="relative">
              <CldImage
                src={openedPhoto.publicId}
                alt={openedPhoto.alt}
                className="max-w-full max-h-[85vh] md:max-h-[80vh] object-contain rounded-lg"
                width={800}
                height={600}
                sizes="100vw"
                style={{ borderRadius: "8px", width: 'auto', height: 'auto' }}
              />

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xs px-3 py-2 md:px-4 md:py-3 flex justify-between items-center shadow-2xl">
                  <p className="text-white text-sm md:text-base font-medium drop-shadow-sm">{openedPhoto.location}</p>
                  <span className="text-white/80 text-xs md:text-sm drop-shadow-sm">
                    {photos.findIndex(p => p.id === openedPhoto.id) + 1} / {photos.length}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
