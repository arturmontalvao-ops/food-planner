import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Planejamento Alimentar Inteligente',
  description: 'Descobre alimentos, planeia a semana e cria receitas com IA.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        {/* Força o tema claro para controles nativos de formulário (Firefox/Chrome/Safari) */}
        <meta name="color-scheme" content="light" />
        {/* Opcional, ajuda a manter a barra/UA clara em mobile */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  );
}
