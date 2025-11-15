
interface LocalizedString {
  es: string;
  en: string;
}

interface TeamMember {
  name: string;
  role: LocalizedString;
  bio: LocalizedString;
}

interface Document {
  name: LocalizedString;
  url: string;
}

interface Compliance {
  tokenStandard: string;
  legalStructure: LocalizedString;
  custodian: LocalizedString;
  kycRequired: boolean;
  legalDocuments: Document[];
}

interface InvestmentSummary {
  currency: string;
  estimatedTotalReturn: string;
  quarterlyPayment: string;
  totalDuration: string;
  minimumInvestment: string;
  fiduciary: string;
  developer: string;
  constructor: string;
  legalVehicle: string;
  location: string;
  capexTotal: string;
  capitalTokenizado: string;
  tir: string;
  payback: string;
}

export interface ProjectData {
  id: string;
  name: LocalizedString;
  projectOverview: LocalizedString;
  description: LocalizedString;
  image: string;
  images: string[];
  fundingGoal: number;
  amountRaised: number;
  investors: number;
  pricePerToken: number;
  team: TeamMember[];
  documents: Document[];
  compliance: Compliance;
  investmentSummary: InvestmentSummary;
}
