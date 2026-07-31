import { VerificationClaim, EvidenceItem, VerificationReportData, BlockchainProofData } from '../types';

export const INITIAL_CLAIMS: VerificationClaim[] = [
  {
    id: '#VX-9821',
    subject: 'Asset Authenticity V-02',
    processingTime: '1.2s',
    status: 'COMPLETED',
    confidence: 98.4,
    hash: '0x8A9B2F4C7D6E5A4B3C2D1E0F9A8B7C6D5E4F3A2B',
    timestamp: '2026-07-31 10:42:15',
    category: 'Financial Asset',
    sourceCount: 18,
    summary: 'Cross-referenced against 18 banking and registrar nodes. Asset ownership verified with 98.4% confidence.'
  },
  {
    id: '#VX-9822',
    subject: 'Domain Provenance Check',
    processingTime: '3.8s',
    status: 'PROCESSING',
    confidence: 88.5,
    hash: '0x3A1C90FB1234567890ABCDEF1234567890ABCDEF',
    timestamp: '2026-07-31 10:40:02',
    category: 'Cyber Provenance',
    sourceCount: 42,
    summary: 'Evaluating WHOIS registration changes and SSL certificate authority chain for anomalous registration hops.'
  },
  {
    id: '#VX-9823',
    subject: 'Identity Cross-Verification',
    processingTime: '--',
    status: 'QUEUED',
    confidence: 0,
    hash: '0x77EEBB2100000000000000000000000000000000',
    timestamp: '2026-07-31 10:38:11',
    category: 'Biometric & KYC',
    sourceCount: 12,
    summary: 'Waiting for node worker consensus slot to verify government registry credentials.'
  },
  {
    id: '#VX-9824',
    subject: 'Transaction Log Audit',
    processingTime: '0.9s',
    status: 'FAILED',
    confidence: 42.1,
    hash: '0xD5C2FF1199887766554433221100AABBCCDDEEFF',
    timestamp: '2026-07-31 10:35:40',
    category: 'Ledger Audit',
    sourceCount: 6,
    summary: 'Mismatch found between reported timestamp and cryptographic epoch signature.'
  },
  {
    id: '#VX-9825',
    subject: 'Climate Accord Metadata Seal',
    processingTime: '2.1s',
    status: 'COMPLETED',
    confidence: 99.1,
    hash: '0x4F2D3A1B9876543210FEDCBA9876543210FEDCBA',
    timestamp: '2026-07-31 10:15:22',
    category: 'Regulatory',
    sourceCount: 34,
    summary: 'UN treaty metadata verified with immutable seal on Ethereum Mainnet block #19821034.'
  },
  {
    id: '#VX-9826',
    subject: 'Neural Weight Checksum Core-7b',
    processingTime: '1.5s',
    status: 'COMPLETED',
    confidence: 99.9,
    hash: '0x8821BFA0099233817162553311AABBCCDDEEFF00',
    timestamp: '2026-07-31 09:50:10',
    category: 'AI Integrity',
    sourceCount: 8,
    summary: 'Model weightSHA-256 validated against HuggingFace official signature repo.'
  }
];

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EVID-1001',
    title: 'Q4 Fiscal Policy Verification',
    sourceUrl: 'https://gov.archive/fiscal/q4-report',
    hash: 'f2d9a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6',
    timestamp: 'Oct 31, 2026 14:32:05 UTC',
    reliability: 98.4,
    category: 'Government',
    nodeId: 'CN-7781-ALPHA',
    verifiedByNodes: 14,
    mimeType: 'application/pdf (Parsed Text)',
    contentSnapshot: 'EXECUTIVE SUMMARY: Quarterly fiscal appropriations for the period ending December 2026 show a surplus of $4.2B in infrastructure reinvestment funds... Digital signatures identified for: Office of Budget Management, Secretary of Treasury. All signatures cross-referenced with public key registry successfully.'
  },
  {
    id: 'EVID-1002',
    title: 'Climate Accord Metadata Seal',
    sourceUrl: 'https://un-climate.int/registry/v2/seal-4049',
    hash: '3a1c90fb9876543210fedcba9876543210fedcba9876543210fedcba98765432',
    timestamp: 'Oct 31, 2026 12:11:44 UTC',
    reliability: 94.1,
    category: 'Academic',
    nodeId: 'CN-3390-BETA',
    verifiedByNodes: 28,
    mimeType: 'text/json (Signed JSON-LD)',
    contentSnapshot: 'PROTOCOL SEAL: Global emission verification ledger block #89123. Emissions cap metrics certified by 3 independent satellite telemetry providers.'
  },
  {
    id: 'EVID-1003',
    title: 'Social Media Sentiment Blob',
    sourceUrl: 'https://api.sentiment.io/stream/v4/bulk-dump',
    hash: '77eebb219876543210fedcba9876543210fedcba9876543210fedcba98765432',
    timestamp: 'Oct 30, 2026 23:59:59 UTC',
    reliability: 42.8,
    category: 'Social',
    nodeId: 'CN-9012-GAMMA',
    verifiedByNodes: 3,
    mimeType: 'application/x-ndjson',
    contentSnapshot: 'STREAM SAMPLE: High bot density detected (57% non-human heuristic match). Automated coordination patterns identified across 1,200 synthetic user accounts.'
  },
  {
    id: 'EVID-1004',
    title: 'Neural Network Weight Checksum',
    sourceUrl: 'https://huggingface.co/veridion/core-7b/commit/a8f9',
    hash: 'd5c2ff119876543210fedcba9876543210fedcba9876543210fedcba98765432',
    timestamp: 'Oct 30, 2026 18:04:12 UTC',
    reliability: 99.9,
    category: 'Repository',
    nodeId: 'CN-1029-DELTA',
    verifiedByNodes: 52,
    mimeType: 'application/octet-stream',
    contentSnapshot: 'CHECKSUM MATCH: Model core-7b.safetensors hash matches official release candidate signed by Veridion Labs GPG Key ID 0x90A1F82B.'
  },
  {
    id: 'EVID-1005',
    title: 'Interbank Settlement Audit Trail',
    sourceUrl: 'https://swift.gateway.net/audit/2026/tx-9901',
    hash: '88a109bf876543210fedcba9876543210fedcba9876543210fedcba98765432',
    timestamp: 'Oct 29, 2026 09:15:30 UTC',
    reliability: 97.8,
    category: 'Financial',
    nodeId: 'CN-4411-EPSILON',
    verifiedByNodes: 19,
    mimeType: 'application/xml (ISO 20022)',
    contentSnapshot: 'SETTLEMENT ACKNOWLEDGMENT: ISO20022 pacs.008 message processed. Double-entry ledger state reconciled with Zero-Knowledge proof.'
  }
];

