import { useEffect, useState } from 'react'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [esMovil, setEsMovil] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const actualizarVista = () => {
      setEsMovil(mediaQuery.matches)
      if (!mediaQuery.matches) setMenuAbierto(false)
    }

    mediaQuery.addEventListener('change', actualizarVista)
    return () => mediaQuery.removeEventListener('change', actualizarVista)
  }, [])

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <nav aria-label="Navegación principal">
      <a href="#inicio" onClick={cerrarMenu}>Mi sitio</a>

      <button
        type="button"
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuAbierto}
        aria-controls="menu-principal"
        hidden={!esMovil}
        onClick={() => setMenuAbierto((abierto) => !abierto)}
      >
        {menuAbierto ? '×' : '☰'}
      </button>

      <ul id="menu-principal" hidden={esMovil && !menuAbierto}>
        <li><a href="#inicio" onClick={cerrarMenu}>Inicio</a></li>
        <li><a href="#productos" onClick={cerrarMenu}>Productos</a></li>
        <li><a href="#contacto" onClick={cerrarMenu}>Contacto</a></li>
      </ul>
    </nav>
  )
}

export default Navbar