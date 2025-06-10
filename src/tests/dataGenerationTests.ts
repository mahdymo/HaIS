
import { TestRunner } from '../utils/testRunner';
import { DataGenerator } from '../utils/dataGenerator';

export const runDataGenerationTests = async (testRunner: TestRunner) => {
  await testRunner.runSuite('Data Generation Tests', [
    {
      name: 'Generate normal identities',
      test: () => {
        const identities = DataGenerator.generateNormalIdentities(10);
        if (identities.length !== 10) {
          throw new Error('Expected 10 normal identities');
        }
        if (!identities.every(id => id.status === 'verified' || id.status === 'expired')) {
          throw new Error('Normal identities should be verified or expired');
        }
        if (!identities.every(id => id.spiffeId.startsWith('spiffe://'))) {
          throw new Error('All identities should have valid SPIFFE ID format');
        }
      }
    },
    {
      name: 'Generate anomalous identities',
      test: () => {
        const anomalies = DataGenerator.generateAnomalousIdentities(5);
        if (anomalies.length !== 5) {
          throw new Error('Expected 5 anomalous identities');
        }
        if (!anomalies.every(id => id.status === 'anomalous')) {
          throw new Error('All generated anomalies should have anomalous status');
        }
        if (!anomalies.every(id => id.anomalyType)) {
          throw new Error('All anomalous identities should have an anomaly type');
        }
      }
    },
    {
      name: 'Generate system anomalies',
      test: () => {
        const anomalies = DataGenerator.generateAnomalies(8);
        if (anomalies.length !== 8) {
          throw new Error('Expected 8 system anomalies');
        }
        if (!anomalies.every(a => a.indicators && a.indicators.length > 0)) {
          throw new Error('All anomalies should have indicators');
        }
        if (!anomalies.every(a => a.confidence >= 70)) {
          throw new Error('Anomaly confidence should be at least 70%');
        }
      }
    },
    {
      name: 'JA4 fingerprint validation',
      test: () => {
        const normal = DataGenerator.generateNormalIdentities(3);
        const anomalous = DataGenerator.generateAnomalousIdentities(3);
        
        const normalFingerprints = normal.map(id => id.ja4Fingerprint);
        const anomalousFingerprints = anomalous.map(id => id.ja4Fingerprint);
        
        if (normalFingerprints.some(fp => fp.includes('suspicious'))) {
          throw new Error('Normal fingerprints should not contain suspicious patterns');
        }
        if (!anomalousFingerprints.some(fp => fp.includes('suspicious') || fp.includes('anomaly'))) {
          throw new Error('Anomalous fingerprints should contain suspicious patterns');
        }
      }
    }
  ]);
};
