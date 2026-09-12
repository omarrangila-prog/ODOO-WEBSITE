/**
 * SELECTED CLIENTS
 *
 * Source: the Kausar Innovations company profile ("Selected Clients" pages),
 * supplied by the business owner. ODOOVATIONS is part of the Kausar
 * Innovations group; these are group clients, and the site says so — it does
 * not present them as projects delivered under the ODOOVATIONS name unless a
 * case study in data/caseStudies.ts says otherwise.
 *
 * The profile states that every organisation name is verified against a
 * contract, invoice, website or approved logo file before publication. Names
 * are rendered typographically only. Logos are NOT published: the profile
 * publishes a logo only where an official high-resolution file and written
 * permission are held, and no such files exist in this repository.
 *
 * Spelling is reproduced exactly as printed in the profile.
 */
export interface ClientSector {
  id: string;
  name: string;
  /** Industry page this sector most closely maps to, for internal linking. */
  industryHref?: string;
  clients: string[];
  /** A scale statement printed in the profile, reproduced with attribution. */
  note?: string;
}

export const clientSource = {
  parentCompany: 'Kausar Innovations',
  document: 'Kausar Innovations company profile — Selected Clients',
  verificationStatement:
    'Every organisation name is verified against a contract, invoice, website or approved logo file before the profile is printed or distributed.',
};

export const clientSectors: ClientSector[] = [
  {
    id: 'education',
    name: 'Schools and Educational Institutions',
    industryHref: '/industries/education',
    clients: ['Ronaq-e-Islam School', 'Amma Foundation', 'KPS', 'Jamiat Education Board', 'JEB College'],
    note: 'And 50+ Iqra Madrasas and 150+ educational institutes.',
  },
  {
    id: 'fmcg',
    name: 'FMCG and Food Industries',
    industryHref: '/industries/food-hospitality',
    clients: [
      'Khan Foods Industry',
      'Unika Foods Industry',
      'Edison Foods Industry',
      'Kaysons',
      'Burraq Foods',
      'Niaz Foods',
      'SB Foods',
    ],
  },
  {
    id: 'commodities',
    name: 'Pulses, Commodities and Importers',
    industryHref: '/industries/import-export',
    clients: [
      'Sadabahar International',
      'Hamza Hafeez Oil Company',
      'Z.S. International',
      'Pak Grain Enterprises',
      'Hunza Enterprises',
      'Balagam International',
      'Madina Daal Mill',
      'Polani Traders',
      'Royal Grains',
      'HM Commodity',
      'Hafsa Commodities',
      'Pakistan Brokerage by Bin Balagam',
    ],
  },
  {
    id: 'publishing',
    name: 'Publishers',
    clients: [
      'Gohar Publishers',
      'Sheikh Shokat Ali & Sons',
      'Kashif Book Agency',
      'Pelican',
      'Maktab-ul-Gani',
      'Faisal Kitab Ghar',
      'Grace Publisher',
      'Sprint Educational',
    ],
  },
  {
    id: 'wholesale-retail',
    name: 'Wholesalers and Retailers',
    industryHref: '/industries/wholesale-trading',
    clients: [
      'Qadri Eggs',
      'Fort Industries',
      'Imran Attari',
      'SA Traders',
      'H.S. Machinery',
      'Yousuf Brothers',
      'Blue Zone',
      'Bilwani Furnitures',
      'Kiddies',
      'New Memon Mart',
      'Memon Trader',
      'Karachi Branded Collection',
      'Zaib Traders',
      'United Poultry Products',
      'Shanu Candy',
    ],
  },
  {
    id: 'textile',
    name: 'Textile Industries',
    industryHref: '/industries/textile-apparel',
    clients: [
      'Denim E',
      'Kamran Fabrics',
      'HA Traders',
      'SK Traders',
      'Guarantee Mills',
      'SSS Corporation',
      'Hafiz Textiles',
      'Junior Garments',
      'AB Traders',
    ],
  },
  {
    id: 'associations',
    name: 'Business Solutions and Associations',
    industryHref: '/industries/professional-services',
    clients: ['Civil Aviation Club — CAC', 'Urdu Bazar Association'],
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    clients: ['Jumani Group of Companies', 'Al Jadeed Properties', 'Zain Real Builders'],
  },
];

export const clientCount = clientSectors.reduce((n, s) => n + s.clients.length, 0);

/**
 * A cross-sector sample for the homepage strip: one or two recognisable
 * names per sector so the strip reads as breadth rather than a wall.
 */
export const featuredClients: string[] = [
  'Jamiat Education Board',
  'Khan Foods Industry',
  'Sadabahar International',
  'Gohar Publishers',
  'Yousuf Brothers',
  'Kamran Fabrics',
  'Civil Aviation Club — CAC',
  'Jumani Group of Companies',
  'Madina Daal Mill',
  'Guarantee Mills',
  'Bilwani Furnitures',
  'Hafsa Commodities',
];
