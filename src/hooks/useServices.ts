
import { useState, useEffect } from 'react';
import { ja4Service } from '../services/ja4Service';
import { spireService } from '../services/spireService';
import { correlationService } from '../services/correlationService';
import { identityService } from '../services/identityService';
import { policyService } from '../services/policyService';
import { alertService } from '../services/alertService';
import { threatService } from '../services/threatService';

export const useJA4Data = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fingerprints, metrics] = await Promise.all([
          ja4Service.getFingerprints(),
          ja4Service.getMetrics()
        ]);
        setData({ fingerprints: fingerprints.data, metrics: metrics.data });
      } catch (error) {
        console.error('Error fetching JA4 data:', error);
        // Fallback to mock data
        setData({
          fingerprints: [
            { id: 1, ja4: 't13d1516h2_8daaf6152771_b0da82dd1658', source: '10.0.1.25', risk: 'low' },
            { id: 2, ja4: 't13d1517h2_9ebbf7263882_c1eb93ee2769', source: '192.168.1.45', risk: 'medium' },
            { id: 3, ja4: 't13d1518h2_afccf8374993_d2fc04ff3870', source: '10.0.2.33', risk: 'high' }
          ],
          metrics: { packets: 1247, fingerprints: 23 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading };
};

export const useSpireData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [components, status] = await Promise.all([
          spireService.getComponents(),
          spireService.getServerStatus()
        ]);
        setData({ components: components.data, status: status.data });
      } catch (error) {
        console.error('Error fetching SPIRE data:', error);
        // Fallback to mock data
        setData({
          components: [
            { name: 'SPIRE Server', status: 'online', count: 1 },
            { name: 'SPIRE Agents', status: 'online', count: 12 },
            { name: 'Workload Entries', status: 'online', count: 47 }
          ],
          status: { status: 'online', lastSync: '2024-06-10 14:25:33 UTC' }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading };
};
