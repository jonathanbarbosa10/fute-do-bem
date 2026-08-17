import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Fute do Bem - Campeonato Beneficente',
  description: 'Ambiente oficial do campeonato beneficente Fute do Bem. Veja escalações, times e encomende o kit de uniforme oficial.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-fute-darkBg text-purple-100 min-h-screen flex antialiased selection:bg-fute-purpleBright selection:text-white">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <Header />
          <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
