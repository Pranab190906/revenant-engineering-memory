import { subDays } from 'date-fns';

export interface Developer {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface FileData {
  id: string;
  path: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  decisionCount: number;
  contributorCount: number;
  primaryContributorId: string;
  undocumentedCount: number;
  lastContribution: string;
  evidenceCoverage: number;
}

export interface Evidence {
  id: string;
  type: 'PR' | 'COMMIT' | 'COMMENT' | 'ISSUE' | 'INTERVIEW';
  content: string;
  authorId: string;
  date: string;
  fileId: string;
  prNumber?: string;
  commitHash?: string;
  line?: string;
}

export interface Decision {
  id: string;
  question: string;
  fileId: string;
  evidenceIds: string[]; // empty if undocumented
  isUndocumented: boolean;
  status: 'DOCUMENTED' | 'UNDOCUMENTED';
}

export const developers: Record<string, Developer> = {
  dev1: { id: 'dev1', name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=dev1', role: 'Staff Engineer' },
  dev2: { id: 'dev2', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=dev2', role: 'Senior Engineer' },
  dev3: { id: 'dev3', name: 'Daniel Kim', avatar: 'https://i.pravatar.cc/150?u=dev3', role: 'Engineer' },
  dev4: { id: 'dev4', name: 'Elena Rodriguez', avatar: 'https://i.pravatar.cc/150?u=dev4', role: 'Principal Engineer' },
  dev5: { id: 'dev5', name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=dev5', role: 'Engineer' },
  dev6: { id: 'dev6', name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=dev6', role: 'Senior Engineer' },
  dev7: { id: 'dev7', name: 'Michael Chang', avatar: 'https://i.pravatar.cc/150?u=dev7', role: 'Staff Engineer' },
  dev8: { id: 'dev8', name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?u=dev8', role: 'Engineer' },
};

export const files: Record<string, FileData> = {
  f1: { id: 'f1', path: 'payment_service.py', riskLevel: 'HIGH', decisionCount: 14, contributorCount: 2, primaryContributorId: 'dev1', undocumentedCount: 4, lastContribution: '2021', evidenceCoverage: 71 },
  f2: { id: 'f2', path: 'auth_service.py', riskLevel: 'HIGH', decisionCount: 5, contributorCount: 1, primaryContributorId: 'dev2', undocumentedCount: 2, lastContribution: '2022', evidenceCoverage: 60 },
  f3: { id: 'f3', path: 'api_client.py', riskLevel: 'MEDIUM', decisionCount: 4, contributorCount: 3, primaryContributorId: 'dev4', undocumentedCount: 1, lastContribution: '2023', evidenceCoverage: 75 },
  f4: { id: 'f4', path: 'components/', riskLevel: 'LOW', decisionCount: 2, contributorCount: 6, primaryContributorId: 'dev1', undocumentedCount: 0, lastContribution: '2023', evidenceCoverage: 100 },
  f5: { id: 'f5', path: 'database.py', riskLevel: 'MEDIUM', decisionCount: 8, contributorCount: 2, primaryContributorId: 'dev2', undocumentedCount: 2, lastContribution: '2022', evidenceCoverage: 75 },
  f6: { id: 'f6', path: 'inventory_service.py', riskLevel: 'LOW', decisionCount: 6, contributorCount: 5, primaryContributorId: 'dev3', undocumentedCount: 0, lastContribution: '2023', evidenceCoverage: 100 },
  f7: { id: 'f7', path: 'dashboard.tsx', riskLevel: 'LOW', decisionCount: 3, contributorCount: 4, primaryContributorId: 'dev3', undocumentedCount: 0, lastContribution: '2023', evidenceCoverage: 100 },
};

export const allEvidence: Record<string, Evidence> = {
  e1: {
    id: 'e1',
    type: 'COMMENT',
    content: 'Retry count was capped at three after repeated retries caused duplicate payment-service requests during transient network failures.',
    authorId: 'dev1',
    date: '2019-05-14T10:30:00Z',
    fileId: 'f1',
    prNumber: '1842',
    line: '42'
  },
  e2: {
    id: 'e2',
    type: 'PR',
    content: 'Increased database connection timeout to 30s to prevent query drops during heavy batch processing windows.',
    authorId: 'dev2',
    date: '2021-08-22T14:15:00Z',
    fileId: 'f5',
    prNumber: '1921',
  },
  e3: {
    id: 'e3',
    type: 'PR',
    content: 'Cache TTL set to 300 seconds to balance between inventory staleness and API load limits.',
    authorId: 'dev3',
    date: '2022-11-03T09:45:00Z',
    fileId: 'f6',
    prNumber: '2014'
  }
};

for (let i = 4; i <= 50; i++) {
  const fileKeys = Object.keys(files);
  const devKeys = Object.keys(developers);
  allEvidence[`e${i}`] = {
    id: `e${i}`,
    type: ['PR', 'COMMIT', 'COMMENT', 'ISSUE'][Math.floor(Math.random() * 4)] as any,
    content: `Historical decision evidence snippet #${i}. This logic was implemented due to performance constraints.`,
    authorId: devKeys[Math.floor(Math.random() * devKeys.length)],
    date: subDays(new Date(), Math.floor(Math.random() * 1000)).toISOString(),
    fileId: fileKeys[Math.floor(Math.random() * fileKeys.length)],
    prNumber: Math.floor(Math.random() * 1000 + 3000).toString(),
    commitHash: Math.random().toString(16).substring(2, 9)
  };
}

export const decisions: Record<string, Decision> = {
  d1: {
    id: 'd1',
    question: 'Why is retry capped at 3?',
    fileId: 'f1',
    evidenceIds: ['e1'],
    isUndocumented: false,
    status: 'DOCUMENTED'
  },
  d2: {
    id: 'd2',
    question: 'Why is the timeout 30 seconds?',
    fileId: 'f5',
    evidenceIds: ['e2'],
    isUndocumented: false,
    status: 'DOCUMENTED'
  },
  d3: {
    id: 'd3',
    question: 'Why is cache TTL set to 300?',
    fileId: 'f6',
    evidenceIds: ['e3'],
    isUndocumented: false,
    status: 'DOCUMENTED'
  },
  d4: {
    id: 'd4',
    question: 'Why did Alex choose Redis?',
    fileId: 'f1',
    evidenceIds: [],
    isUndocumented: true,
    status: 'UNDOCUMENTED'
  },
  d5: {
    id: 'd5',
    question: 'Why is the connection timeout set to 30 seconds?',
    fileId: 'f5',
    evidenceIds: [],
    isUndocumented: true,
    status: 'UNDOCUMENTED'
  },
  d6: {
    id: 'd6',
    question: 'Why is this authentication workaround still required?',
    fileId: 'f2',
    evidenceIds: [],
    isUndocumented: true,
    status: 'UNDOCUMENTED'
  }
};

for (let i = 7; i <= 30; i++) {
  const isUndocumented = i > 22; // 8 undocumented total
  const fileKeys = Object.keys(files);
  decisions[`d${i}`] = {
    id: `d${i}`,
    question: `Autogenerated question about implementation details #${i}?`,
    fileId: fileKeys[Math.floor(Math.random() * fileKeys.length)],
    evidenceIds: isUndocumented ? [] : [`e${Math.floor(Math.random() * 47 + 4)}`],
    isUndocumented,
    status: isUndocumented ? 'UNDOCUMENTED' : 'DOCUMENTED'
  };
}
