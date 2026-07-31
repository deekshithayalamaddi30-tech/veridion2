export type ClaimStatus = 'COMPLETED' | 'PROCESSING' | 'QUEUED' | 'FAILED';

export interface VerificationClaim {
  id: string;
  subject: string;
  processingTime: string;
  status: ClaimStatus;
  confidence: number;
  hash: string;
  timestamp: string;
  category: string;
  sourceCount: number;
  summary?: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  sourceUrl: string;
  hash: string;
  timestamp: string;
  reliability: number;
  category: 'Government' | 'Academic' | 'Social' | 'Repository' | 'Financial';
  nodeId: string;
  contentSnapshot: string;
  verifiedByNodes: number;
  mimeType: string;
}

export interface ExtractedEntity {
  id: string;
  name: string;
  role: string;
  veracity: 'VERIFIED' | 'FLAGGED' | 'SUBJECTIVE' | 'UNVERIFIED';
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ReasoningStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface VerificationReportData {
  reportId: string;
  title: string;
  generatedAt: string;
  confidence: number;
  classification: string;
  sourcesAnalyzedCount: number;
  analysisTime: string;
  summary: string;
  reasoning: ReasoningStep[];
  entities: ExtractedEntity[];
  networkGraphUrl: string;
  ledgerSignature: string;
  level: string;
}

export interface BlockchainProofData {
  merkleRoot: string;
  txHash: string;
  digitalSignature: string;
  protocol: string;
  network: string;
  blockNumber: number;
  confirmedAt: string;
  timeline: {
    title: string;
    timestamp: string;
    detail: string;
    completed: boolean;
  }[];
}

export interface FastApiConfig {
  endpoint: string;
  apiKey: string;
  isConnected: boolean;
  autoSync: boolean;
  lastPingMs: number;
}
