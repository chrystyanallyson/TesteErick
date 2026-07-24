import React from 'react';
import { HeaderInfo } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  info: HeaderInfo;
  onChange: (updatedInfo: HeaderInfo) => void;
  logoUrl?: string;
  onLogoChange?: (url: string) => void;
  isEditable: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  info,
  onChange,
  logoUrl,
  onLogoChange,
  isEditable,
}) => {
  const handleEmailChange = (index: number, val: string) => {
    const newEmails = [...info.emails];
    newEmails[index] = val;
    onChange({ ...info, emails: newEmails });
  };

  const addEmail = () => {
    onChange({ ...info, emails: [...info.emails, 'novo.email@gmail.com'] });
  };

  const removeEmail = (index: number) => {
    if (info.emails.length <= 1) return;
    const newEmails = info.emails.filter((_, i) => i !== index);
    onChange({ ...info, emails: newEmails });
  };

  return (
    <div className="w-full mb-2 bg-white print:mb-1 select-none">
      {/* Top Header Grid */}
      <div className="border border-slate-900 grid grid-cols-12 divide-x divide-slate-900 text-slate-900">
        
        {/* Left Column: Logo */}
        <div className="col-span-4 p-2 flex items-center justify-center bg-slate-50/50 print:bg-transparent">
          <Logo customLogoUrl={logoUrl} onLogoChange={onLogoChange} isEditing={isEditable} />
        </div>

        {/* Right Column: Contact info rows */}
        <div className="col-span-8 flex flex-col divide-y divide-slate-900 text-xs sm:text-sm font-semibold">
          
          {/* EMAIL ROW */}
          <div className="p-2 flex items-center min-h-[36px]">
            <span className="font-bold mr-2 text-slate-900 uppercase min-w-[55px]">EMAIL:</span>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-wrap">
              {info.emails.map((email, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  {isEditable ? (
                    <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-300 rounded px-1">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => handleEmailChange(idx, e.target.value)}
                        className="text-blue-700 font-bold underline bg-transparent focus:outline-none text-xs sm:text-sm print:no-underline print:text-black"
                      />
                      {info.emails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEmail(idx)}
                          className="text-red-500 hover:text-red-700 font-bold px-1 text-xs print:hidden"
                          title="Remover email"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ) : (
                    <a
                      href={`mailto:${email}`}
                      className="text-blue-700 underline font-semibold hover:text-blue-900 print:text-blue-800 print:no-underline"
                    >
                      {email}
                    </a>
                  )}
                  {idx < info.emails.length - 1 && <span className="text-slate-400 font-normal hidden sm:inline">|</span>}
                </div>
              ))}
              {isEditable && (
                <button
                  type="button"
                  onClick={addEmail}
                  className="text-xs bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold hover:bg-emerald-700 print:hidden ml-auto"
                >
                  + Email
                </button>
              )}
            </div>
          </div>

          {/* ENDEREÇO ROW */}
          <div className="p-2 flex items-start sm:items-center min-h-[42px]">
            <div className="w-full flex">
              {isEditable ? (
                <textarea
                  value={info.address}
                  onChange={(e) => onChange({ ...info, address: e.target.value })}
                  rows={2}
                  className="w-full text-slate-900 font-medium bg-emerald-50 border border-emerald-300 rounded p-1 text-xs sm:text-sm focus:outline-none uppercase print:border-none print:bg-transparent"
                />
              ) : (
                <span className="text-slate-900 font-semibold uppercase leading-tight">
                  {info.address}
                </span>
              )}
            </div>
          </div>

          {/* TELEFONE ROW */}
          <div className="p-2 flex items-center min-h-[36px]">
            <div className="w-full">
              {isEditable ? (
                <input
                  type="text"
                  value={info.phones}
                  onChange={(e) => onChange({ ...info, phones: e.target.value })}
                  className="w-full text-slate-900 font-semibold bg-emerald-50 border border-emerald-300 rounded px-1.5 py-0.5 text-xs sm:text-sm focus:outline-none uppercase print:border-none print:bg-transparent"
                />
              ) : (
                <span className="text-slate-900 font-bold uppercase">
                  {info.phones}
                </span>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Banner Row: TABELA DE PRECOS */}
      <div className="border-x border-b border-slate-900 bg-slate-100 p-1.5 text-slate-900 font-extrabold text-center uppercase tracking-widest text-sm sm:text-base print:bg-slate-100">
        {isEditable ? (
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              value={info.title}
              onChange={(e) => onChange({ ...info, title: e.target.value })}
              className="text-center font-extrabold text-slate-900 bg-emerald-50 border border-emerald-300 rounded px-2 py-0.5 w-full max-w-xs focus:outline-none uppercase print:border-none print:bg-transparent"
            />
          </div>
        ) : (
          <span>{info.title}</span>
        )}
      </div>
    </div>
  );
};
