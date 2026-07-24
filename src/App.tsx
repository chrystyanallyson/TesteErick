import React, { useState, useEffect, useMemo } from 'react';
import { defaultHeaderInfo, defaultProducts } from './data/defaultData';
import { HeaderInfo, Product, ViewMode } from './types';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { PriceTable } from './components/PriceTable';
import { Download, RefreshCw, Printer, AlertCircle } from 'lucide-react';

const STORAGE_KEY_HEADER = 'eric_moura_header_v1';
const STORAGE_KEY_PRODUCTS = 'eric_moura_products_v1';
const STORAGE_KEY_LOGO = 'eric_moura_logo_v1';
const STORAGE_KEY_VIEW = 'eric_moura_viewmode_v1';

export default function App() {
  // Load initial state from localStorage or default
  const [headerInfo, setHeaderInfo] = useState<HeaderInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HEADER);
      return saved ? JSON.parse(saved) : defaultHeaderInfo;
    } catch (e) {
      return defaultHeaderInfo;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch (e) {
      return defaultProducts;
    }
  });

  const [logoUrl, setLogoUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_LOGO) || '';
  });

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return (localStorage.getItem(STORAGE_KEY_VIEW) as ViewMode) || 'split';
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HEADER, JSON.stringify(headerInfo));
    } catch (e) {
      console.error('Error saving header info', e);
    }
  }, [headerInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOGO, logoUrl);
    } catch (e) {
      console.error('Error saving logo', e);
    }
  }, [logoUrl]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VIEW, viewMode);
    } catch (e) {
      console.error('Error saving view mode', e);
    }
  }, [viewMode]);

  // Handlers
  const handleUpdateProduct = (id: string, name: string, price: number) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name, price } : item))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddProduct = (name: string, price: number) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleBulkAdjust = (percentage: number) => {
    const factor = 1 + percentage / 100;
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        // Round to 2 decimal places
        price: Math.max(0, Math.round(p.price * factor * 100) / 100),
      }))
    );
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar a tabela original da Eric Moura? Todas as alterações serão redefinidas.')) {
      setHeaderInfo(defaultHeaderInfo);
      setProducts(defaultProducts);
      setLogoUrl('');
      setViewMode('split');
      setSearchTerm('');
      localStorage.removeItem(STORAGE_KEY_HEADER);
      localStorage.removeItem(STORAGE_KEY_PRODUCTS);
      localStorage.removeItem(STORAGE_KEY_LOGO);
      localStorage.removeItem(STORAGE_KEY_VIEW);
    }
  };

  const handleSortAZ = () => {
    setProducts((prev) =>
      [...prev].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    );
  };

  const handleExportCSV = () => {
    const headers = 'PRODUTO;PRECO\n';
    const rows = products
      .map((p) => `"${p.name.replace(/"/g, '""')}";"${p.price.toFixed(2).replace('.', ',')}"`)
      .join('\n');

    const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tabela_precos_eric_moura_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered products for search
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase().trim();
    return products.filter((p) => p.name.toLowerCase().includes(term));
  }, [products, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans print:bg-white print:text-black antialiased">
      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-3 sm:p-6 print:p-0 print:max-w-none">
        
        {/* Interactive Controls Toolbar */}
        <Toolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onReset={handleReset}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          isEditable={isEditable}
          onToggleEdit={() => setIsEditable((prev) => !prev)}
          onExportCSV={handleExportCSV}
          onSortAZ={handleSortAZ}
        />

        {/* Edit mode hint banner */}
        {isEditable && (
          <div className="mb-3 p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs sm:text-sm flex items-center justify-between gap-2 print:hidden">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Modo Edição Ativo:</strong> Clique diretamente nos textos do cabeçalho ou nas células da tabela para editar nomes, telefones e preços. As alterações são salvas automaticamente!
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsEditable(false)}
              className="bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded hover:bg-emerald-800 transition-colors text-xs shrink-0"
            >
              Concluir Edição
            </button>
          </div>
        )}

        {/* Document Sheet Frame (mimics the print page area) */}
        <div className="bg-white rounded-lg shadow-xl border border-slate-300 p-4 sm:p-6 print:shadow-none print:border-none print:p-0 print:m-0">
          
          {/* Header Section */}
          <Header
            info={headerInfo}
            onChange={setHeaderInfo}
            logoUrl={logoUrl}
            onLogoChange={setLogoUrl}
            isEditable={isEditable}
          />

          {/* Main Price Table */}
          <PriceTable
            products={filteredProducts}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            viewMode={viewMode}
            isEditable={isEditable}
            searchTerm={searchTerm}
          />
        </div>

        {/* Bottom Help & Quick Actions (Hidden when printing) */}
        <footer className="mt-6 text-center text-xs text-slate-500 print:hidden space-y-2">
          <p>
            💡 <strong>Dica de Impressão:</strong> Clique no botão "Imprimir / PDF" ou pressione <kbd className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded border border-slate-300">Ctrl + P</kbd>. Na janela de impressão, escolha "Salvar como PDF" para gerar um arquivo digital pronto para envio aos clientes.
          </p>
          <div className="flex justify-center items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="text-emerald-700 hover:text-emerald-900 font-semibold underline flex items-center gap-1"
            >
              <Printer className="h-3.5 w-3.5" /> Imprimir agora
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={handleExportCSV}
              className="text-blue-700 hover:text-blue-900 font-semibold underline flex items-center gap-1"
            >
              <Download className="h-3.5 w-3.5" /> Baixar Planilha Excel
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
