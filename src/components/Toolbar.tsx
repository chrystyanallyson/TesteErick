import React from 'react';
import { Search, Printer, RefreshCw, FileSpreadsheet, Edit3, Check, LayoutGrid, List } from 'lucide-react';
import { ViewMode } from '../types';

interface ToolbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onReset: () => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  isEditable: boolean;
  onToggleEdit: () => void;
  onExportCSV: () => void;
  onSortAZ: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  searchTerm,
  onSearchChange,
  onReset,
  viewMode,
  onToggleViewMode,
  isEditable,
  onToggleEdit,
  onExportCSV,
  onSortAZ,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-800 text-white p-3 rounded-lg shadow-md mb-4 print:hidden space-y-3">
      {/* Top Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-700 text-white placeholder-slate-400 pl-9 pr-4 py-2 rounded-md text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Right Buttons: Only 'Editar Tabela' and 'Imprimir / PDF' */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Toggle Edit Mode */}
          <button
            type="button"
            onClick={onToggleEdit}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-bold transition-colors ${
              isEditable
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
            title={isEditable ? 'Modo edição ativo' : 'Ativar edição de texto e preços'}
          >
            {isEditable ? (
              <>
                <Check className="h-4 w-4" />
                <span>Modo Edição Ativo</span>
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4" />
                <span>Editar Tabela</span>
              </>
            )}
          </button>

          {/* Print / Export PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-bold transition-colors shadow-sm"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Secondary Row: Utilities */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-700 text-xs text-slate-300">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-400">Layout de Impressão:</span>
          <button
            type="button"
            onClick={() => onToggleViewMode('split')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              viewMode === 'split' ? 'bg-slate-600 text-white font-bold' : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
            }`}
            title="Exibir em 2 tabelas lado a lado (igual ao documento original)"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Lado a Lado (4 colunas)</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleViewMode('single')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              viewMode === 'single' ? 'bg-slate-600 text-white font-bold' : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
            }`}
            title="Exibir em 1 tabela única vertical"
          >
            <List className="h-3.5 w-3.5" />
            <span>Lista Única</span>
          </button>

          <button
            type="button"
            onClick={onSortAZ}
            className="bg-slate-700/70 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded font-medium transition-colors ml-2"
            title="Ordenar alfabeticamente A-Z"
          >
            Ordenar A-Z
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Export CSV */}
          <button
            type="button"
            onClick={onExportCSV}
            className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded transition-colors"
            title="Exportar dados para Excel / CSV"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
            <span>Exportar Excel</span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 bg-red-950/80 hover:bg-red-900 text-red-200 px-2.5 py-1 rounded transition-colors border border-red-800"
            title="Restaurar dados originais da tabela Eric Moura"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Restaurar Padrão</span>
          </button>
        </div>
      </div>
    </div>
  );
};
