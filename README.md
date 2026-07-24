# Tabela de Preços - Eric Moura Hortifruti

Sistema web interativo para gestão e impressão de tabela de preços do hortifruti Eric Moura.

## 🚀 Como publicar no GitHub Pages

Este projeto já está **100% configurado** com o GitHub Actions para publicação automática no GitHub Pages.

### Passo 1: Subir o código para o GitHub
1. Crie um repositório no seu GitHub (ex: `tabela-precos-eric-moura`).
2. Faça o push dos arquivos para a branch `main` ou `master`:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

### Passo 2: Ativar o GitHub Pages no Repositório
1. No repositório no GitHub, acesse **Settings** > **Pages**.
2. Em **Source** (Fonte), selecione **GitHub Actions**.
3. O GitHub irá compilar e publicar automaticamente seu site a cada novo commit!

---

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Gerar build de produção para teste local
npm run build
```

## ✨ Funcionalidades
- **Edição em Tempo Real**: Clique em "Editar Tabela" para alterar nomes, telefones e preços.
- **Reajuste % em Massa**: Aumente ou reduza todos os preços com 1 clique.
- **Busca Rápida**: Filtro instantâneo de produtos com destaque de texto.
- **2 Layouts de Impressão**: Alternância entre 2 colunas espelhadas (formato original) e lista única.
- **Exportação**: Baixe a tabela em Excel/CSV ou imprima direto em PDF.