export const MOCK_REPORTS: Record<string, VerificationReportData> = {
  'VR-99021': {
    reportId: 'VR-99021',
    title: 'COVID Claim Verification',
    generatedAt: '31 July 2026',
    confidence: 96,
    classification: 'False Context',
    sourcesAnalyzedCount: 1242,
    analysisTime: '1.2 Seconds',
    summary: 'The claim suggests that new clinical data proves immediate cessation of all COVID-19 protocols is mandatory due to "universal immunity." Our AI engine has identified that this claim leverages outdated data from 2024 and misinterprets a specific localized study from Northern Europe as a global consensus. While population immunity has increased, the claim explicitly ignores current WHO and CDC guidelines regarding seasonal variants. The narrative structure is typical of coordinated misinformation campaigns aimed at destabilizing local public health infrastructure.',
    level: 'High Precision AI',
    ledgerSignature: '0x882...1FA',
    networkGraphUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl9qut9RxYYY7Z-iFVIT5z1z3TPw2BMmDWIhpIIzHCxjH7NT6f54cdFnW33dc__0Eb4I14yvhAFgxtt78Kmp6IU5GrA6TK9p_PykHlbK7yIeK0QsyXCy49JkTGx0-n5oVWmnbVC_movEDVV61JgAOhFJE-pI8YDOXrqoZHpe4J1Ypc0fV3Z2J0VTusIUP8Q_vWgaTujCDB3e35JbrGidkVw5OZVzAIPkz2GaPc-7yWfc2AD8wT8dzN',
    reasoning: [
      {
        stepNumber: '01',
        title: 'Temporal Anachronism',
        description: 'The source documentation cited in the claim was published in July 2024, yet the claim presents it as "breaking news" in 2026. This 2-year lag is a primary indicator of context manipulation.'
      },
      {
        stepNumber: '02',
        title: 'Statistical Cherry-picking',
        description: 'The claim isolates a 0.04% decrease in hospitalization in a cohort of 500 people, ignoring a concurrent 12% rise in broader demographics within the same study.'
      },
      {
        stepNumber: '03',
        title: 'Linguistic Sentiment Analysis',
        description: 'The phrasing uses high-arousal emotional triggers ("scandal", "hidden truth", "exposed") which is statistically correlated with 89% of verified disinformation campaigns.'
      }
    ],
    entities: [
      {
        id: 'ent-1',
        name: 'Dr. Aris Thorne',
        role: 'Lead Researcher',
        veracity: 'VERIFIED',
        impact: 'Low'
      },
      {
        id: 'ent-2',
        name: 'Journal of Viral Stat',
        role: 'Publication Source',
        veracity: 'FLAGGED',
        impact: 'High'
      },
      {
        id: 'ent-3',
        name: '"Universal Immunity"',
        role: 'Key Phrase',
        veracity: 'SUBJECTIVE',
        impact: 'Critical'
      }
    ]
  },
  'VR-99022': {
    reportId: 'VR-99022',
    title: 'Asset Authenticity V-02 Audit',
    generatedAt: '31 July 2026',
    confidence: 98,
    classification: 'Fully Verified',
    sourcesAnalyzedCount: 850,
    analysisTime: '0.8 Seconds',
    summary: 'Asset Authenticity V-02 has been validated against 18 institutional vaults and real-time land registry databases. Custody transfers are fully traceable with zero gap in chain of title.',
    level: 'Enterprise Institutional',
    ledgerSignature: '0x32F...99B',
    networkGraphUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl9qut9RxYYY7Z-iFVIT5z1z3TPw2BMmDWIhpIIzHCxjH7NT6f54cdFnW33dc__0Eb4I14yvhAFgxtt78Kmp6IU5GrA6TK9p_PykHlbK7yIeK0QsyXCy49JkTGx0-n5oVWmnbVC_movEDVV61JgAOhFJE-pI8YDOXrqoZHpe4J1Ypc0fV3Z2J0VTusIUP8Q_vWgaTujCDB3e35JbrGidkVw5OZVzAIPkz2GaPc-7yWfc2AD8wT8dzN',
    reasoning: [
      {
        stepNumber: '01',
        title: 'Cryptographic Chain Reconciliation',
        description: 'Every token transfer correlates 1:1 with signed SWIFT bank wire messages.'
      },
      {
        stepNumber: '02',
        title: 'Biometric Notary Validation',
        description: 'Notarized signatures verified via zk-SNARK biometric proof.'
      }
    ],
    entities: [
      {
        id: 'ent-10',
        name: 'Globex Custody Corp',
        role: 'Asset Custodian',
        veracity: 'VERIFIED',
        impact: 'Low'
      },
      {
        id: 'ent-11',
        name: 'Registry Seal 992',
        role: 'Government Registrar',
        veracity: 'VERIFIED',
        impact: 'Medium'
      }
    ]
  }
};

