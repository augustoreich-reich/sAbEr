import React, { useState } from 'react';
import { AreaConfig, AREAS_DATA, AreaId } from '../data/saberData';
import {
  AlertOctagon,
  CheckCircle2,
  Lightbulb,
  Target,
  ChevronDown,
  ChevronUp,
  Sliders,
  RotateCcw,
  Sparkles,
  BookOpenCheck,
} from 'lucide-react';

interface ImprovementPlanProps {
  area: AreaConfig;
  onSelectArea: (area: AreaId) => void;
}

export const ImprovementPlan: React.FC<ImprovementPlanProps> = ({
  area,
  onSelectArea,
}) => {
  const [filterPriority, setFilterPriority] = useState<'all' | 'critica' | 'fortaleza'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(
    area.learnings[0]?.id ?? null
  );

  // Interactive 2027 Goal Simulator state (initialized to 2026-3 real values)
  const [simScores, setSimScores] = useState<Record<Exclude<AreaId, 'global'>, number>>({
    lectura: 54,
    matematicas: 49,
    sociales: 52,
    naturales: 52,
    ingles: 54,
  });

  // Official ICFES Global Score weighting formula:
  //Lectura(3), Matematicas(3), Sociales(3), Naturales(3), Ingles(1) -> Sum of weights = 13, multiplied by 5
  const calculateSimulatedGlobal = () => {
    const weightedSum =
      simScores.lectura * 3 +
      simScores.matematicas * 3 +
      simScores.sociales * 3 +
      simScores.naturales * 3 +
      simScores.ingles * 1;
    return Math.round((weightedSum / 13) * 5);
  };

  const simGlobal = calculateSimulatedGlobal();
  const baseGlobal2026 = 259;
  const globalGain = simGlobal - baseGlobal2026;

  const resetSim = () => {
    setSimScores({
      lectura: 54,
      matematicas: 49,
      sociales: 52,
      naturales: 52,
      ingles: 54,
    });
  };

  const filteredLearnings = area.learnings.filter((item) => {
    if (filterPriority === 'all') return true;
    if (filterPriority === 'critica') return item.prioridad === 'critica' || item.prioridad === 'moderada';
    return item.prioridad === 'fortaleza';
  });

  const getIcfesSemaphore = (errorPct: number) => {
    if (errorPct >= 60) {
      return {
        label: 'Urgente intervenir',
        bg: 'bg-red-600 text-white',
        softBg: 'bg-red-50 border-red-200',
        textColor: 'text-red-800',
      };
    }
    if (errorPct >= 45) {
      return {
        label: 'Riesgo Naranja ICFES',
        bg: 'bg-orange-500 text-white',
        softBg: 'bg-orange-50/70 border-orange-200',
        textColor: 'text-orange-900',
      };
    }
    return {
      label: 'Fortaleza Amarilla/Verde',
      bg: 'bg-emerald-700 text-white',
      softBg: 'bg-emerald-50/70 border-emerald-200',
      textColor: 'text-emerald-900',
    };
  };

  return (
    <div className="space-y-4">
      {/* Executive Diagnostic Card: Fortalezas vs Qué Mejorar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Diagnóstico Pedagógico: {area.name}
            </h3>
            <p className="text-xs text-slate-500">
              Explicación clara en lenguaje docente sin tecnicismos complejos
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70 mb-4">
          {area.friendlySummary}
        </p>

        <div className="grid grid-cols-1 gap-3">
          {/* Alertas Críticas (Qué Mejorar) */}
          <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200/80">
            <div className="flex items-center gap-2 text-xs font-extrabold text-red-900 mb-2">
              <AlertOctagon className="w-4 h-4 text-red-600 shrink-0" />
              <span>¿QUÉ TENEMOS QUE MEJORAR CON URGENCIA?</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-800">
              {area.generalDiagnosis.alertasCriticas.map((alerta, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-snug">
                  <span className="font-mono-num font-bold text-red-700 shrink-0">
                    0{idx + 1}.
                  </span>
                  <span>{alerta}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fortalezas */}
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
            <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>LOGROS Y FORTALEZAS A RECONOCER</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-800">
              {area.generalDiagnosis.fortalezas.map((fort, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-snug">
                  <span className="font-mono-num font-bold text-emerald-700 shrink-0">
                    0{idx + 1}.
                  </span>
                  <span>{fort}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* If Global is selected, let teacher jump directly to any of the 5 areas' detailed learnings */}
      {area.id === 'global' && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Plan de Acción Institucional 2026–2027
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Ruta estratégica basada en los 4 reportes oficiales del ICFES
          </p>

          <div className="space-y-3 mb-4">
            {area.generalDiagnosis.planDeAccion.map((plan, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90"
              >
                <p className="text-xs font-extrabold text-emerald-950 mb-1.5">
                  {plan.titulo}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 mb-2">
                  {plan.pasos.map((paso, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{paso}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg">
                  Impacto esperado: {plan.impactoEsperado}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs font-bold text-slate-800 mb-2">
            Selecciona tu área docente para ver las afirmaciones exactas y cómo enseñarlas:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(['matematicas', 'lectura', 'sociales', 'naturales', 'ingles'] as AreaId[]).map(
              (id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectArea(id)}
                  className="btn-3d-white py-2.5 px-3 rounded-xl text-xs font-bold text-left flex items-center justify-between"
                >
                  <span className="truncate">{AREAS_DATA[id].shortName}</span>
                  <span className="font-mono-num text-emerald-800 ml-1">
                    {AREAS_DATA[id].history[AREAS_DATA[id].history.length - 1].ee}p
                  </span>
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Specific Learning Competencies (Afirmaciones ICFES) for Subject Areas */}
      {area.learnings.length > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Aprendizajes por Mejorar (% de Respuestas Incorrectas)
              </h3>
              <p className="text-xs text-slate-500">
                Recuerda: un porcentaje <strong className="text-slate-800">MÁS ALTO</strong> significa{' '}
                <strong className="text-red-700">MÁS ERRORES</strong> de los estudiantes
              </p>
            </div>

            {/* Interactive Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start">
              <button
                type="button"
                onClick={() => setFilterPriority('all')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  filterPriority === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({area.learnings.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterPriority('critica')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  filterPriority === 'critica'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Por Mejorar
              </button>
              <button
                type="button"
                onClick={() => setFilterPriority('fortaleza')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  filterPriority === 'fortaleza'
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fortalezas
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredLearnings.map((item) => {
              const err2026 = item.errorHistory['2026-3'].ee;
              const err2025 = item.errorHistory['2025-3']?.ee;
              const err2022 = item.errorHistory['2022-4']?.ee;
              const sem = getIcfesSemaphore(err2026);
              const isExpanded = expandedId === item.id;
              const diffBogota = err2026 - item.errorHistory['2026-3'].etc;

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border transition-all overflow-hidden ${sem.softBg}`}
                >
                  {/* Card Header (Clickable to expand/collapse) */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full text-left p-3.5 focus:outline-none"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-600 mb-1">
                      <span className="font-semibold text-slate-700 truncate">
                        {item.competencia}
                        {item.componente ? ` · ${item.componente}` : ''}
                      </span>
                      <span className="font-mono-num font-bold shrink-0">
                        {sem.label}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-2.5">
                      “{item.aprendizaje}”
                    </p>

                    {/* Error Rate Bar & Multi-year comparison */}
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-extrabold font-mono-num text-base text-slate-950">
                          {err2026}% de error
                        </span>
                        <span aria-hidden="true" className="text-slate-400">·</span>
                        <span className="text-slate-600">
                          Bogotá: <strong className="font-mono-num">{item.errorHistory['2026-3'].etc}%</strong>
                        </span>
                        <span aria-hidden="true" className="text-slate-400">·</span>
                        <span className="text-slate-600">
                          Col: <strong className="font-mono-num">{item.errorHistory['2026-3'].colombia}%</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-900 shrink-0">
                        <span>{isExpanded ? 'Ocultar guía' : '¿Cómo mejorar?'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* Visual Error Bar */}
                    <div className="w-full h-2.5 bg-white/90 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${err2026}%`,
                          backgroundColor:
                            err2026 >= 60 ? '#DC2626' : err2026 >= 45 ? '#EA580C' : '#16A34A',
                        }}
                      />
                    </div>

                    {/* Historical Error evolution row */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-600 font-mono-num">
                      {err2022 !== undefined && <span>2022: {err2022}% err</span>}
                      {err2025 !== undefined && (
                        <>
                          <span aria-hidden="true">→</span>
                          <span>2025: {err2025}% err</span>
                        </>
                      )}
                      <span aria-hidden="true">→</span>
                      <span className="font-bold text-slate-900">2026: {err2026}% err</span>
                      <span aria-hidden="true">·</span>
                      <span className={diffBogota > 0 ? 'text-red-700 font-semibold' : 'text-emerald-800 font-semibold'}>
                        {diffBogota > 0
                          ? `+${diffBogota}% más error que Bogotá`
                          : `${Math.abs(diffBogota)}% menos error que Bogotá`}
                      </span>
                    </div>
                  </button>

                  {/* Expanded Actionable Classroom Guide */}
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-2 bg-white/95 border-t border-slate-200/80 space-y-3">
                      <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          1. ¿Qué significa esto en palabras sencillas?
                        </p>
                        <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                          {item.explicacionSencilla}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold text-red-800 uppercase tracking-wider">
                          2. Diagnóstico del fallo en nuestros estudiantes
                        </p>
                        <p className="text-xs text-slate-800 mt-0.5 leading-relaxed font-medium">
                          {item.queMejorar}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50/90 border border-emerald-200">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-950 mb-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>3. ¿CÓMO MEJORARLO EN EL SALÓN DE CLASE?</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-800">
                          {item.comoMejorarAula.map((estrategia, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 leading-snug">
                              <BookOpenCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                              <span>{estrategia}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                        <span className="flex items-center gap-1.5 font-bold text-slate-900">
                          <Target className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Meta Docente 2027:</span>
                        </span>
                        <span className="text-emerald-900 font-semibold text-right">
                          {item.meta2027}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive 3D Goal Simulator for Teachers */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Simulador Interactivo de Meta 2027
              </h3>
              <p className="text-xs text-slate-500">
                Mueve las barras para ver cómo el progreso de tu área sube el Puntaje Global
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetSim}
            className="btn-3d-white px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
            title="Restaurar valores reales 2026"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>

        {/* Simulated Global Score Display */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-white my-3 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] text-emerald-200 font-medium block">
                Puntaje Global Proyectado (CGR)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-mono-num font-extrabold text-amber-300">
                  {simGlobal}
                </span>
                <span className="text-xs text-emerald-100">
                  / 500 pts (Actual 2026: 259)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono-num font-bold ${
                  globalGain > 0
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-emerald-800 text-emerald-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {globalGain >= 0 ? `+${globalGain} pts` : `${globalGain} pts`}
              </span>
              <span className="text-[10px] text-emerald-200 block mt-1">
                {simGlobal >= 273
                  ? '¡Supera media Bogotá ETC (273)!'
                  : simGlobal >= 267
                  ? '¡Supera Grupo Comparación GC3 (267)!'
                  : `Faltan ${267 - simGlobal} pts para igualar GC3 (267)`}
              </span>
            </div>
          </div>
        </div>

        {/* Sliders per area */}
        <div className="space-y-3">
          {(
            [
              { id: 'matematicas', label: 'Matemáticas (Peso 3x)', base: 49 },
              { id: 'lectura', label: 'Lectura Crítica (Peso 3x)', base: 54 },
              { id: 'sociales', label: 'Sociales y Ciudadanas (Peso 3x)', base: 52 },
              { id: 'naturales', label: 'Ciencias Naturales (Peso 3x)', base: 52 },
              { id: 'ingles', label: 'Inglés (Peso 1x)', base: 54 },
            ] as const
          ).map((row) => {
            const val = simScores[row.id];
            const diff = val - row.base;
            return (
              <div key={row.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{row.label}</span>
                  <div className="flex items-center gap-2 font-mono-num">
                    <span className="text-slate-500">2026: {row.base}</span>
                    <span>→</span>
                    <span className="font-extrabold text-emerald-900">{val} pts</span>
                    {diff !== 0 && (
                      <span
                        className={`text-[11px] font-bold ${
                          diff > 0 ? 'text-emerald-700' : 'text-red-600'
                        }`}
                      >
                        ({diff > 0 ? `+${diff}` : diff})
                      </span>
                    )}
                  </div>
                </div>
                <input
                  type="range"
                  min={45}
                  max={68}
                  value={val}
                  onChange={(e) =>
                    setSimScores((prev) => ({
                      ...prev,
                      [row.id]: Number(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
