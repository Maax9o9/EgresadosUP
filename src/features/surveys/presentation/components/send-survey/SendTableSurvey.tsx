// ============================================
// COMPONENT - Send Survey Table
// ============================================

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Cohort {
  id: string;
  name: string;
  year: string;
}

interface AcademicProgram {
  id: string;
  name: string;
  cohorts: Cohort[];
}

const mockPrograms: AcademicProgram[] = [
  {
    id: "1",
    name: "Ingeniería en Alimentos",
    cohorts: [
      { id: "1-1", name: "Generación 2020", year: "2020" },
      { id: "1-2", name: "Generación 2021", year: "2021" },
      { id: "1-3", name: "Generación 2022", year: "2022" },
      { id: "1-4", name: "Generación 2023", year: "2023" },
    ],
  },
  {
    id: "2",
    name: "Ingeniería en Energía y Desarrollo Sostenible",
    cohorts: [
      { id: "2-1", name: "Generación 2020", year: "2020" },
      { id: "2-2", name: "Generación 2021", year: "2021" },
      { id: "2-3", name: "Generación 2022", year: "2022" },
    ],
  },
  {
    id: "3",
    name: "Ingeniería Mecatronica",
    cohorts: [
      { id: "3-1", name: "Generación 2019", year: "2019" },
      { id: "3-2", name: "Generación 2020", year: "2020" },
      { id: "3-3", name: "Generación 2021", year: "2021" },
      { id: "3-4", name: "Generación 2022", year: "2022" },
      { id: "3-5", name: "Generación 2023", year: "2023" },
    ],
  },
  {
    id: "4",
    name: "Ingeniería en Sistemas Computacionales",
    cohorts: [
      { id: "4-1", name: "Generación 2020", year: "2020" },
      { id: "4-2", name: "Generación 2021", year: "2021" },
      { id: "4-3", name: "Generación 2022", year: "2022" },
    ],
  },
];