export const MOCK_BLOCKCHAIN_PROOF: BlockchainProofData = {
  merkleRoot: '0x8A9B2F4C7D6E5A4B3C2D1E0F9A8B7C6D5E4F3A2B1C0D9E8F7A6B5C4D3E2F1A0',
  txHash: '0x98AA76543210FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210FEDC',
  digitalSignature: 'ED25519-SIG-8921-X9042-VERIDION-MAINNET',
  protocol: 'Veridion zk-Proof v2.4',
  network: 'Ethereum Mainnet',
  blockNumber: 19842109,
  confirmedAt: '2026-07-31 10:07:22 UTC',
  timeline: [
    {
      title: 'Claim Submitted',
      timestamp: '10:00 AM',
      detail: 'User ID: #8821 • Payload encrypted with AES-256-GCM',
      completed: true
    },
    {
      title: 'Evidence Collected',
      timestamp: '10:02 AM',
      detail: '14 unique data points gathered across 6 sovereign nodes',
      completed: true
    },
    {
      title: 'AI Analysis',
      timestamp: '10:05 AM',
      detail: 'Confidence Score: 99.8% • Zero hallucinations detected',
      completed: true
    },
    {
      title: 'Merkle Tree Generated',
      timestamp: '10:06 AM',
      detail: 'Binary Merkle Tree root created with Keccak-256',
      completed: true
    },
    {
      title: 'Blockchain Verification',
      timestamp: '10:07 AM',
      detail: 'Tx confirmed by 32 Ethereum validators (12 block depth)',
      completed: true
    }
  ]
};
