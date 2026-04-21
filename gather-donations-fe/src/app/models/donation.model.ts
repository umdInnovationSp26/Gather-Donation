// ── API response shapes (mirror Django serializers) ──────────────────────────

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  location: string;
  bio: string;
  profile_picture: string | null;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export type DonationCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor';
export type DonationStatus = 'available' | 'reserved' | 'donated' | 'cancelled';
export type RequestUrgency = 'low' | 'medium' | 'high' | 'critical';
export type RequestStatus = 'open' | 'fulfilled' | 'cancelled';
export type MatchStatus = 'pending' | 'accepted' | 'completed' | 'rejected';

export interface DonationItem {
  id: number;
  donor: number;
  donor_name: string;
  title: string;
  description: string;
  category: number | null;
  category_name: string;
  condition: DonationCondition;
  location: string;
  status: DonationStatus;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface DonationRequest {
  id: number;
  requester: number;
  requester_name: string;
  title: string;
  description: string;
  category: number | null;
  category_name: string;
  urgency: RequestUrgency;
  location: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export interface DonationMatch {
  id: number;
  donation_item: number;
  donation_request: number;
  status: MatchStatus;
  matched_by: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

// ── Auth payloads ─────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
  phone?: string;
  location?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
  user: User;
}

// ── Legacy mock alias kept so existing components don't break immediately ─────
// Components that reference the old `Donation` type will be migrated to
// `DonationItem` incrementally.
export type Donation = DonationItem;
