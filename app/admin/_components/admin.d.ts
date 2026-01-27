// To make this a module
export {};

/**
 * Defines the structure for a single content item used across CMS categories.
 */
export interface ContentItem {
  id: number;
  title: string;
  text?: string;
  content?: string; // For IR data, can be merged with text
  date?: string;
  order?: number;
  link?: string;
  buttonText?: string;
  image?: string;
  weight?: 'bold' | 'normal'; // For press items
}

/**
 * Defines the structure for all settings managed in the admin panel.
 */
export interface AdminState {
  prices?: {
    haru?: { price?: string; link?: string; available?: boolean; };
    heartsend?: { price?: string; link?: string; available?: boolean; };
    b2b?: { available?: boolean; email?: string; info?: string; };
  };
  banner?: {
    showTop?: boolean;
    top?: { message?: string; link?:string; color?: string; type?: 'none' | 'normal' | 'trip' | 'cs' | 'temp'; };
    showBottom?: boolean;
    bottom?: { message?: string; link?: string; color?: string; };
    showPopup?: boolean;
    popup?: { title?: string; message?: string; };
    lastModified?: string;
  };
  cookieSettings?: {
    enabled?: boolean;
    mode?: 'once' | 'always' | 'none';
  };
  content?: {
    brandStory?: ContentItem[];
    press?: ContentItem[];
    careers?: ContentItem[];
    events?: ContentItem[];
    faq?: ContentItem[];
    ir?: ContentItem[];
  };
  cta?: {
    mainContactEmail?: string;
    additionalInquiryLink?: string;
    contactPartner?: string;
  };
}