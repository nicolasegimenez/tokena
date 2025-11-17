import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { marketProjects } from '@/lib/market-data';

// Types
export interface Listing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  quantity: number;
  pricePerToken: number;
  seller: string;
  image: string;
  category: string;
  marketUrl: string;
  paymentMethods: string[];
  totalDuration: string;
}

export interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  categories: string[];
  paymentMethods: string[];
  minRating: number;
  availability: string[];
  minSales: number;
}

export interface FavoriteListing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  pricePerToken: number;
  image: string;
  category: string;
  seller: string;
  addedDate: Date;
}

export interface ComparisonListing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  pricePerToken: number;
  quantity: number;
  category: string;
  seller: string;
  paymentMethods: string[];
  totalDuration: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  projectName: string;
  tokenSymbol: string;
  quantity: number;
  pricePerToken: number;
  totalAmount: number;
  seller?: string;
  buyer?: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'cancelled' | 'processing';
  date: Date;
  completionDate?: Date;
  invoiceUrl?: string;
}

export const useTradePage = () => {
  const location = useLocation();
  const lastScrollY = useRef(0);

  // Tabs & UI State
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'favorites' | 'history'>('buy');
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filters State
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    searchTerm: '',
    priceRange: [0, 1000],
    categories: [],
    paymentMethods: [],
    minRating: 0,
    availability: [],
    minSales: 0,
  });

  // Favorites State
  const [favorites, setFavorites] = useState<FavoriteListing[]>([]);

  // Comparisons State
  const [comparisons, setComparisons] = useState<ComparisonListing[]>([]);

  // Trading Data State
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Sell Form State
  const [selectedTokenToSell, setSelectedTokenToSell] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  // Dialog State
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Smart scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setShowHeader(false);
        setShowMobileFilters(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation from investments page
  useEffect(() => {
    if (location.state?.tab === 'sell') {
      setActiveTab('sell');
      if (location.state?.tokenSymbol) {
        setSelectedTokenToSell(location.state.tokenSymbol);
      }
    }
  }, [location]);

  // Filter listings with advanced filters
  const filteredListings = useMemo(() => {
    let listings = (marketProjects as Listing[]).filter(listing => {
      // Search term filter
      if (advancedFilters.searchTerm) {
        const term = advancedFilters.searchTerm.toLowerCase();
        const matches =
          listing.projectName.toLowerCase().includes(term) ||
          listing.tokenSymbol.toLowerCase().includes(term);
        if (!matches) return false;
      }

      // Price range filter
      if (listing.pricePerToken < advancedFilters.priceRange[0] ||
          listing.pricePerToken > advancedFilters.priceRange[1]) {
        return false;
      }

      // Category filter
      if (advancedFilters.categories.length > 0) {
        const categoryId = listing.category.toLowerCase().replace(' ', '-');
        if (!advancedFilters.categories.includes(categoryId)) return false;
      }

      // Payment methods filter
      if (advancedFilters.paymentMethods.length > 0) {
        const hasPaymentMethod = advancedFilters.paymentMethods.some(method =>
          listing.paymentMethods.includes(method)
        );
        if (!hasPaymentMethod) return false;
      }

      return true;
    });

    // Sort listings
    listings.sort((a, b) => {
      switch (advancedFilters.searchTerm) {
        case 'price-desc':
          return b.pricePerToken - a.pricePerToken;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        case 'price-asc':
        default:
          return a.pricePerToken - b.pricePerToken;
      }
    });

    return listings;
  }, [advancedFilters]);

  // Handlers
  const handleAdvancedFilterChange = useCallback((newFilters: FilterState) => {
    setAdvancedFilters(newFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setAdvancedFilters({
      searchTerm: '',
      priceRange: [0, 1000],
      categories: [],
      paymentMethods: [],
      minRating: 0,
      availability: [],
      minSales: 0,
    });
  }, []);

  const handleToggleFavorite = useCallback((listing: Listing) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === listing.id);
      if (exists) {
        return prev.filter(f => f.id !== listing.id);
      } else {
        return [...prev, {
          id: listing.id,
          projectName: listing.projectName,
          tokenSymbol: listing.tokenSymbol,
          pricePerToken: listing.pricePerToken,
          image: listing.image,
          category: listing.category,
          seller: listing.seller,
          addedDate: new Date(),
        }];
      }
    });
  }, []);

  const handleToggleComparison = useCallback((listing: Listing) => {
    setComparisons(prev => {
      const exists = prev.some(c => c.id === listing.id);
      if (exists) {
        return prev.filter(c => c.id !== listing.id);
      } else if (prev.length < 4) {
        return [...prev, {
          id: listing.id,
          projectName: listing.projectName,
          tokenSymbol: listing.tokenSymbol,
          pricePerToken: listing.pricePerToken,
          quantity: listing.quantity,
          category: listing.category,
          seller: listing.seller,
          paymentMethods: listing.paymentMethods,
          totalDuration: listing.totalDuration,
        }];
      }
      return prev;
    });
  }, []);

  const handleBuyClick = useCallback((listing: Listing) => {
    setSelectedListing(listing);
    setIsTradeDialogOpen(true);
  }, []);

  const handleSellSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sell logic with API
    alert('Oferta de venta creada exitosamente');
    setSelectedTokenToSell('');
    setSellQuantity('');
    setSellPrice('');
  }, []);

  const handleRemoveFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }, []);

  const handleRemoveComparison = useCallback((id: string) => {
    setComparisons(prev => prev.filter(c => c.id !== id));
  }, []);

  return {
    // Tab & UI State
    activeTab,
    setActiveTab,
    filterCollapsed,
    setFilterCollapsed,
    showHeader,
    showMobileFilters,
    setShowMobileFilters,

    // Filters
    advancedFilters,
    handleAdvancedFilterChange,
    handleResetFilters,
    filteredListings,

    // Favorites & Comparisons
    favorites,
    comparisons,
    handleToggleFavorite,
    handleToggleComparison,
    handleRemoveFavorite,
    handleRemoveComparison,

    // Trading Data
    transactions,
    setTransactions,

    // Sell Form
    selectedTokenToSell,
    setSelectedTokenToSell,
    sellQuantity,
    setSellQuantity,
    sellPrice,
    setSellPrice,
    handleSellSubmit,

    // Dialog
    isTradeDialogOpen,
    setIsTradeDialogOpen,
    selectedListing,
    setSelectedListing,
    handleBuyClick,
  };
};
