
import React from 'react';
import { Header } from '@/components/Header';
import { DashboardGrid } from '@/components/DashboardGrid';
import { AlertPanel } from '@/components/AlertPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Hawya Identity Security Platform
          </h1>
          <p className="text-gray-400">SPIFFE + JA4+ Zero-Trust Environment</p>
        </div>
        
        <AlertPanel />
        <DashboardGrid />
      </main>
    </div>
  );
};

export default Index;
