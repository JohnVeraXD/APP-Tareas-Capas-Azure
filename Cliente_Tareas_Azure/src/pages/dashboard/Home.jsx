import React from 'react'
import BarraNavegacion from '@/components/layout/BarraNavegacion'
import Footer from '@/components/layout/Footer'
import '../../styles/globals.css'
import SimpleNavbar from '@/components/layout/SimpleNavar'

export default function Home() {
  return (
    <div className="contenedor">
      <SimpleNavbar />

      <div className="bg-white contenido border border-gray-300 p-2 mt-2 ml-2 mr-2">
        <h1>Hola como estas</h1>
      </div>

      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}

