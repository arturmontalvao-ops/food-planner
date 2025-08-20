import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '🍽️ Planejamento Alimentar Inteligente',
  description: 'Sistema profissional de planejamento alimentar com IA. Descubra alimentos, planeie sua semana e aproveite ingredientes com inteligência artificial.',
  keywords: 'planejamento alimentar, nutrição, receitas, IA, alimentação saudável, orçamento, calorias',
  authors: [{ name: 'Planejamento Alimentar Inteligente' }],
  creator: 'Planejamento Alimentar Inteligente',
  publisher: 'Planejamento Alimentar Inteligente',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  
  // Open Graph
  openGraph: {
    title: '🍽️ Planejamento Alimentar Inteligente',
    description: 'Descubra, planeie e optimize sua alimentação com controle calórico e de custos usando IA',
    url: 'https://planejamento-alimentar.vercel.app',
    siteName: 'Planejamento Alimentar Inteligente',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Planejamento Alimentar Inteligente',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: '🍽️ Planejamento Alimentar Inteligente',
    description: 'Descubra, planeie e optimize sua alimentação com controle calórico e de custos usando IA',
    images: ['/og-image.png'],
  },
  
  // Ícones
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍽️</text></svg>",
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍽️</text></svg>",
        type: 'image/svg+xml',
      },
    ],
  },
  
  // Manifest para PWA
  manifest: '/manifest.json',
  
  // Outras configurações
  category: 'food',
  classification: 'nutrition and meal planning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Google Fonts preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        
        {/* Analytics placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics ou outras ferramentas podem ser adicionadas aqui
              console.log('🍽️ Planejamento Alimentar Inteligente carregado!');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
        
        {/* Scripts adicionais se necessário */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Service Worker registration para PWA (opcional)
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered: ', registration);
                  }, function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}