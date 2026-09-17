/**
 * Demo fixtures.
 *
 * TerraCred's frontend was split from its backend so the repository could be published
 * without the Hedera operator keys that were committed alongside it. With no backend
 * hosted, every API call used to fall through to http://localhost:3001 and fail, which
 * meant the public site showed a UI whose data never loaded.
 *
 * These fixtures stand in when no backend is configured. They are labelled as samples on
 * purpose: the point is a site that demonstrates the product honestly, not one that
 * pretends to hold real registry data.
 *
 * Set NEXT_PUBLIC_API_URL to a hosted backend and none of this is used.
 */

import type { Property, User, Loan } from '@/types';

export const DEMO_PROPERTIES: Property[] = [
  {
    propertyId: 'demo-001',
    owner: '0.0.4472901',
    address: 'Sample listing: 12 Adeola Odeku Street, Victoria Island, Lagos',
    value: 185_000,
    description:
      'Three-bedroom apartment used here as a worked example of a verified listing. Title documents checked, tokenised at 1,000 shares.',
    status: 'verified',
    tokenId: '0.0.4472955',
    tokenAddress: '0x0000000000000000000000000000000004437cbb',
    tokenSupply: 1_000,
    verifiedAt: '2026-08-12T09:20:00.000Z',
    createdAt: '2026-08-04T11:05:00.000Z',
  },
  {
    propertyId: 'demo-002',
    owner: '0.0.4472901',
    address: 'Sample listing: 7 Glover Road, Ikoyi, Lagos',
    value: 420_000,
    description:
      'Detached house shown mid-review, to illustrate what a listing looks like before verification completes.',
    status: 'pending',
    tokenId: null,
    tokenAddress: null,
    tokenSupply: 2_000,
    verifiedAt: null,
    createdAt: '2026-09-01T15:42:00.000Z',
  },
  {
    propertyId: 'demo-003',
    owner: '0.0.4481120',
    address: 'Sample listing: 25 Ogunlana Drive, Surulere, Lagos',
    value: 96_000,
    description:
      'Smaller unit included so the collateral maths is visible across a range of values.',
    status: 'verified',
    tokenId: '0.0.4473102',
    tokenAddress: '0x0000000000000000000000000000000004437d5e',
    tokenSupply: 500,
    verifiedAt: '2026-07-28T08:15:00.000Z',
    createdAt: '2026-07-19T13:30:00.000Z',
  },
];

export const DEMO_USER: User = {
  userId: 'demo-user-001',
  accountId: '0.0.4472901',
  email: 'demo@terracred.example',
  name: 'Demo Account',
  kycStatus: 'verified',
  createdAt: '2026-07-02T10:00:00.000Z',
};

export const DEMO_LOAN: Loan = {
  collateralAmount: '185000',
  collateralToken: 'TCRED-001',
  borrowedAmount: '92500',
  totalDebt: '94180',
  healthFactor: '1.96',
  maxBorrow: '129500',
};

/** True when no backend has been configured, so the fixtures above should be served. */
export const DEMO_MODE = !process.env.NEXT_PUBLIC_API_URL;
