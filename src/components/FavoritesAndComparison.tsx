import { useState } from 'react';
import { Heart, X, TrendingUp } from 'lucide-react';
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

interface FavoriteListing {
  id: string;
  projectName: string;
  tokenSymbol: string;
  pricePerToken: number;
  image: string;
  category: string;
  seller: string;
  addedDate: Date;
}

interface ComparisonListing {
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

interface FavoritesAndComparisonProps {
  favorites: FavoriteListing[];
  comparisons: ComparisonListing[];
  onRemoveFavorite: (id: string) => void;
  onRemoveComparison: (id: string) => void;
  onAddToCart?: (listing: FavoriteListing | ComparisonListing) => void;
}

export function FavoritesAndComparison({
  favorites,
  comparisons,
  onRemoveFavorite,
  onRemoveComparison,
  onAddToCart,
}: FavoritesAndComparisonProps) {
  const [activeTab, setActiveTab] = useState('favorites');

  return (
    <div className="w-full space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <TabsTrigger value="favorites" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm rounded-md transition-all flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Favoritos ({favorites.length})
          </TabsTrigger>
          <TabsTrigger value="compare" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm rounded-md transition-all flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Comparar ({comparisons.length})
          </TabsTrigger>
        </TabsList>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-4">
          {favorites.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="p-12 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No hay favoritos aún</h3>
                <p className="text-muted-foreground">
                  Haz clic en el corazón en cualquier listado para agregarlo aquí
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {favorites.map((fav, idx) => (
                  <motion.div
                    key={fav.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-2 border-slate-200 dark:border-slate-700">
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                        <img
                          src={fav.image}
                          alt={fav.projectName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onRemoveFavorite(fav.id)}
                          className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>

                        {/* Category Badge */}
                        <Badge className="absolute top-3 left-3 bg-emerald-600 text-white shadow-lg">
                          {fav.category}
                        </Badge>
                      </div>

                      {/* Content */}
                      <CardContent className="p-4 flex-grow flex flex-col gap-2">
                        <div>
                          <CardTitle className="text-sm font-bold line-clamp-2">
                            {fav.projectName}
                          </CardTitle>
                          <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 mt-2">
                            {fav.tokenSymbol}
                          </Badge>
                        </div>

                        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800 mt-auto">
                          <p className="text-xs text-muted-foreground font-medium mb-1">Precio Actual</p>
                          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            ${fav.pricePerToken}
                          </p>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          por {new Date(fav.addedDate).toLocaleDateString()}
                        </p>
                      </CardContent>

                      {/* Footer */}
                      <CardFooter className="p-3 gap-2 grid grid-cols-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => onAddToCart?.(fav)}
                        >
                          Comprar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs hover:bg-red-50 dark:hover:bg-red-950"
                          onClick={() => onRemoveFavorite(fav.id)}
                        >
                          Eliminar
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="compare" className="space-y-4">
          {comparisons.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="p-12 text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Sin comparaciones</h3>
                <p className="text-muted-foreground">
                  Haz clic en el icono de comparación para agregar listados aquí
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                      <th className="text-left p-4 font-semibold bg-slate-50 dark:bg-slate-800/30">Proyecto</th>
                      <th className="text-center p-4 font-semibold bg-slate-50 dark:bg-slate-800/30">Precio</th>
                      <th className="text-center p-4 font-semibold bg-slate-50 dark:bg-slate-800/30">Disponibles</th>
                      <th className="text-center p-4 font-semibold bg-slate-50 dark:bg-slate-800/30">Duración</th>
                      <th className="text-center p-4 font-semibold bg-slate-50 dark:bg-slate-800/30">Métodos Pago</th>
                      <th className="text-center p-4 font-semibold bg-slate-50 dark:bg-slate-800/30">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {comparisons.map((comp, idx) => (
                        <motion.tr
                          key={comp.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="p-4">
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white">
                                {comp.projectName}
                              </p>
                              <p className="text-xs text-muted-foreground">{comp.seller}</p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {comp.tokenSymbol}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <p className="font-bold text-emerald-600 dark:text-emerald-400">
                              ${comp.pricePerToken}
                            </p>
                          </td>
                          <td className="p-4 text-center">
                            <p className="font-semibold">{comp.quantity}</p>
                          </td>
                          <td className="p-4 text-center">
                            <p className="text-sm">{comp.totalDuration}</p>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex flex-wrap gap-1 justify-center">
                              {comp.paymentMethods.slice(0, 2).map(method => (
                                <Badge key={method} variant="secondary" className="text-xs">
                                  {method}
                                </Badge>
                              ))}
                              {comp.paymentMethods.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{comp.paymentMethods.length - 2}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onRemoveComparison(comp.id)}
                              className="text-red-500 hover:text-red-700 transition-colors inline-flex"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Comparison Summary */}
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Resumen de Comparación</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Precio Más Bajo</p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        ${Math.min(...comparisons.map(c => c.pricePerToken))}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Precio Más Alto</p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        ${Math.max(...comparisons.map(c => c.pricePerToken))}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Diferencia</p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        ${(Math.max(...comparisons.map(c => c.pricePerToken)) -
                           Math.min(...comparisons.map(c => c.pricePerToken))).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
