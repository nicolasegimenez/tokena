import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Wallet, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/lib/language';
import { useNavigate } from 'react-router-dom';

const InvestmentsPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Scroll detection states
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Smart scroll behavior for mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setShowHeader(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock data - Inversiones que posee el usuario
  const myInvestments = [
    {
      id: 1,
      title: "Apartamentos Tokenizados",
      symbol: "APT",
      quantity: 150,
      pricePerToken: 1000,
      currentValue: 150000,
      roi: 12.5,
      change24h: 1250,
      changePercent: 0.84,
      status: "active"
    },
    {
      id: 2,
      title: "Crypto Fund Premium",
      symbol: "CFP",
      quantity: 500,
      pricePerToken: 500,
      currentValue: 250000,
      roi: 18.7,
      change24h: 3500,
      changePercent: 1.42,
      status: "active"
    },
    {
      id: 3,
      title: "Startup Tecnológica",
      symbol: "TECH",
      quantity: 75,
      pricePerToken: 750,
      currentValue: 56250,
      roi: 25.3,
      change24h: 850,
      changePercent: 1.53,
      status: "active"
    },
    {
      id: 4,
      title: "Energía Solar",
      symbol: "SOLAR",
      quantity: 100,
      pricePerToken: 1500,
      currentValue: 150000,
      roi: 9.8,
      change24h: -1200,
      changePercent: -0.79,
      status: "active"
    }
  ];

  // Calcular totales
  const totalValue = myInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalChange = myInvestments.reduce((sum, inv) => sum + inv.change24h, 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Enhanced Header with Smart Scroll Behavior */}
      <div className={`border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 ease-in-out transform ${
        showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t('investments_page_title')}
              </h1>
              <p className="text-muted-foreground mt-2">
                {t('investments_page_desc')}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                ${totalValue.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Portfolio Summary */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
        {/* Total Value Card */}
        <Card className="border-2 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all">
          <CardHeader className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 flex flex-row items-center justify-between space-y-0 pb-2 rounded-t-lg">
            <CardTitle className="text-sm font-medium">{t('total_value')}</CardTitle>
            <Wallet className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-emerald-600">
              ${totalValue.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {t('active_assets', { count: myInvestments.length })}
            </p>
          </CardContent>
        </Card>

        {/* Change 24h Card */}
        <Card className="border-2 transition-all" style={{borderColor: totalChange >= 0 ? 'hsl(142, 71%, 45%)' : 'hsl(0, 84%, 60%)'}}>
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 rounded-t-lg ${
            totalChange >= 0 ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'
          }`}>
            <CardTitle className="text-sm font-medium">{t('change_24h')}</CardTitle>
            {totalChange >= 0 ? (
              <ArrowUpRight className="h-5 w-5 text-green-600" />
            ) : (
              <ArrowDownLeft className="h-5 w-5 text-red-600" />
            )}
          </CardHeader>
          <CardContent className="pt-4">
            <div className={`text-3xl font-bold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalChange >= 0 ? '+' : ''}${Math.abs(totalChange).toLocaleString('es-AR', { maximumFractionDigits: 0 })}
            </div>
            <p className={`text-xs mt-2 font-semibold ${totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        {/* Average ROI Card */}
        <Card className="border-2 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all">
          <CardHeader className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950 dark:to-emerald-950 flex flex-row items-center justify-between space-y-0 pb-2 rounded-t-lg">
            <CardTitle className="text-sm font-medium">{t('average_roi')}</CardTitle>
            <TrendingUp className="h-5 w-5 text-teal-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-teal-600">
              {(myInvestments.reduce((sum, inv) => sum + inv.roi, 0) / myInvestments.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {t('expected_annual_return')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Investments Table */}
      <Card className="border-2 hover:border-emerald-200 dark:hover:border-emerald-800">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
          <CardTitle className="text-2xl">{t('your_tokens')}</CardTitle>
          <CardDescription>
            {t('token_list_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('asset')}</TableHead>
                  <TableHead className="text-right">{t('quantity')}</TableHead>
                  <TableHead className="text-right">{t('unit_price')}</TableHead>
                  <TableHead className="text-right">{t('total_value_col')}</TableHead>
                  <TableHead className="text-right">{t('change_24h_col')}</TableHead>
                  <TableHead className="text-right">{t('annual_roi_col')}</TableHead>
                  <TableHead className="text-center">{t('status_col')}</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myInvestments.map((investment) => (
                  <TableRow key={investment.id} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-semibold text-foreground">{investment.title}</div>
                        <div className="text-sm text-muted-foreground">{investment.symbol}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {investment.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${investment.pricePerToken.toLocaleString('es-AR')}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-emerald-600">
                      ${investment.currentValue.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={investment.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <div className="font-bold flex items-center justify-end gap-1">
                          {investment.change24h >= 0 ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownLeft className="h-4 w-4" />
                          )}
                          {investment.change24h >= 0 ? '+' : ''}${Math.abs(investment.change24h).toLocaleString('es-AR')}
                        </div>
                        <div className="text-xs font-semibold">
                          {investment.changePercent >= 0 ? '+' : ''}{investment.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold text-lg">
                        {investment.roi}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-emerald-500 text-white border-0">
                        {t('status_active')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                        onClick={() => navigate('/trade', { state: { tokenSymbol: investment.symbol, tokenTitle: investment.title, tab: 'sell' } })}
                      >
                        {t('sell_token')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-8 flex flex-col md:flex-row justify-end gap-4">
        <Button variant="outline" className="flex items-center justify-center gap-2">
          <Download className="h-4 w-4" />
          {t('download_report')}
        </Button>
        <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white flex items-center justify-center gap-2">
          <ArrowUpRight className="h-4 w-4" />
          {t('invest_more')}
        </Button>
      </div>
      </div>
    </div>
  );
};

export default InvestmentsPage;
