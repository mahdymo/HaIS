
export interface TestResult {
  name: string;
  passed: boolean;
  duration: number;
  error?: string;
  details?: string;
}

export interface TestSuite {
  name: string;
  tests: TestResult[];
  passed: number;
  failed: number;
  duration: number;
}

export class TestRunner {
  private results: TestSuite[] = [];

  async runTest(name: string, testFn: () => Promise<void> | void): Promise<TestResult> {
    const startTime = performance.now();
    try {
      await testFn();
      const duration = performance.now() - startTime;
      return {
        name,
        passed: true,
        duration,
        details: 'Test passed successfully'
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        name,
        passed: false,
        duration,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  async runSuite(suiteName: string, tests: Array<{ name: string; test: () => Promise<void> | void }>): Promise<TestSuite> {
    const startTime = performance.now();
    const testResults: TestResult[] = [];

    for (const { name, test } of tests) {
      const result = await this.runTest(name, test);
      testResults.push(result);
    }

    const duration = performance.now() - startTime;
    const passed = testResults.filter(t => t.passed).length;
    const failed = testResults.length - passed;

    const suite: TestSuite = {
      name: suiteName,
      tests: testResults,
      passed,
      failed,
      duration
    };

    this.results.push(suite);
    return suite;
  }

  getResults(): TestSuite[] {
    return this.results;
  }

  clearResults(): void {
    this.results = [];
  }
}
