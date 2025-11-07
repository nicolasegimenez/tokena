import { createContext, useContext, useState, useMemo } from 'react';

// Define the shape of the context
interface LanguageContextType {
  language: 'es' | 'en';
  setLanguage: (language: 'es' | 'en') => void;
  t: (key: string, vars?: object) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  es: {
    Home: 'Inicio',
    invest: 'Invertir',
    trade: 'p2p',
    create_project: 'Publica tu Proyecto',
    invest_market: 'Invest Market',
    discover_tokenized_opportunities: 'Descubre oportunidades de inversión tokenizadas',
    search: 'Buscar...',
    category: 'Categoría',
    all: 'Todos',
    real_estate: 'Real Estate',
    crypto: 'Crypto',
    startup: 'Startup',
    sort_by: 'Ordenar por',
    default: 'Defecto',
    price_asc: 'Precio: Menor a Mayor',
    price_desc: 'Precio: Mayor a Menor',
    roi_desc: 'ROI: Mayor a Menor',
    available: 'Disponible',
    sold_out: 'Agotado',
    expected_return: 'De Rentabilidad esperada en {currency} a {duration} meses',
    coming_soon: 'Próximamente',
    more_info: 'Más Info',
    // Investment data
    tokenized_apartments_title: 'Departamentos Pozo Tokenizados',
    tokenized_apartments_desc: 'Inversión en departamentos de lujo en zona premium con tokenización completa',
    crypto_fund_title: 'Fondo de Criptomonedas',
    crypto_fund_desc: 'Portfolio diversificado de criptomonedas principales con gestión profesional',
    tokenized_startup_title: 'Startup Tech Tokenizada',
    tokenized_startup_desc: 'Participación en startup de tecnología con gran potencial de crecimiento',
    // Create Project Page
    publish_new_project: 'Publicar Nuevo Proyecto de Inversión',
    fill_details_for_investors: 'Completa los detalles para que otros usuarios puedan invertir en tu proyecto.',
    project_name: 'Nombre del Proyecto',
    my_innovative_project: 'Mi Innovador Proyecto',
    project_description: 'Descripción del Proyecto',
    describe_your_project: 'Describe tu proyecto en detalle...',
    funding_goal_usd: 'Objetivo de Financiación (USD)',
    project_image_url: 'URL de la Imagen del Proyecto',
    project_image_url_placeholder: 'https://ejemplo.com/imagen-proyecto.jpg',
    token_symbol: 'Símbolo del Token (Ej: MYPROJ)',
    total_token_supply: 'Suministro Total de Tokens',
    publish_project_button: 'Publicar Proyecto',
    by_publishing_note: 'Al publicar, tu proyecto estará visible para posibles inversores.',
    project_submitted_alert: 'Proyecto enviado (simulado)! Revisa la consola para los datos.',
    // User Dropdown
    my_account: 'Mi cuenta',
    my_profile: 'Mi Perfil',
    my_investments: 'Mis Inversiones',
    my_benefits: 'Mis Beneficios',
    logout: 'Salir',
    // Trade Page
    p2p_market: 'Mercado P2P',
    trade_security_tokens: 'Intercambia security tokens de forma segura y eficiente.',
    filters: 'Filtros',
    search_by_name: 'Buscar por nombre...',
    all_categories: 'Todas las categorías',
    energy: 'Energía',
    venture_capital: 'Capital de Riesgo',
    collectibles: 'Coleccionables',
    newest: 'Más recientes',
    clear_filters: 'Limpiar Filtros',
    buy_tokens: 'Comprar Tokens',
    sell_my_tokens: 'Vender Mis Tokens',
    buy_now: 'Comprar Ahora',
    create_sell_offer: 'Crear una Oferta de Venta',
    publish_your_tokens: 'Publica tus tokens en el mercado para que otros los compren.',
    token_to_sell: 'Token a Vender',
    select_from_portfolio: 'Selecciona de tu portafolio',
    available_to_sell: 'disponibles',
    quantity: 'Cantidad',
    quantity_placeholder: 'Ej: 10',
    price_per_token_usd: 'Precio por Token (USD)',
    price_placeholder: 'Ej: 105.50',
    publish_sell_offer: 'Publicar Oferta de Venta',
    sell_offer_created: '¡Oferta de venta creada (simulado)!',
    buy_listing_simulated: '¡Has comprado (simulado) el listing {listingId}!',
  },
  en: {
    invest: 'Invest',
    trade: 'Trade',
    create_project: 'Publish Your Project',
    invest_market: 'Invest Market',
    discover_tokenized_opportunities: 'Discover tokenized investment opportunities',
    search: 'Search...',
    category: 'Category',
    all: 'All',
    real_estate: 'Real Estate',
    crypto: 'Crypto',
    startup: 'Startup',
    sort_by: 'Sort by',
    default: 'Default',
    price_asc: 'Price: Low to High',
    price_desc: 'Price: High to Low',
    roi_desc: 'ROI: High to Low',
    available: 'Available',
    sold_out: 'Sold Out',
    expected_return: 'Of expected return in {currency} at {duration} months',
    coming_soon: 'Coming Soon',
    more_info: 'More Info',
    // Investment data
    tokenized_apartments_title: 'Tokenized Apartments',
    tokenized_apartments_desc: 'Investment in luxury apartments in a premium area with complete tokenization',
    crypto_fund_title: 'Cryptocurrency Fund',
    crypto_fund_desc: 'Diversified portfolio of major cryptocurrencies with professional management',
    tokenized_startup_title: 'Tokenized Tech Startup',
    tokenized_startup_desc: 'Participation in a technology startup with great growth potential',
    // Create Project Page
    publish_new_project: 'Publish New Investment Project',
    fill_details_for_investors: 'Complete the details so other users can invest in your project.',
    project_name: 'Project Name',
    my_innovative_project: 'My Innovative Project',
    project_description: 'Project Description',
    describe_your_project: 'Describe your project in detail...',
    funding_goal_usd: 'Funding Goal (USD)',
    project_image_url: 'Project Image URL',
    project_image_url_placeholder: 'https://example.com/project-image.jpg',
    token_symbol: 'Token Symbol (e.g., MYPROJ)',
    total_token_supply: 'Total Token Supply',
    publish_project_button: 'Publish Project',
    by_publishing_note: 'By publishing, your project will be visible to potential investors.',
    project_submitted_alert: 'Project submitted (simulated)! Check the console for the data.',
    // User Dropdown
    my_account: 'My Account',
    my_profile: 'My Profile',
    my_investments: 'My Investments',
    my_benefits: 'My Benefits',
    logout: 'Logout',
    // Trade Page
    p2p_market: 'P2P Market',
    trade_security_tokens: 'Trade security tokens securely and efficiently.',
    filters: 'Filters',
    search_by_name: 'Search by name...',
    all_categories: 'All categories',
    energy: 'Energy',
    venture_capital: 'Venture Capital',
    collectibles: 'Collectibles',
    newest: 'Newest',
    clear_filters: 'Clear Filters',
    buy_tokens: 'Buy Tokens',
    sell_my_tokens: 'Sell My Tokens',
    buy_now: 'Buy Now',
    create_sell_offer: 'Create Sell Offer',
    publish_your_tokens: 'Publish your tokens on the market for others to buy.',
    token_to_sell: 'Token to Sell',
    select_from_portfolio: 'Select from your portfolio',
    available_to_sell: 'available',
    quantity: 'Quantity',
    quantity_placeholder: 'e.g., 10',
    price_per_token_usd: 'Price per Token (USD)',
    price_placeholder: 'e.g., 105.50',
    publish_sell_offer: 'Publish Sell Offer',
    sell_offer_created: 'Sell offer created (simulated)!',
    buy_listing_simulated: 'You have bought (simulated) listing {listingId}!',
  },
};

// Create the provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const t = (key: string, vars: object = {}) => {
    let translation = translations[language][key] || key;
    for (const [varKey, varValue] of Object.entries(vars)) {
      translation = translation.replace(`{${varKey}}`, String(varValue));
    }
    return translation;
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Create a custom hook for using the context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
