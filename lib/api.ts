import { CONFIG } from '@/constants';
import type { Property, User, Loan } from '@/types';
import { DEMO_MODE, DEMO_PROPERTIES, DEMO_USER, DEMO_LOAN } from './demo-data';

class APIClient {
  private baseURL: string;

  constructor() {
    this.baseURL = CONFIG.API_URL;
  }

  /** True when no backend is configured and the demo fixtures are being served. */
  get isDemo(): boolean {
    return DEMO_MODE;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Get all properties
  async getProperties(owner?: string) {
    if (DEMO_MODE) {
      const properties = owner
        ? DEMO_PROPERTIES.filter((property) => property.owner === owner)
        : DEMO_PROPERTIES;
      return { success: true, properties };
    }
    const query = owner ? `?owner=${owner}` : '';
    return this.request<{ success: boolean; properties: Property[] }>(`/properties${query}`);
  }

  // Get single property
  async getProperty(propertyId: string) {
    if (DEMO_MODE) {
      const property = DEMO_PROPERTIES.find((item) => item.propertyId === propertyId);
      if (!property) throw new Error('Property not found in the demo dataset.');
      return { success: true, property };
    }
    return this.request<{ success: boolean; property: Property }>(`/properties/${propertyId}`);
  }

  // Submit new property
  async submitProperty(data: {
    owner: string;
    address: string;
    value: number;
    description?: string;
    tokenSupply?: number;
  }) {
    if (DEMO_MODE) {
      // Echo the submission back as a pending listing. It is not persisted: a reload
      // returns the fixture set. Saying so is better than implying a registry write.
      const property: Property = {
        propertyId: `demo-${Date.now().toString(36)}`,
        owner: data.owner,
        address: data.address,
        value: data.value,
        description: data.description ?? '',
        status: 'pending',
        tokenId: null,
        tokenAddress: null,
        tokenSupply: data.tokenSupply ?? 1_000,
        verifiedAt: null,
        createdAt: new Date().toISOString(),
      };
      return { success: true, property };
    }
    return this.request<{ success: boolean; property: Property }>('/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get loan details
  async getLoan(userAddress: string) {
    if (DEMO_MODE) return { success: true, loan: DEMO_LOAN };
    return this.request<{ success: boolean; loan: Loan }>(`/loans/${userAddress}`);
  }

  // Get user profile
  async getUser(accountId: string) {
    if (DEMO_MODE) return { success: true, user: { ...DEMO_USER, accountId } };
    return this.request<{ success: boolean; user: User }>(`/users/${accountId}`);
  }
}

export const api = new APIClient();
