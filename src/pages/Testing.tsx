import React, { useState } from 'react';
import { Play, RotateCcw, Shield } from 'lucide-react';
import { TestRunner, TestSuite } from '../utils/testRunner';
import { runComponentTests } from '../tests/componentTests';
import { TestResults } from '../components/TestResults';

const Testing = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testRunner] = useState(() => new TestRunner());

  const runAllTests = async () => {
    setIsRunning(true);
    testRunner.clearResults();
    
    try {
      await runComponentTests(testRunner);
      setTestSuites([...testRunner.getResults()]);
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const clearResults = () => {
    testRunner.clearResults();
    setTestSuites([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold">MIS Platform - Testing Suite</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
            </button>
            
            <button
              onClick={clearResults}
              disabled={isRunning}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Component Testing Dashboard
          </h1>
          <p className="text-gray-400">Automated testing for SPIFFE + JA4+ Security Platform</p>
        </div>

        {testSuites.length > 0 || isRunning ? (
          <TestResults testSuites={testSuites} isRunning={isRunning} />
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
            <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-300 mb-2">Ready to Test</h2>
            <p className="text-gray-400 mb-6">
              Click "Run Tests" to execute the comprehensive test suite for all platform components.
            </p>
            <button
              onClick={runAllTests}
              className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded mx-auto transition-colors"
            >
              <Play className="h-5 w-5" />
              <span>Start Testing</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Testing;
