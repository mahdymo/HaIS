
export interface GeneratedIdentity {
  id: string;
  spiffeId: string;
  status: 'verified' | 'expired' | 'pending' | 'anomalous';
  lastSeen: string;
  ipAddress: string;
  userAgent: string;
  ja4Fingerprint: string;
  risk: 'low' | 'medium' | 'high';
  anomalyType?: 'unusual_location' | 'suspicious_timing' | 'invalid_certificate' | 'behavioral_anomaly';
  confidence: number;
}

export interface GeneratedAnomaly {
  id: string;
  type: 'identity_mismatch' | 'unusual_access_pattern' | 'invalid_ja4' | 'certificate_anomaly';
  severity: 'low' | 'medium' | 'high';
  description: string;
  affectedIdentity: string;
  timestamp: string;
  indicators: string[];
  confidence: number;
}

export class DataGenerator {
  private static domains = ['example.org', 'company.com', 'secure.net', 'internal.corp'];
  private static services = ['web-frontend', 'api-gateway', 'database', 'auth-service', 'payment-service'];
  private static userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'curl/7.68.0',
    'PostmanRuntime/7.28.4'
  ];
  private static ipRanges = ['10.0.', '192.168.', '172.16.', '203.0.'];

  static generateNormalIdentities(count: number = 20): GeneratedIdentity[] {
    const identities: GeneratedIdentity[] = [];
    
    for (let i = 0; i < count; i++) {
      const domain = this.domains[Math.floor(Math.random() * this.domains.length)];
      const service = this.services[Math.floor(Math.random() * this.services.length)];
      
      identities.push({
        id: `id_${Date.now()}_${i}`,
        spiffeId: `spiffe://${domain}/${service}`,
        status: Math.random() > 0.9 ? 'expired' : 'verified',
        lastSeen: this.getRandomTimestamp(60), // within last hour
        ipAddress: this.generateNormalIP(),
        userAgent: this.userAgents[Math.floor(Math.random() * this.userAgents.length)],
        ja4Fingerprint: this.generateNormalJA4(),
        risk: Math.random() > 0.8 ? 'medium' : 'low',
        confidence: 85 + Math.floor(Math.random() * 15)
      });
    }
    
    return identities;
  }

  static generateAnomalousIdentities(count: number = 5): GeneratedIdentity[] {
    const anomalies: GeneratedIdentity[] = [];
    const anomalyTypes: ('unusual_location' | 'suspicious_timing' | 'invalid_certificate' | 'behavioral_anomaly')[] = 
      ['unusual_location', 'suspicious_timing', 'invalid_certificate', 'behavioral_anomaly'];
    
    for (let i = 0; i < count; i++) {
      const domain = this.domains[Math.floor(Math.random() * this.domains.length)];
      const service = this.services[Math.floor(Math.random() * this.services.length)];
      const anomalyType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
      
      anomalies.push({
        id: `anomaly_${Date.now()}_${i}`,
        spiffeId: `spiffe://${domain}/${service}`,
        status: 'anomalous',
        lastSeen: this.getRandomTimestamp(120),
        ipAddress: this.generateAnomalousIP(),
        userAgent: this.generateAnomalousUserAgent(),
        ja4Fingerprint: this.generateAnomalousJA4(),
        risk: Math.random() > 0.5 ? 'high' : 'medium',
        anomalyType,
        confidence: 60 + Math.floor(Math.random() * 30)
      });
    }
    
    return anomalies;
  }

  static generateAnomalies(count: number = 10): GeneratedAnomaly[] {
    const anomalies: GeneratedAnomaly[] = [];
    const types: ('identity_mismatch' | 'unusual_access_pattern' | 'invalid_ja4' | 'certificate_anomaly')[] = 
      ['identity_mismatch', 'unusual_access_pattern', 'invalid_ja4', 'certificate_anomaly'];
    
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      
      anomalies.push({
        id: `anom_${Date.now()}_${i}`,
        type,
        severity: this.getAnomalySeverity(type),
        description: this.getAnomalyDescription(type),
        affectedIdentity: `spiffe://${this.domains[0]}/${this.services[i % this.services.length]}`,
        timestamp: this.getRandomTimestamp(240),
        indicators: this.getAnomalyIndicators(type),
        confidence: 70 + Math.floor(Math.random() * 30)
      });
    }
    
    return anomalies;
  }

  private static generateNormalIP(): string {
    const range = this.ipRanges[Math.floor(Math.random() * 2)]; // First 2 are internal
    return `${range}${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }

  private static generateAnomalousIP(): string {
    // External IPs or suspicious ranges
    const suspicious = ['185.220.', '91.134.', '45.123.', '203.0.'];
    const range = suspicious[Math.floor(Math.random() * suspicious.length)];
    return `${range}${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }

  private static generateNormalJA4(): string {
    const normalPatterns = [
      't13d1516h2_8daaf6152771_b0da82dd1658',
      't13d1517h2_9ebbf7263882_c1eb93ee2769',
      't13d1518h2_afccf8374993_d2fc04ff3870'
    ];
    return normalPatterns[Math.floor(Math.random() * normalPatterns.length)];
  }

  private static generateAnomalousJA4(): string {
    const anomalousPatterns = [
      't12d1516h2_suspicious001_malicious123',
      't13d0000h0_unknown12345_suspicious67',
      't10d9999h9_anomaly98765_threat54321'
    ];
    return anomalousPatterns[Math.floor(Math.random() * anomalousPatterns.length)];
  }

  private static generateAnomalousUserAgent(): string {
    const suspicious = [
      'Bot/1.0 (Suspicious)',
      'curl/0.0.0',
      'Unknown/Malware',
      'Scanner/Attack-Tool'
    ];
    return suspicious[Math.floor(Math.random() * suspicious.length)];
  }

  private static getRandomTimestamp(maxMinutesAgo: number): string {
    const now = new Date();
    const minutesAgo = Math.floor(Math.random() * maxMinutesAgo);
    const timestamp = new Date(now.getTime() - minutesAgo * 60000);
    return `${minutesAgo}m ago`;
  }

  private static getAnomalySeverity(type: string): 'low' | 'medium' | 'high' {
    switch (type) {
      case 'identity_mismatch':
      case 'certificate_anomaly':
        return 'high';
      case 'invalid_ja4':
        return 'medium';
      default:
        return 'low';
    }
  }

  private static getAnomalyDescription(type: string): string {
    switch (type) {
      case 'identity_mismatch':
        return 'SPIFFE ID does not match expected certificate';
      case 'unusual_access_pattern':
        return 'Access from unusual geographic location or time';
      case 'invalid_ja4':
        return 'JA4 fingerprint indicates suspicious TLS behavior';
      case 'certificate_anomaly':
        return 'Certificate validation failed or expired';
      default:
        return 'Unknown anomaly detected';
    }
  }

  private static getAnomalyIndicators(type: string): string[] {
    switch (type) {
      case 'identity_mismatch':
        return ['Certificate mismatch', 'Invalid SPIFFE ID', 'Trust chain broken'];
      case 'unusual_access_pattern':
        return ['Geographic anomaly', 'Time-based anomaly', 'Frequency spike'];
      case 'invalid_ja4':
        return ['Malformed TLS handshake', 'Suspicious cipher suite', 'Protocol violation'];
      case 'certificate_anomaly':
        return ['Expired certificate', 'Invalid signature', 'Revoked certificate'];
      default:
        return ['Unknown indicator'];
    }
  }
}
