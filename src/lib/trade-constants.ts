import { Building2, Coins, Trees, Beef, CircleDot, Music, Tag, TrendingUp } from 'lucide-react';

// Icon mapping for categories
export const categoryIcons: Record<string, any> = {
  'Real Estate': Building2,
  'Crypto': Coins,
  'Agricultura': Trees,
  'Agriculture': Trees,
  'Ganadería': Beef,
  'Livestock': Beef,
  'Deportes': CircleDot,
  'Sports': CircleDot,
  'Entretenimiento': Music,
  'Entertainment': Music,
  'Startup': Building2,
  'Energy': TrendingUp,
  'Venture Capital': Coins,
  'Collectibles': Tag,
  'real-estate': Building2,
  'energy': TrendingUp,
  'venture-capital': Coins,
  'crypto': Coins,
  'collectibles': Tag,
};

// Payment method variant mapping
export const getPaymentMethodVariant = (method: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (method.toLowerCase()) {
    case 'transferencia bancaria':
      return 'default';
    case 'mercadopago':
      return 'secondary';
    case 'usdt':
    case 'btc':
    case 'eth':
      return 'outline';
    default:
      return 'default';
  }
};

// Mock user tokens
export const myTokens = [
  {
    id: 't1',
    projectName: 'Eco-Friendly Housing',
    tokenSymbol: 'ECOH',
    quantity: 200,
    availableToSell: 150,
    image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299810/edificio_qhi0ri.png'
  },
  {
    id: 't2',
    projectName: 'Tech Startup Fund',
    tokenSymbol: 'TSF',
    quantity: 100,
    availableToSell: 100,
    image: 'https://res.cloudinary.com/dhacybdxf/image/upload/v1762299809/ethereum_vs8k4y.png'
  },
];

// Categories configuration
export const CATEGORIES = [
  { id: 'real-estate', label: 'Bienes Raíces' },
  { id: 'energy', label: 'Energía' },
  { id: 'venture-capital', label: 'Capital de Riesgo' },
  { id: 'crypto', label: 'Cripto' },
  { id: 'collectibles', label: 'Coleccionables' },
];

// Payment methods
export const PAYMENT_METHODS = [
  'Transferencia bancaria',
  'MercadoPago',
  'USDT',
  'BTC',
  'ETH'
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Precio ascendente' },
  { value: 'price-desc', label: 'Precio descendente' },
  { value: 'newest', label: 'Más nuevo' },
];
