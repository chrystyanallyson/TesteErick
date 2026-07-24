export interface Product {
  id: string;
  name: string;
  price: number; // in BRL float e.g. 3.50
}

export interface HeaderInfo {
  companyName: string;
  emails: string[];
  address: string;
  phones: string;
  title: string;
  lastUpdated: string;
}

export type ViewMode = 'split' | 'single'; // split = 2 twin columns like original image, single = 1 long table
