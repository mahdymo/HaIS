import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { TestSuite, TestResult } from '../utils/testRunner';

interface TestResultsProps {
  testSuites: TestSuite[];
  isRunning: boolean;
}

export const TestResults = ({ testSuites, isRunning }: TestResultsProps) => {
  const totalTests = testSuites.reduce((acc, suite) => acc + suite.tests.length, 0);
  const totalPassed = testSuites.reduce((acc, suite) => acc + suite.passed, 0);
  const totalFailed = testSuites.reduce((acc, suite) => acc + suite.failed, 0);
  const totalDuration = testSuites.reduce((acc, suite) => acc + suite.duration, 0);

  const getTestIcon = (test: TestResult) => {
    if (test.passed) {
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    }
    return <XCircle className="h-4 w-4 text-red-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
          {isRunning ? (
            <Clock className="h-6 w-6 mr-2 animate-spin" />
          ) : (
            <AlertTriangle className="h-6 w-6 mr-2" />
          )}
          Test Results Summary
        </h2>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
            <div className="text-lg font-bold text-white font-mono">{totalTests}</div>
            <div className="text-xs text-gray-400">Total Tests</div>
          </div>
          <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
            <div className="text-lg font-bold text-green-400 font-mono">{totalPassed}</div>
            <div className="text-xs text-gray-400">Passed</div>
          </div>
          <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
            <div className="text-lg font-bold text-red-400 font-mono">{totalFailed}</div>
            <div className="text-xs text-gray-400">Failed</div>
          </div>
          <div className="bg-gray-900 rounded p-3 border border-gray-600 text-center">
            <div className="text-lg font-bold text-cyan-400 font-mono">{totalDuration.toFixed(2)}ms</div>
            <div className="text-xs text-gray-400">Duration</div>
          </div>
        </div>
      </div>

      {/* Test Suites */}
      <div className="space-y-4">
        {testSuites.map((suite, suiteIndex) => (
          <div key={suiteIndex} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cyan-400">{suite.name}</h3>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-green-400">{suite.passed} passed</span>
                <span className="text-red-400">{suite.failed} failed</span>
                <span className="text-gray-400">{suite.duration.toFixed(2)}ms</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {suite.tests.map((test, testIndex) => (
                <div 
                  key={testIndex} 
                  className={`bg-gray-900 rounded p-3 border ${
                    test.passed ? 'border-green-800' : 'border-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTestIcon(test)}
                      <span className="text-sm text-gray-200">{test.name}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{test.duration.toFixed(2)}ms</span>
                  </div>
                  
                  {test.error && (
                    <div className="text-xs text-red-400 bg-red-900/20 rounded p-2 font-mono">
                      Error: {test.error}
                    </div>
                  )}
                  
                  {test.details && test.passed && (
                    <div className="text-xs text-green-400">
                      {test.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
