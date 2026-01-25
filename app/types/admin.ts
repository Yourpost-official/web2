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

export interface AdminState {
  isLoggingEnabled?: boolean;
  prices?: {
    haru?: PriceInfo;
    heartsend?: PriceInfo;
    b2b?: PriceInfo;
  };
  assets?: { proposalLink?: string; brandKit?: string; };
  cta?: { [key: string]: string };
  banner?: {
    showTop: boolean;
    showPopup?: boolean;
    top?: { type?: string; message: string; color?: string; link?: string; };
    popup?: { title: string; message: string; type?: string; };
    showBottom?: boolean;
    bottom?: { message: string; color?: string; link?: string; };
  };
  cookieSettings?: {
    enabled: boolean;
    mode?: 'once' | 'always' | 'none'; // 쿠키 안내 표시 빈도 설정
  };
  content?: {
    [key: string]: ContentItem[];
  };
}