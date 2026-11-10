/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  AREAS_DATA,
  ALL_YEARS,
  SCHOOL_INFO,
  PARTICIPATION_HISTORY,
  AreaId,
  YearId,
  YearlyScore,
} from './data/saberData';
import {
  EvolutionChart3D,
  AllAreasComparison3D,
  PerformanceLevelsCard,
} from './components/Charts3D';
import { ImprovementPlan } from './components/ImprovementPlan';
import { FriendlyGuide } from './components/FriendlyGuide';
import {
  BarChart3,
  Layers,
  Lightbulb,
  BookOpen,
  Smartphone,
  Maximize2,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';

type ActiveTab = 'evolucion' | 'niveles' | 'mejora' | 'guia';

export default function App() {
  const [selectedArea, setSelectedArea] = useState<AreaId>('global');
  const [selectedYear, setSelectedYear] = useState<YearId>('2026-3');
  const [compareTarget, setCompareTarget] = useState<
    'colombia' | 'oficialesUrbanos' | 'bogotaEtc'
  >('colombia');
  const [activeTab, setActiveTab] = useState<ActiveTab>('evolucion');
  const [desktopMobileFrame, setDesktopMobileFrame] = useState<boolean>(true);
  const [logoError, setLogoError] = useState<boolean>(false);

  const currentAreaConfig = AREAS_DATA[selectedArea];

  const currentYearScore = useMemo(() => {
    return (
      currentAreaConfig.history.find((h) => h.year === selectedYear) ||
      currentAreaConfig.history[currentAreaConfig.history.length - 1]
    );
  }, [currentAreaConfig, selectedYear]);

  const previousYearScore = useMemo(() => {
    const idx = currentAreaConfig.history.findIndex((h) => h.year === selectedYear);
    if (idx > 0) return currentAreaConfig.history[idx - 1];
    return null;
  }, [currentAreaConfig, selectedYear]);

  // Map of all areas for the selectedYear
  const allAreasForSelectedYear = useMemo(() => {
    const result = {} as Record<AreaId, YearlyScore>;
    (Object.keys(AREAS_DATA) as AreaId[]).forEach((areaKey) => {
      const found =
        AREAS_DATA[areaKey].history.find((h) => h.year === selectedYear) ||
        AREAS_DATA[areaKey].history[AREAS_DATA[areaKey].history.length - 1];
      result[areaKey] = found;
    });
    return result;
  }, [selectedYear]);

  // 10-year historical stats for the current area
  const historicalSummary = useMemo(() => {
    const scores = currentAreaConfig.history.map((h) => h.ee);
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const maxYearObj = currentAreaConfig.history.find((h) => h.ee === maxScore);
    return {
      maxScore,
      minScore,
      avgScore,
      maxYear: maxYearObj?.shortYear || '2017',
    };
  }, [currentAreaConfig]);

  const deltaVsPrev = previousYearScore
    ? currentYearScore.ee - previousYearScore.ee
    : 0;
  const deltaVsComp = currentYearScore.ee - currentYearScore[compareTarget];

  const areaButtons: { id: AreaId; label: string; short: string }[] = [
    { id: 'global', label: 'Todas las Áreas (Global)', short: 'Global' },
    { id: 'matematicas', label: 'Matemáticas', short: 'Matemáticas' },
    { id: 'lectura', label: 'Lectura Crítica', short: 'Lectura' },
    { id: 'sociales', label: 'Sociales y Ciudadanas', short: 'Sociales' },
    { id: 'naturales', label: 'Ciencias Naturales', short: 'Naturales' },
    { id: 'ingles', label: 'Inglés', short: 'Inglés' },
  ];

  const handleSelectAreaAndGoToImprovement = (area: AreaId) => {
    setSelectedArea(area);
    setActiveTab('mejora');
  };

  return (
    <div className="min-h-screen bg-[#E8EFEA] text-slate-900 flex flex-col">
      {/* Top Institutional Navigation Bar (Follows 3-Zone Contract) */}
      <header className="sticky top-0 z-40 bg-[#114B29] text-white border-b-2 border-[#F5B000] shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Title */}
          <div className="flex items-center gap-2.5 min-w-0 shrink-0">
            {!logoError ? (
              <img
                src={SCHOOL_INFO.logoUrl}
                alt="Escudo Colegio Gustavo Restrepo IED"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className="w-9 h-9 rounded-full bg-white p-0.5 object-contain shadow-xs shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-white text-[#145A32] font-extrabold text-xs flex items-center justify-center shrink-0">
                CGR
              </div>
            )}
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-white whitespace-nowrap truncate">
              Colegio Gustavo Restrepo IED
            </span>
          </div>

          {/* Zone 2: Concise Single-Line Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-emerald-100">
            <button
              type="button"
              onClick={() => setActiveTab('evolucion')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'evolucion' ? 'text-amber-300 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              Histórico y Áreas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('niveles')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'niveles' ? 'text-amber-300 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              Niveles de Desempeño
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mejora')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'mejora' ? 'text-amber-300 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              Qué y Cómo Mejorar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guia')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'guia' ? 'text-amber-300 underline underline-offset-4 decoration-2' : ''
              }`}
            >
              Guía Fácil y PDFs
            </button>
          </nav>

          {/* Zone 3: Primary Action (Toggle Mobile Vertical Frame on Desktop or Open Improvement Plan) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setDesktopMobileFrame(!desktopMobileFrame)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5B000] text-slate-950 hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              {desktopMobileFrame ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expandir Tablero</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Modo Celular Vertical</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'mejora' ? 'evolucion' : 'mejora')}
              className="lg:hidden px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5B000] text-slate-950 whitespace-nowrap shrink-0"
            >
              {activeTab === 'mejora' ? 'Ver Gráficas' : 'Plan Mejora'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-0 sm:px-4 py-0 sm:py-5 pb-24">
        <div
          className={
            desktopMobileFrame
              ? 'lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start'
              : 'max-w-5xl mx-auto px-3 sm:px-0'
          }
        >
          {/* Left Context Column on Desktop when Mobile Vertical Simulator Mode is Active */}
          {desktopMobileFrame && (
            <aside className="hidden lg:block lg:col-span-4 space-y-4 sticky top-20">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  {!logoError && (
                    <img
                      src={SCHOOL_INFO.logoUrl}
                      alt="Escudo CGR"
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-contain shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-xs font-bold text-emerald-800">
                      ANALÍTICA DOCENTE SABER 11°
                    </p>
                    <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                      {SCHOOL_INFO.nombre}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      DANE {SCHOOL_INFO.dane} · {SCHOOL_INFO.grupoComparacion}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Diseñado en formato vertical interactivo para que cada docente consulte desde su celular el histórico 2016–2026 de todas las áreas y el plan de mejora de su asignatura.
                </p>

                {/* Quick Area Switcher on Desktop Sidebar */}
                <p className="text-xs font-extrabold text-slate-800 mb-2">
                  Acceso Directo por Área Docente:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {areaButtons.map((btn) => {
                    const isSelected = selectedArea === btn.id;
                    const latest =
                      AREAS_DATA[btn.id].history[
                        AREAS_DATA[btn.id].history.length - 1
                      ].ee;
                    return (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setSelectedArea(btn.id)}
                        className={`p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all ${
                          isSelected ? 'btn-3d-green' : 'btn-3d-white'
                        }`}
                      >
                        <span className="truncate">{btn.short}</span>
                        <span
                          className={`font-mono-num ml-1 ${
                            isSelected ? 'text-amber-300' : 'text-slate-600'
                          }`}
                        >
                          {latest}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Executive Summary Card on Desktop */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-2.5">
                <h3 className="text-xs font-extrabold text-slate-900">
                  Resumen Ejecutivo CGR (Corte 2026-3)
                </h3>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <strong className="text-emerald-900 block">
                    1. Puntaje Global en Recuperación (259 pts)
                  </strong>
                  <span className="text-slate-700">
                    Subió +4 pts desde 2024 (255) y supera el promedio de Colombia (258).
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <strong className="text-amber-950 block">
                    2. Áreas Destacadas en 2026
                  </strong>
                  <span className="text-slate-700">
                    Lectura (54 pts, 72% en Nivel 3), Inglés (54 pts) y Sociales (+3 pts subiendo a 52).
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs">
                  <strong className="text-red-900 block">
                    3. Foco Urgente de Mejora
                  </strong>
                  <span className="text-slate-700">
                    Matemáticas (49 pts, 68% error en resolución de problemas) y Nivel 1 en Naturales (16%).
                  </span>
                </div>
              </div>
            </aside>
          )}

          {/* Central Vertical Mobile Smartphone Container (375px–430px ergonomic column on mobile/simulator, or full width when expanded) */}
          <div
            className={
              desktopMobileFrame
                ? 'lg:col-span-8 flex justify-center'
                : 'w-full'
            }
          >
            <div
              className={
                desktopMobileFrame
                  ? 'w-full max-w-[440px] bg-[#F4F7F5] sm:rounded-[32px] sm:border-[6px] sm:border-slate-900 sm:shadow-2xl overflow-hidden flex flex-col min-h-[calc(100vh-3.5rem)] sm:min-h-[820px]'
                  : 'w-full space-y-4'
              }
            >
              {/* Mobile App Hero Banner with Institutional Crest Colors */}
              <div className="bg-gradient-to-br from-[#0E3F22] via-[#145A32] to-[#1B7A43] text-white p-4 pb-5 border-b-4 border-[#C81E2B] relative">
                {/* Top Institutional Metadata Line (Unboxed clean text with · separators) */}
                <div className="flex items-center justify-between text-[11px] text-emerald-100/90 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span>ICFES Saber 11°</span>
                    <span aria-hidden="true">·</span>
                    <span>Histórico 2016–2026</span>
                  </div>
                  <span className="font-mono-num text-amber-300 font-semibold">
                    {PARTICIPATION_HISTORY.find((p) => p.year === selectedYear)?.publicados ?? 77} Evaluados ({selectedYear})
                  </span>
                </div>

                {/* AreaSelector 3D Buttons (Tactile 3D Grid) */}
                <p className="text-[11px] font-bold text-amber-300 mb-2">
                  1. SELECCIONA TU ÁREA DOCENTE O EL GLOBAL:
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {areaButtons.map((btn) => {
                    const active = selectedArea === btn.id;
                    return (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setSelectedArea(btn.id)}
                        className={`min-h-[44px] px-2.5 py-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center text-center whitespace-nowrap truncate ${
                          active ? 'btn-3d-gold' : 'btn-3d-green'
                        }`}
                      >
                        <span className="truncate w-full">{btn.short}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Year Selector Horizontal 3D Carousel */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>2. FILTRAR POR AÑO DE APLICACIÓN:</span>
                  </span>
                  <span className="text-[11px] text-emerald-100 font-mono-num">
                    Fecha: {currentYearScore.date}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {ALL_YEARS.slice()
                    .reverse()
                    .map((yr) => {
                      const isYr = selectedYear === yr;
                      return (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setSelectedYear(yr)}
                          className={`min-h-[38px] px-3 py-1.5 rounded-xl font-mono-num text-xs font-bold shrink-0 transition-all ${
                            isYr
                              ? 'btn-3d-red'
                              : 'bg-emerald-950/70 text-emerald-100 border border-emerald-700/60 hover:bg-emerald-800'
                          }`}
                        >
                          {yr}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Scrollable Mobile Content Feed */}
              <div className="p-3.5 sm:p-4 space-y-4 flex-1">
                {/* Main KPI Score Card for Selected Area & Year */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span>{currentAreaConfig.name}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-num font-semibold text-emerald-800">
                          Aplicación {selectedYear}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2.5 mt-1">
                        <span className="text-4xl font-mono-num font-extrabold text-slate-950 tracking-tight">
                          {currentYearScore.ee}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          / {currentAreaConfig.scaleMax} pts
                        </span>
                        {previousYearScore && (
                          <span
                            className={`inline-flex items-center gap-0.5 text-xs font-mono-num font-bold ${
                              deltaVsPrev > 0
                                ? 'text-emerald-700'
                                : deltaVsPrev < 0
                                ? 'text-red-600'
                                : 'text-slate-600'
                            }`}
                          >
                            {deltaVsPrev > 0 ? (
                              <TrendingUp className="w-3.5 h-3.5" />
                            ) : deltaVsPrev < 0 ? (
                              <TrendingDown className="w-3.5 h-3.5" />
                            ) : null}
                            {deltaVsPrev > 0
                              ? `+${deltaVsPrev} vs ${previousYearScore.shortYear}`
                              : deltaVsPrev < 0
                              ? `${deltaVsPrev} vs ${previousYearScore.shortYear}`
                              : `Igual a ${previousYearScore.shortYear}`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button to jump straight to Improvement Plan */}
                    {activeTab !== 'mejora' && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('mejora')}
                        className="btn-3d-red px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
                      >
                        <span>¿Cómo Mejorar?</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Comparison Benchmarks Grid (Colombia, Oficiales Bog, Bogotá ETC, Desviación) */}
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center">
                    <div className="p-2 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-500 block truncate">
                        Colombia
                      </span>
                      <span className="text-sm font-mono-num font-bold text-slate-900">
                        {currentYearScore.colombia}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-500 block truncate">
                        Oficiales Bog
                      </span>
                      <span className="text-sm font-mono-num font-bold text-slate-900">
                        {currentYearScore.oficialesUrbanos}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-500 block truncate">
                        Bogotá ETC
                      </span>
                      <span className="text-sm font-mono-num font-bold text-slate-900">
                        {currentYearScore.bogotaEtc}
                      </span>
                    </div>
                    <div
                      className="p-2 rounded-xl bg-emerald-50/70"
                      title="Desviación estándar: menor valor indica un grupo más parejo"
                    >
                      <span className="text-[10px] text-emerald-900 font-medium block truncate">
                        Desviación
                      </span>
                      <span className="text-sm font-mono-num font-bold text-emerald-900">
                        ±{currentYearScore.desv}
                      </span>
                    </div>
                  </div>

                  {/* 10-Year Historical Context Strip */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span>
                      Promedio 10 años:{' '}
                      <strong className="font-mono-num text-slate-900">
                        {historicalSummary.avgScore} pts
                      </strong>
                    </span>
                    <span>·</span>
                    <span>
                      Mejor año:{' '}
                      <strong className="font-mono-num text-emerald-800">
                        {historicalSummary.maxScore} pts ({historicalSummary.maxYear})
                      </strong>
                    </span>
                    {currentYearScore.gc3 && (
                      <>
                        <span>·</span>
                        <span>
                          GC3:{' '}
                          <strong className="font-mono-num text-slate-900">
                            {currentYearScore.gc3}
                          </strong>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Sub-Navigation Pills for Mobile Content Views */}
                <div className="grid grid-cols-4 gap-1.5 bg-slate-200/80 p-1 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setActiveTab('evolucion')}
                    className={`min-h-[40px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap truncate ${
                      activeTab === 'evolucion'
                        ? 'bg-[#145A32] text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    1. Histórico
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('niveles')}
                    className={`min-h-[40px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap truncate ${
                      activeTab === 'niveles'
                        ? 'bg-[#145A32] text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    2. Niveles
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('mejora')}
                    className={`min-h-[40px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap truncate ${
                      activeTab === 'mejora'
                        ? 'bg-[#C81E2B] text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    3. Mejorar
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('guia')}
                    className={`min-h-[40px] py-1.5 px-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap truncate ${
                      activeTab === 'guia'
                        ? 'bg-[#145A32] text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    4. Guía/PDF
                  </button>
                </div>

                {/* TAB 1: EVOLUCIÓN HISTÓRICA Y COMPARATIVO DE TODAS LAS ÁREAS */}
                {activeTab === 'evolucion' && (
                  <div className="space-y-4">
                    {/* Benchmark Selector Control */}
                    <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200/90">
                      <span className="text-xs font-bold text-slate-700">
                        Comparar contra:
                      </span>
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setCompareTarget('colombia')}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                            compareTarget === 'colombia'
                              ? 'bg-white text-slate-900 shadow-2xs'
                              : 'text-slate-600'
                          }`}
                        >
                          Colombia
                        </button>
                        <button
                          type="button"
                          onClick={() => setCompareTarget('oficialesUrbanos')}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                            compareTarget === 'oficialesUrbanos'
                              ? 'bg-white text-slate-900 shadow-2xs'
                              : 'text-slate-600'
                          }`}
                        >
                          Oficiales Bog
                        </button>
                        <button
                          type="button"
                          onClick={() => setCompareTarget('bogotaEtc')}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                            compareTarget === 'bogotaEtc'
                              ? 'bg-white text-slate-900 shadow-2xs'
                              : 'text-slate-600'
                          }`}
                        >
                          Bogotá Total
                        </button>
                      </div>
                    </div>

                    {/* 3D Evolution Bar Chart (2016 - 2026) */}
                    <EvolutionChart3D
                      area={currentAreaConfig}
                      selectedYear={selectedYear}
                      onSelectYear={(yr) => setSelectedYear(yr)}
                      compareTarget={compareTarget}
                    />

                    {/* All 5 Areas Comparison for Selected Year */}
                    <AllAreasComparison3D
                      yearDataMap={allAreasForSelectedYear}
                      selectedArea={selectedArea}
                      onSelectArea={(area) => setSelectedArea(area)}
                      yearLabel={selectedYear}
                    />

                    {/* Quick CTA Card to open the improvement plan */}
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl p-4 text-slate-950 shadow-sm flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-wide text-amber-950">
                          Acción Pedagógica Docente
                        </p>
                        <p className="text-sm font-bold leading-snug mt-0.5">
                          Descubre qué aprendizajes fallaron en {currentAreaConfig.shortName} y cómo reforzarlos en clase
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('mejora')}
                        className="btn-3d-green px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0"
                      >
                        Abrir Plan
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: NIVELES DE DESEMPEÑO (1 AL 4 / A- A B+) */}
                {activeTab === 'niveles' && (
                  <div className="space-y-4">
                    <PerformanceLevelsCard
                      area={currentAreaConfig}
                      scoreData={currentYearScore}
                    />

                    {/* Complete 10-Year Historical Table of Levels & Averages */}
                    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-900 mb-1">
                        Tabla Histórica Completa: {currentAreaConfig.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3">
                        Toca cualquier fila para activar ese año en el tablero
                      </p>

                      <div className="overflow-x-auto -mx-2 px-2">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                              <th className="py-2 pr-2">Año</th>
                              <th className="py-2 px-1.5 text-right">Colegio</th>
                              <th className="py-2 px-1.5 text-right">Col</th>
                              <th className="py-2 px-1.5 text-right text-red-700">
                                {selectedArea === 'ingles' ? 'A-' : 'N1'}
                              </th>
                              <th className="py-2 px-1.5 text-right text-orange-600">
                                {selectedArea === 'ingles' ? 'A1' : 'N2'}
                              </th>
                              <th className="py-2 px-1.5 text-right text-amber-600">
                                {selectedArea === 'ingles' ? 'A2' : 'N3'}
                              </th>
                              <th className="py-2 pl-1.5 text-right text-emerald-700">
                                {selectedArea === 'ingles' ? 'B1/B+' : 'N4'}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-mono-num">
                            {currentAreaConfig.history
                              .slice()
                              .reverse()
                              .map((row) => {
                                const isSel = row.year === selectedYear;
                                const topLvl =
                                  selectedArea === 'ingles'
                                    ? (row.levels.l4 || 0) + (row.levels.l5 || 0)
                                    : row.levels.l4;
                                return (
                                  <tr
                                    key={row.year}
                                    onClick={() => setSelectedYear(row.year)}
                                    className={`cursor-pointer transition-colors ${
                                      isSel
                                        ? 'bg-emerald-50 font-bold'
                                        : 'hover:bg-slate-50'
                                    }`}
                                  >
                                    <td className="py-2 pr-2 font-bold text-slate-900">
                                      {row.year}
                                    </td>
                                    <td className="py-2 px-1.5 text-right font-extrabold text-slate-950">
                                      {row.ee}
                                    </td>
                                    <td className="py-2 px-1.5 text-right text-slate-500">
                                      {row.colombia}
                                    </td>
                                    <td className="py-2 px-1.5 text-right text-red-700">
                                      {row.levels.l1}%
                                    </td>
                                    <td className="py-2 px-1.5 text-right text-orange-700">
                                      {row.levels.l2}%
                                    </td>
                                    <td className="py-2 px-1.5 text-right text-amber-700">
                                      {row.levels.l3}%
                                    </td>
                                    <td className="py-2 pl-1.5 text-right text-emerald-800 font-bold">
                                      {topLvl}%
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: QUÉ MEJORAR Y CÓMO MEJORAR EN EL AULA + SIMULADOR 2027 */}
                {activeTab === 'mejora' && (
                  <ImprovementPlan
                    area={currentAreaConfig}
                    onSelectArea={(a) => setSelectedArea(a)}
                  />
                )}

                {/* TAB 4: GUÍA AMIGABLE PARA NO EXPERTOS Y DESCARGA DE PDFs */}
                {activeTab === 'guia' && <FriendlyGuide />}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Ergonomic Thumb-Zone Bottom Tab Bar (<15% viewport height, >=44px touch targets) */}
      <nav
        aria-label="Navegación principal móvil"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 items-center h-15 px-2">
          <button
            type="button"
            onClick={() => setActiveTab('evolucion')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors ${
              activeTab === 'evolucion'
                ? 'text-[#145A32] font-extrabold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
              Histórico y Áreas
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('niveles')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors ${
              activeTab === 'niveles'
                ? 'text-[#145A32] font-extrabold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
              Niveles 1–4
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mejora')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors ${
              activeTab === 'mejora'
                ? 'text-[#C81E2B] font-extrabold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Lightbulb className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
              Cómo Mejorar
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guia')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors ${
              activeTab === 'guia'
                ? 'text-[#145A32] font-extrabold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
              Guía Fácil y PDFs
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
