import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Planejamento Alimentar Inteligente',
  description: 'Descobre alimentos, planeia a semana e cria receitas com IA.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
