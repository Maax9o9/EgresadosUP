import React from "react";

interface HeaderProps {
  logoSrc: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
  return (
    <header className="w-full font-sans">
      
      {/* --- BARRA SUPERIOR (Azul Rey) --- */}
      <div className="bg-[#1C2D8C] text-white">
        <div className="w-full flex items-center justify-between px-6 py-4">
          
          {/* Logo y Texto de la Universidad */}
          <div className="flex items-center gap-3 ml-8">
            <img
              src="/UPL2.png"
              alt="Logo UP"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Navegación Superior y Botón Platinum */}
          <div className="flex items-center gap-6 text-base font-normal mr-[30px]">
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-gray-200 transition">Transparencia</a>
              <a href="#" className="hover:text-gray-200 transition">Contraloría Social</a>
              <a href="#" className="hover:text-gray-200 transition">Estudiantes</a>
              <a href="#" className="hover:text-gray-200 transition">Egresados</a>
              <a href="#" className="hover:text-gray-200 transition">Docentes</a>
            </nav>

            {/* Botón Platinum (Degradado cian/azul) */}
            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-5 py-1 rounded-full font-bold shadow-lg hover:brightness-110 transition uppercase tracking-wide text-sm">
              PLATINUM
            </button>
          </div>

        </div>
      </div>

      {/* --- BARRA INFERIOR (Azul Oscuro / Negro) --- */}
      <div className="bg-[#010440] text-white border-t border-blue-900/30">
        <div className="w-full flex items-center justify-end px-12 py-5 pr-[30px]">
          
          <nav className="flex items-center gap-12">
            {/* Links principales (Mayúsculas y Negritas) */}
            <div className="flex gap-12 text-lg font-bold uppercase tracking-wide">
              <a href="#" className="hover:text-cyan-400 transition">Nosotros</a>
              <a href="#" className="hover:text-cyan-400 transition">Oferta Educativa</a>
              <a href="#" className="hover:text-cyan-400 transition">Vinculación</a>
              <a href="#" className="hover:text-cyan-400 transition">Investigación</a>
            </div>

            {/* Selector de Idioma */}
            <div className="flex items-center gap-1 ml-8 text-base font-medium border-l border-gray-600 pl-4">
              <span className="cursor-pointer hover:text-cyan-400">EN</span>
              <span>|</span>
              <span className="cursor-pointer hover:text-cyan-400">ES</span>
            </div>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;