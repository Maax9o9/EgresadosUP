import React, { useState, useEffect } from "react";
import GraduateCard from "./graduateCard";

const graduates = [
  {
    name: "Carlos Mendoza López",
    career: "Ingeniería Mecatrónica",
    generation: "2018 - 2022",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    synopsis: "Egresado de ingeniería mecatrónica con especialidad en automatización industrial y robótica. Experiencia en desarrollo de sistemas embebidos y control de procesos.",
  },
  {
    name: "Mariana Torres Ramírez",
    career: "Ingeniería Biomédica",
    generation: "2019 - 2023",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    synopsis: "Profesional enfocada en el diseño y mantenimiento de equipo médico, con conocimientos en procesamiento de señales biomédicas e instrumentación clínica.",
  },
  {
    name: "Diego Hernández Cruz",
    career: "Ingeniería Mecatrónica",
    generation: "2020 - 2024",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    synopsis: "Desarrollador de proyectos de automatización y sistemas inteligentes, con interés en inteligencia artificial aplicada a la industria y visión computacional.",
  },
];

const GraduateCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === graduates.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // 8 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="relative w-full flex items-center justify-center gap-6 overflow-hidden">
        {graduates.map((g, index) => {
          // Calcular posición relativa al índice activo
          const position = (index - activeIndex + graduates.length) % graduates.length;
          
          const isCenter = position === 0;
          const isRight = position === 1;
          const isLeft = position === (graduates.length - 1);

          return (
            <div
              key={g.name}
              className={`
                transition-all duration-[2000ms]
                ${isCenter ? "scale-100 opacity-100 z-20" : "scale-95 opacity-40 blur-[1px] z-10"}
                ${isLeft ? "order-first" : ""}
                ${isRight ? "order-last" : ""}
              `}
            >
              <GraduateCard {...g} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GraduateCarousel;
