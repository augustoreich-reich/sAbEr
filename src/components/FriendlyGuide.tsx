import React from 'react';
import {
  FRIENDLY_GLOSSARY,
  PARTICIPATION_HISTORY,
  SCHOOL_INFO,
} from '../data/saberData';
import {
  HelpCircle,
  FileText,
  Users,
  ExternalLink,
  Award,
  Compass,
} from 'lucide-react';

export const FriendlyGuide: React.FC = () => {
  const pdfReports = [
    {
      title: 'Reporte por Aplicación 2026-3 (Último Corte)',
      period: 'Aplicación Julio 2026 (GC 2, GC 3, GC 4)',
      url: '/assets/aistudio/SABER26_f29553bc.pdf',
      pages: '62 páginas',
    },
    {
      title: 'Reporte Histórico 2023 – 2025',
      period: 'Aplicaciones 2023-4, 2024-3 y 2025-3',
      url: '/assets/aistudio/SABER23_25_673ba3c5.pdf',
      pages: '63 páginas',
    },
    {
      title: 'Reporte Histórico 2020 – 2022',
      period: 'Aplicaciones 2020-4, 2021-4 y 2022-4',
      url: '/assets/aistudio/SABER20_22_22a8f175.pdf',
      pages: '63 páginas',
    },
    {
      title: 'Reporte Histórico 2016 – 2018',
      period: 'Aplicaciones 2016-2, 2017-2 y 2018-2',
      url: '/assets/aistudio/SABER16_19_fe035658.pdf',
      pages: '51 páginas',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1-Minute Quick Start for Non-Experts */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Guía Rápida para Docentes (Sin Tecnicismos)
            </h3>
            <p className="text-xs text-slate-500">
              Cómo leer los reportes del ICFES en menos de 1 minuto
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {FRIENDLY_GLOSSARY.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80"
            >
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-4 h-4 text-emerald-800 shrink-0" />
                <h4 className="text-xs font-extrabold text-slate-900">
                  {item.term}
                </h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-1.5">
                {item.simple}
              </p>
              <p className="text-[11px] font-semibold text-emerald-900 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                Clave práctica: {item.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Student Participation Table (Tabla 1.1 ICFES) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-800 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Histórico de Estudiantes Evaluados (2016–2026)
              </h3>
              <p className="text-xs text-slate-500">
                Ficha técnica oficial Tabla 1.1 SIMAT / ICFES
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2 pr-2">Aplicación</th>
                <th className="py-2 px-2 text-right">Matriculados</th>
                <th className="py-2 px-2 text-right">Inscritos</th>
                <th className="py-2 px-2 text-right">Presentes</th>
                <th className="py-2 pl-2 text-right text-emerald-900">Publicados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono-num">
              {PARTICIPATION_HISTORY.slice()
                .reverse()
                .map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50">
                    <td className="py-2 pr-2 font-bold text-slate-900">
                      {row.year}
                    </td>
                    <td className="py-2 px-2 text-right text-slate-600">
                      {row.matriculados ?? 'S/D'}
                    </td>
                    <td className="py-2 px-2 text-right text-slate-700">
                      {row.inscritos}
                    </td>
                    <td className="py-2 px-2 text-right text-slate-700">
                      {row.presentes}
                    </td>
                    <td className="py-2 pl-2 text-right font-bold text-emerald-800">
                      {row.publicados}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Technical Sheet & Original PDF Downloads */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Documentos Oficiales ICFES Anexos
            </h3>
            <p className="text-xs text-slate-500">
              {SCHOOL_INFO.nombre} · DANE {SCHOOL_INFO.dane} · {SCHOOL_INFO.direccion}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {pdfReports.map((pdf, idx) => (
            <a
              key={idx}
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-white w-full p-3 rounded-xl flex items-center justify-between gap-3 text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {pdf.title}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {pdf.period} · {pdf.pages}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-800 shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
