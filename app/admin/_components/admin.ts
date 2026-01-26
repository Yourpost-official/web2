export type AdminRole = 'superadmin' | 'editor' | 'viewer';

export interface AdminUser {
  id: string;
  username: string;
  email?: string;
  role: AdminRole;
  lastLogin?: string;
}

export interface AdminSession {
  user: AdminUser | null;
  isAuthenticated: boolean;
  token?: string;
  expiresAt?: string;
}

export interface AdminBannerConfig {
  type?: string;
  message: string;
  color?: string;
  link?: string;
}

export interface AdminBanner {
  showTop: boolean;
  showPopup?: boolean;
  top?: AdminBannerConfig;
  popup?: { title: string; message: string; type?: string; };
  showBottom?: boolean;
  bottom?: AdminBannerConfig;
  lastModified?: string;
}

export interface ContentItem {
  id: number;
  title: string;
  text?: string;
  content?: string;
  date?: string;
  order?: number;
  image?: string;
  link?: string;
  buttonText?: string;
  size?: string;
  weight?: string;
  status?: string;
}

export interface PriceInfo {
  price?: string;
  link?: string;
  email?: string;
  info?: string;
  available: boolean;
}

export interface AdminContent {
  [key: string]: ContentItem[];
}

export interface AdminState {
  isLoggingEnabled?: boolean;
  prices?: {
    haru?: PriceInfo;
    heartsend?: PriceInfo;
    b2b?: PriceInfo;
  };
  assets?: { proposalLink?: string; brandKit?: string; };
  cta?: { [key: string]: string };
  banner?: AdminBanner;
  cookieSettings?: {
    enabled: boolean;
    mode?: 'once' | 'always' | 'none';
  };
  content?: AdminContent;
}

export interface AdminApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AdminLog {
  id: string;
  createdAt: string;
  ip: string;
  action: string;
  page?: string;
  consentMarketing?: boolean;
}

export interface AdminLogStats {
  action: string;
  _count: { action: number };
}