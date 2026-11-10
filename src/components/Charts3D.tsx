import React from 'react';
import { AreaConfig, YearlyScore, YearId, AREAS_DATA, AreaId } from '../data/saberData';
import { TrendingUp, TrendingDown, Minus, CheckCircle2, AlertTriangle } from 'lucide-react';

interface EvolutionChart3DProps {
  area: AreaConfig;
  selectedYear: YearId | 'ALL';
  onSelectYear: (year: YearId) => void;
  compareTarget: 'colombia' | 'oficialesUrbanos' | 'bogotaEtc';
}

export const EvolutionChart3D: React.FC<EvolutionChart3DProps> = ({
  area,
  selectedYear,
  onSelectYear,
  compareTarget,
}) => {
  const isGlobal = area.id === 'global';
  const minVal = isGlobal ? 235 : 42;
  const maxVal = isGlobal ? 290 : 62;

  const getCompareLabel = () => {
    if (compareTarget === 'colombia') return 'Promedio Colombia';
    if (compareTarget === 'oficialesUrbanos') return 'Colegios Oficiales Bogotá';
    return 'Total Bogotá (ETC)';
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Evolución Histórica 3D (2016 – 2026)
          </h3>
          <p className="text-xs text-slate-500">
            Toca cualquier barra de año para ver su radiografía detallada
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[11px] font-medium text-slate-500 block">
            Escala 0–{area.scaleMax}
          </span>
          <span className="text-xs font-mono-num font-bold text-emerald-800">
            Meta base: {area.mediaReferencia} pts
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mb-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-sm inline-block shadow-xs"
            style={{ backgroundColor: area.colorHex }}
          />
          <span className="font-semibold text-slate-800">Colegio Gustavo Restrepo</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 bg-amber-400 rounded-full inline-block" />
          <span>{getCompareLabel()}</span>
        </div>
      </div>

      {/* 3D Bar Chart Container */}
      <div className="relative pt-7 pb-2 px-1">
        <div className="grid grid-cols-10 gap-1.5 sm:gap-2.5 items-end h-44 border-b-2 border-slate-300 pb-1">
          {area.history.map((item) => {
            const isSelected = selectedYear === item.year;
            const pct = Math.max(
              14,
              Math.min(100, Math.round(((item.ee - minVal) / (maxVal - minVal)) * 100))
            );
            const compVal = item[compareTarget];
            const compPct = Math.max(
              10,
              Math.min(100, Math.round(((compVal - minVal) / (maxVal - minVal)) * 100))
            );
            const beatsComp = item.ee >= compVal;

            return (
              <button
                key={item.year}
                type="button"
                onClick={() => onSelectYear(item.year)}
                className={`group relative flex flex-col items-center justify-end h-full focus:outline-none transition-transform ${
                  isSelected ? 'scale-[1.04]' : 'hover:scale-[1.02]'
                }`}
                title={`Año ${item.year}: Colegio ${item.ee} pts vs ${getCompareLabel()} ${compVal} pts`}
              >
                {/* Score Label on top of 3D bar */}
                <span
                  className={`text-[11px] font-mono-num font-bold mb-2 transition-colors ${
                    isSelected
                      ? 'text-slate-950 underline decoration-2 decoration-amber-500'
                      : beatsComp
                      ? 'text-emerald-800'
                      : 'text-red-700'
                  }`}
                >
                  {item.ee}
                </span>

                {/* Track & Bar */}
                <div className="relative w-full max-w-[26px] h-32 flex items-end justify-center">
                  {/* Comparison marker line */}
                  <div
                    className="absolute left-0 right-0 h-1 bg-amber-400 z-20 rounded-full shadow-xs pointer-events-none"
                    style={{ bottom: `${compPct}%` }}
                  />

                  {/* 3D Bar */}
                  <div
                    className={`w-full bar-3d-front rounded-b-sm transition-all ${
                      isSelected ? 'ring-2 ring-amber-400 ring-offset-1' : 'opacity-90 group-hover:opacity-100'
                    }`}
                    style={{
                      height: `${pct}%`,
                      backgroundColor: isSelected
                        ? '#145A32'
                        : beatsComp
                        ? area.colorHex
                        : '#C81E2B',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* X-Axis Year Labels */}
        <div className="grid grid-cols-10 gap-1.5 sm:gap-2.5 pt-2">
          {area.history.map((item) => {
            const isSelected = selectedYear === item.year;
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => onSelectYear(item.year)}
                className={`text-center py-1 rounded-md text-[10px] font-mono-num font-bold transition-colors ${
                  isSelected
                    ? 'bg-emerald-900 text-amber-300 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.shortYear}
              </button>
            );
          })}
        </div>
      </div>

      {/* Friendly micro-reading of the chart */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <span>
          <strong className="text-emerald-800">Verde/Color:</strong> Supera o iguala a {getCompareLabel()}
        </span>
        <span>
          <strong className="text-red-700">Rojo:</strong> Por debajo de referencia
        </span>
      </div>
    </div>
  );
};

interface AllAreasComparisonProps {
  yearDataMap: Record<AreaId, YearlyScore>;
  selectedArea: AreaId;
  onSelectArea: (area: AreaId) => void;
  yearLabel: string;
}

export const AllAreasComparison3D: React.FC<AllAreasComparisonProps> = ({
  yearDataMap,
  selectedArea,
  onSelectArea,
  yearLabel,
}) => {
  const subjectIds: AreaId[] = ['lectura', 'ingles', 'sociales', 'naturales', 'matematicas'];

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Comparativo de las 5 Áreas ({yearLabel})
          </h3>
          <p className="text-xs text-slate-500">
            Toca un área para abrir su diagnóstico y plan de mejora docente
          </p>
        </div>
        <span className="text-xs font-mono-num text-slate-500 shrink-0">
          Escala 0–100
        </span>
      </div>

      <div className="space-y-3">
        {subjectIds.map((id) => {
          const areaCfg = AREAS_DATA[id];
          const scoreObj = yearDataMap[id];
          if (!scoreObj) return null;

          const diffCol = scoreObj.ee - scoreObj.colombia;
          const diffOfi = scoreObj.ee - scoreObj.oficialesUrbanos;
          const isCurrent = selectedArea === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectArea(id)}
              className={`w-full text-left p-3 rounded-xl transition-all border ${
                isCurrent
                  ? 'bg-emerald-50/70 border-emerald-700 shadow-sm'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: areaCfg.colorHex }}
                  />
                  <span className="font-bold text-sm text-slate-900 truncate">
                    {areaCfg.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500">
                    Col: <strong className="font-mono-num text-slate-700">{scoreObj.colombia}</strong>
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-base font-mono-num font-extrabold text-slate-900">
                    {scoreObj.ee} <span className="text-[11px] font-normal text-slate-500">pts</span>
                  </span>
                </div>
              </div>

              {/* 3D Tactile Progress Bar */}
              <div className="w-full h-3.5 bg-slate-200 rounded-lg overflow-hidden p-0.5 shadow-inner relative">
                {/* National 50-pt reference marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-500/60 z-10"
                  style={{ left: '50%' }}
                  title="Referencia 50 pts"
                />
                <div
                  className="h-full rounded-md transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.max(15, scoreObj.ee))}%`,
                    background: `linear-gradient(180deg, ${areaCfg.colorHex}dd 0%, ${areaCfg.colorHex} 100%)`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 mt-1.5">
                <span className="flex items-center gap-1">
                  {diffCol > 0 ? (
                    <>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="text-emerald-800 font-medium">
                        +{diffCol} pts sobre Colombia
                      </span>
                    </>
                  ) : diffCol === 0 ? (
                    <>
                      <Minus className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-amber-800 font-medium">Igual a Colombia</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="text-red-700 font-semibold">
                        {diffCol} pts bajo Colombia (Prioridad)
                      </span>
                    </>
                  )}
                </span>
                <span className="text-slate-500 font-mono-num">
                  vs Oficiales Bog: {diffOfi >= 0 ? `+${diffOfi}` : diffOfi} pts
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface PerformanceLevelsCardProps {
  area: AreaConfig;
  scoreData: YearlyScore;
}

export const PerformanceLevelsCard: React.FC<PerformanceLevelsCardProps> = ({
  area,
  scoreData,
}) => {
  const levels = scoreData.levels;
  const goodPct =
    area.id === 'ingles'
      ? (levels.l3 || 0) + (levels.l4 || 0) + (levels.l5 || 0)
      : (levels.l3 || 0) + (levels.l4 || 0);
  const lowPct = (levels.l1 || 0) + (levels.l2 || 0);

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Niveles de Desempeño ({scoreData.year})
          </h3>
          <p className="text-xs text-slate-500">
            ¿Qué porcentaje de nuestros estudiantes alcanza cada nivel?
          </p>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-2 gap-2.5 my-3">
        <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Niveles Esperados</span>
          </div>
          <p className="text-xl font-mono-num font-extrabold text-emerald-800 mt-0.5">
            {goodPct}%
          </p>
          <p className="text-[11px] text-emerald-900/80">
            {area.id === 'ingles' ? 'En A2, B1 y B+' : 'En Nivel 3 y Nivel 4'}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-red-50/80 border border-red-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Por Nivelar</span>
          </div>
          <p className="text-xl font-mono-num font-extrabold text-red-700 mt-0.5">
            {lowPct}%
          </p>
          <p className="text-[11px] text-red-900/80">
            {area.id === 'ingles' ? 'En A- y A1 (Básico)' : 'En Nivel 1 y Nivel 2'}
          </p>
        </div>
      </div>

      {/* Stacked 3D Bar */}
      <div className="w-full h-7 rounded-xl overflow-hidden flex p-0.5 bg-slate-200 shadow-inner mb-4">
        {area.levelLabels.map((lvl) => {
          const val = scoreData.levels[lvl.key] ?? 0;
          if (val <= 0) return null;
          return (
            <div
              key={lvl.key}
              style={{ width: `${val}%`, backgroundColor: lvl.color }}
              className="h-full flex items-center justify-center text-[10px] font-mono-num font-bold text-white first:rounded-l-lg last:rounded-r-lg transition-all duration-300 overflow-hidden"
              title={`${lvl.label}: ${val}%`}
            >
              {val >= 7 ? `${val}%` : ''}
            </div>
          );
        })}
      </div>

      {/* Detailed Breakdown with friendly teacher explanation */}
      <div className="space-y-2.5">
        {area.levelLabels.map((lvl) => {
          const val = scoreData.levels[lvl.key] ?? 0;
          return (
            <div
              key={lvl.key}
              className="flex items-start justify-between gap-3 py-1.5 border-b border-slate-100 last:border-b-0"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span
                  className="w-3.5 h-3.5 rounded-sm shrink-0 mt-0.5 shadow-2xs"
                  style={{ backgroundColor: lvl.color }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900">
                    {lvl.label}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {lvl.meaning}
                  </p>
                </div>
              </div>
              <span className="text-sm font-mono-num font-extrabold text-slate-900 shrink-0">
                {val}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
