import React from 'react';
import { Product, ViewMode } from '../types';
import { Trash2, Tag, ShoppingBag } from 'lucide-react';

interface PriceTableProps {
  products: Product[];
  onUpdateProduct: (id: string, name: string, price: number) => void;
  onDeleteProduct: (id: string) => void;
  viewMode: ViewMode;
  isEditable: boolean;
  searchTerm?: string;
}

export const PriceTable: React.FC<PriceTableProps> = ({
  products,
  onUpdateProduct,
  onDeleteProduct,
  viewMode,
  isEditable,
  searchTerm = '',
}) => {
  // Format numeric value into Brazilian Real (R$ 0,00)
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  const handlePriceChange = (id: string, name: string, rawStr: string) => {
    // Replace commas with dots and keep numbers
    const sanitized = rawStr.replace(/[^\d.,-]/g, '').replace(',', '.');
    const parsed = parseFloat(sanitized);
    onUpdateProduct(id, name, isNaN(parsed) ? 0 : parsed);
  };

  // Helper to render search term highlight
  const renderHighlightedText = (text: string) => {
    if (!searchTerm.trim()) return text;
    const term = searchTerm.trim().toLowerCase();
    const index = text.toLowerCase().indexOf(term);
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + term.length);
    const after = text.slice(index + term.length);

    return (
      <>
        {before}
        <mark className="bg-amber-200 text-amber-950 font-black rounded-xs px-0.5 print:bg-transparent print:text-black">
          {match}
        </mark>
        {after}
      </>
    );
  };

  if (products.length === 0) {
    return (
      <div className="border border-slate-900 rounded-md p-8 text-center bg-slate-50/50 my-4 text-slate-600 font-semibold flex flex-col items-center justify-center gap-2">
        <ShoppingBag className="h-8 w-8 text-slate-400 stroke-1" />
        <p>Nenhum produto encontrado{searchTerm ? ` para "${searchTerm}"` : ''}.</p>
      </div>
    );
  }

  // Split View Mode (2 twin side-by-side columns matching the original document)
  if (viewMode === 'split') {
    const halfIndex = Math.ceil(products.length / 2);
    const leftColumnProducts = products.slice(0, halfIndex);
    const rightColumnProducts = products.slice(halfIndex);

    const maxRows = Math.max(leftColumnProducts.length, rightColumnProducts.length);

    return (
      <div className="w-full border-2 border-slate-900 bg-white select-none shadow-xs">
        <table className="w-full border-collapse text-left text-xs sm:text-sm font-sans text-slate-900">
          <thead>
            <tr className="bg-slate-900 text-white font-black uppercase text-xs tracking-wider border-b-2 border-slate-900 print:bg-slate-300 print:text-slate-900">
              <th className="py-2 px-2.5 border-r border-slate-800 print:border-slate-900 w-[35%]">
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-emerald-400 print:hidden" />
                  PRODUTO
                </span>
              </th>
              <th className="py-2 px-2.5 border-r border-slate-800 print:border-slate-900 w-[15%] text-right sm:text-left">
                PREÇO
              </th>
              <th className="py-2 px-2.5 border-r border-slate-800 print:border-slate-900 w-[35%]">
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-emerald-400 print:hidden" />
                  PRODUTO
                </span>
              </th>
              <th className="py-2 px-2.5 w-[15%] text-right sm:text-left">
                PREÇO
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 font-semibold uppercase text-xs sm:text-sm">
            {Array.from({ length: maxRows }).map((_, idx) => {
              const leftItem = leftColumnProducts[idx];
              const rightItem = rightColumnProducts[idx];

              return (
                <tr
                  key={idx}
                  className="even:bg-slate-50/80 hover:bg-emerald-50/70 transition-colors"
                >
                  {/* LEFT PRODUCT NAME */}
                  <td className="p-1.5 border-r border-slate-900 font-bold truncate max-w-[170px] sm:max-w-none text-slate-900">
                    {leftItem ? (
                      isEditable ? (
                        <div className="flex items-center justify-between group">
                          <input
                            type="text"
                            value={leftItem.name}
                            onChange={(e) =>
                              onUpdateProduct(leftItem.id, e.target.value.toUpperCase(), leftItem.price)
                            }
                            className="w-full font-bold text-slate-900 bg-emerald-100/70 border border-emerald-400 rounded px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase text-xs sm:text-sm print:border-none print:bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => onDeleteProduct(leftItem.id)}
                            className="text-slate-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden ml-1 shrink-0"
                            title="Excluir produto"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        renderHighlightedText(leftItem.name)
                      )
                    ) : null}
                  </td>

                  {/* LEFT PRODUCT PRICE */}
                  <td className="p-1.5 border-r border-slate-900 text-right sm:text-left whitespace-nowrap font-mono font-bold text-slate-950 tracking-tight">
                    {leftItem ? (
                      isEditable ? (
                        <input
                          type="text"
                          value={leftItem.price === 0 ? '' : leftItem.price.toString().replace('.', ',')}
                          onChange={(e) => handlePriceChange(leftItem.id, leftItem.name, e.target.value)}
                          placeholder="0,00"
                          className="w-20 font-mono font-bold text-slate-900 bg-emerald-100/70 border border-emerald-400 rounded px-1.5 py-0.5 text-right sm:text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm print:border-none print:bg-transparent"
                        />
                      ) : (
                        formatBRL(leftItem.price)
                      )
                    ) : null}
                  </td>

                  {/* RIGHT PRODUCT NAME */}
                  <td className="p-1.5 border-r border-slate-900 font-bold truncate max-w-[170px] sm:max-w-none text-slate-900">
                    {rightItem ? (
                      isEditable ? (
                        <div className="flex items-center justify-between group">
                          <input
                            type="text"
                            value={rightItem.name}
                            onChange={(e) =>
                              onUpdateProduct(rightItem.id, e.target.value.toUpperCase(), rightItem.price)
                            }
                            className="w-full font-bold text-slate-900 bg-emerald-100/70 border border-emerald-400 rounded px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase text-xs sm:text-sm print:border-none print:bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => onDeleteProduct(rightItem.id)}
                            className="text-slate-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden ml-1 shrink-0"
                            title="Excluir produto"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        renderHighlightedText(rightItem.name)
                      )
                    ) : null}
                  </td>

                  {/* RIGHT PRODUCT PRICE */}
                  <td className="p-1.5 text-right sm:text-left whitespace-nowrap font-mono font-bold text-slate-950 tracking-tight">
                    {rightItem ? (
                      isEditable ? (
                        <input
                          type="text"
                          value={rightItem.price === 0 ? '' : rightItem.price.toString().replace('.', ',')}
                          onChange={(e) => handlePriceChange(rightItem.id, rightItem.name, e.target.value)}
                          placeholder="0,00"
                          className="w-20 font-mono font-bold text-slate-900 bg-emerald-100/70 border border-emerald-400 rounded px-1.5 py-0.5 text-right sm:text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm print:border-none print:bg-transparent"
                        />
                      ) : (
                        formatBRL(rightItem.price)
                      )
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* Table Footer Stats Bar */}
        <div className="border-t border-slate-900 bg-slate-100/80 px-3 py-1.5 text-slate-700 text-xs font-semibold flex justify-between items-center print:bg-slate-100">
          <span>
            Exibindo <strong>{products.length}</strong> produtos
          </span>
          <span className="text-slate-500 text-[11px]">
            * Preços sujeitos a alteração sem aviso prévio
          </span>
        </div>
      </div>
    );
  }

  // Single Column View Mode
  return (
    <div className="w-full border-2 border-slate-900 bg-white select-none shadow-xs">
      <table className="w-full border-collapse text-left text-xs sm:text-sm font-sans text-slate-900">
        <thead>
          <tr className="bg-slate-900 text-white font-black uppercase text-xs tracking-wider border-b-2 border-slate-900 print:bg-slate-300 print:text-slate-900">
            <th className="py-2.5 px-3 border-r border-slate-800 print:border-slate-900 w-[70%]">
              <span className="flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-emerald-400 print:hidden" />
                PRODUTO
              </span>
            </th>
            <th className="py-2.5 px-3 text-right sm:text-left w-[30%]">PREÇO</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900 font-semibold uppercase text-xs sm:text-sm">
          {products.map((item) => (
            <tr key={item.id} className="even:bg-slate-50/80 hover:bg-emerald-50/70 transition-colors">
              <td className="p-2 border-r border-slate-900 font-bold text-slate-900">
                {isEditable ? (
                  <div className="flex items-center justify-between group">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        onUpdateProduct(item.id, e.target.value.toUpperCase(), item.price)
                      }
                      className="w-full font-bold text-slate-900 bg-emerald-100/70 border border-emerald-400 rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase text-xs sm:text-sm print:border-none print:bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => onDeleteProduct(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden ml-1 shrink-0"
                      title="Excluir produto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  renderHighlightedText(item.name)
                )}
              </td>
              <td className="p-2 text-right sm:text-left whitespace-nowrap font-mono font-bold text-slate-950 tracking-tight">
                {isEditable ? (
                  <input
                    type="text"
                    value={item.price === 0 ? '' : item.price.toString().replace('.', ',')}
                    onChange={(e) => handlePriceChange(item.id, item.name, e.target.value)}
                    placeholder="0,00"
                    className="w-24 font-mono font-bold text-slate-900 bg-emerald-100/70 border border-emerald-400 rounded px-2 py-0.5 text-right sm:text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm print:border-none print:bg-transparent"
                  />
                ) : (
                  formatBRL(item.price)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table Footer Stats Bar */}
      <div className="border-t border-slate-900 bg-slate-100/80 px-3 py-1.5 text-slate-700 text-xs font-semibold flex justify-between items-center print:bg-slate-100">
        <span>
          Total de <strong>{products.length}</strong> produtos
        </span>
        <span className="text-slate-500 text-[11px]">
          * Preços sujeitos a alteração sem aviso prévio
        </span>
      </div>
    </div>
  );
};