export const SendTableSurvey = () => {
  const [selectedCohorts, setSelectedCohorts] = useState<Set<string>>(new Set());
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Total de cohortes
  const totalCohorts = mockPrograms.reduce((sum, program) => sum + program.cohorts.length, 0);

  // Toggle expansión de programa
  const handleToggleExpand = (programId: string) => {
    const newExpanded = new Set(expandedPrograms);
    if (newExpanded.has(programId)) {
      newExpanded.delete(programId);
    } else {
      newExpanded.add(programId);
    }
    setExpandedPrograms(newExpanded);
  };

  // Toggle selección de cohorte individual
  const handleToggleCohort = (cohortId: string) => {
    const newSelected = new Set(selectedCohorts);
    if (newSelected.has(cohortId)) {
      newSelected.delete(cohortId);
    } else {
      newSelected.add(cohortId);
    }
    setSelectedCohorts(newSelected);
    setSelectAll(newSelected.size === totalCohorts);
  };

  // Toggle selección de programa completo
  const handleToggleProgram = (program: AcademicProgram) => {
    const newSelected = new Set(selectedCohorts);
    const programCohortIds = program.cohorts.map((c) => c.id);
    const allProgramCohortsSelected = programCohortIds.every((id) => newSelected.has(id));

    if (allProgramCohortsSelected) {
      // Deseleccionar todos los cohortes del programa
      programCohortIds.forEach((id) => newSelected.delete(id));
    } else {
      // Seleccionar todos los cohortes del programa
      programCohortIds.forEach((id) => newSelected.add(id));
    }

    setSelectedCohorts(newSelected);
    setSelectAll(newSelected.size === totalCohorts);
  };

  // Toggle seleccionar todos
  const handleToggleAll = () => {
    if (selectAll) {
      setSelectedCohorts(new Set());
      setSelectAll(false);
    } else {
      const allCohortIds = mockPrograms.flatMap((program) => program.cohorts.map((c) => c.id));
      setSelectedCohorts(new Set(allCohortIds));
      setSelectAll(true);
    }
  };

  // Verificar si un programa tiene todos sus cohortes seleccionados
  const isProgramFullySelected = (program: AcademicProgram) => {
    return program.cohorts.every((cohort) => selectedCohorts.has(cohort.id));
  };

  // Verificar si un programa tiene algunos cohortes seleccionados (indeterminado)
  const isProgramPartiallySelected = (program: AcademicProgram) => {
    const selectedCount = program.cohorts.filter((cohort) => selectedCohorts.has(cohort.id)).length;
    return selectedCount > 0 && selectedCount < program.cohorts.length;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header de la tabla */}
      <div className="bg-white border-b border-gray-200 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Programas académicos
          </h2>
          <div className="inline-flex items-center justify-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
            <span className="text-sm font-medium text-[#8DD2FF]">
              {selectedCohorts.size}/{totalCohorts} cohortes seleccionados
            </span>
          </div>
        </div>
      </div>

      {/* Tabla de programas */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Checkbox "Seleccionar todos" */}
          <div className="bg-white border-b border-gray-200 flex items-center py-3 px-6 gap-3">
            <div
              onClick={handleToggleAll}
              className={`h-5 w-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                selectAll
                  ? "bg-[#8DD2FF] border-[#8DD2FF]"
                  : "border-gray-300 hover:border-[#8DD2FF]"
              }`}
            >
              {selectAll && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase">
              Seleccionar todos
            </span>
          </div>

          {/* Lista de programas y cohortes */}
          <div className="max-h-[500px] overflow-y-auto">
            {mockPrograms.map((program, programIndex) => (
              <div key={program.id}>
                {/* Fila del Programa */}
                <div
                  className={`flex items-center py-4 px-6 gap-3 border-b border-gray-200 transition-colors duration-200 ${
                    isProgramFullySelected(program)
                      ? "bg-[#8DD2FF]/10"
                      : programIndex % 2 === 0
                      ? "bg-gray-50"
                      : "bg-white"
                  } hover:bg-[#8DD2FF]/10`}
                >
                  {/* Icono de expandir/colapsar */}
                  <button
                    onClick={() => handleToggleExpand(program.id)}
                    className="text-gray-500 hover:text-[#8DD2FF] transition-colors p-1"
                  >
                    {expandedPrograms.has(program.id) ? (
                      <ChevronDownIcon className="w-5 h-5" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5" />
                    )}
                  </button>

                  {/* Checkbox del programa */}
                  <div
                    onClick={() => handleToggleProgram(program)}
                    className={`h-5 w-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center shrink-0 ${
                      isProgramFullySelected(program)
                        ? "bg-[#8DD2FF] border-[#8DD2FF]"
                        : isProgramPartiallySelected(program)
                        ? "bg-[#8DD2FF]/30 border-[#8DD2FF]"
                        : "border-gray-300 hover:border-[#8DD2FF]"
                    }`}
                  >
                    {isProgramFullySelected(program) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                    {isProgramPartiallySelected(program) && (
                      <div className="w-2 h-2 bg-[#8DD2FF] rounded-sm"></div>
                    )}
                  </div>

                  {/* Nombre del programa */}
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-700">
                      {program.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {program.cohorts.length} cohortes
                    </span>
                  </div>
                </div>

                {/* Cohortes (expandibles) */}
                {expandedPrograms.has(program.id) && (
                  <div className="bg-gray-50/50">
                    {program.cohorts.map((cohort) => (
                      <div
                        key={cohort.id}
                        className={`flex items-center py-3 px-6 pl-20 gap-3 border-b border-gray-200 transition-colors duration-200 ${
                          selectedCohorts.has(cohort.id)
                            ? "bg-[#8DD2FF]/5"
                            : "bg-white hover:bg-[#8DD2FF]/5"
                        }`}
                      >
                        {/* Checkbox del cohorte */}
                        <div
                          onClick={() => handleToggleCohort(cohort.id)}
                          className={`h-5 w-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center shrink-0 ${
                            selectedCohorts.has(cohort.id)
                              ? "bg-[#8DD2FF] border-[#8DD2FF]"
                              : "border-gray-300 hover:border-[#8DD2FF]"
                          }`}
                        >
                          {selectedCohorts.has(cohort.id) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>

                        {/* Nombre del cohorte */}
                        <span className="text-sm text-gray-600">
                          {cohort.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
