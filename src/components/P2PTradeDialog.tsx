import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Definimos una interfaz para los mensajes del chat
interface ChatMessage {
  sender: 'user' | 'seller';
  text: string;
  timestamp: string;
}

// Datos de ejemplo para el chat
const initialMessages: ChatMessage[] = [
  {
    sender: 'seller',
    text: 'Hola, estoy disponible para el intercambio. Por favor, confirma los detalles y realiza el pago.',
    timestamp: '10:30 AM'
  },
  {
    sender: 'user',
    text: '¡Hola! Confirmando. Procederé con el pago a través de Transferencia Bancaria.',
    timestamp: '10:31 AM'
  },
];

interface Listing {
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

interface P2PTradeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  listing: Listing | null;
}

export function P2PTradeDialog({ isOpen, onOpenChange, listing }: P2PTradeDialogProps) {
  if (!listing) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>P2P Trade: {listing.projectName}</DialogTitle>
          <DialogDescription>
            Estás a punto de comprar {listing.quantity} tokens de {listing.tokenSymbol} a ${listing.pricePerToken} cada uno.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Columna de detalles de la orden */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Detalles de la Orden</h3>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vendedor:</span>
              <span className="font-mono">{listing.seller}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cantidad a comprar:</span>
              <span>{listing.quantity} {listing.tokenSymbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Precio por token:</span>
              <span>${listing.pricePerToken}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span className="text-muted-foreground">Total a Pagar:</span>
              <span>${listing.quantity * listing.pricePerToken}</span>
            </div>
            <div className="pt-4">
              <h4 className="font-semibold mb-2">Instrucciones de Pago</h4>
              <p className="text-sm text-muted-foreground">
                Por favor, realiza el pago usando uno de los métodos aceptados. Una vez completado, presiona "Confirmar Compra". El vendedor liberará los tokens una vez que verifique el pago.
              </p>
            </div>
          </div>

          {/* Columna de chat */}
          <div className="flex flex-col h-full bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Chat con el Vendedor</h3>
            <ScrollArea className="flex-grow h-64 mb-4 pr-4">
              <div className="flex flex-col gap-4">
                {initialMessages.map((msg, index) => (
                  <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    {msg.sender === 'seller' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{listing.seller.slice(2, 4).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg px-3 py-2 max-w-xs ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs text-right text-muted-foreground/70 mt-1">{msg.timestamp}</p>
                    </div>
                     {msg.sender === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>YO</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="relative">
              <Input placeholder="Escribe un mensaje..." className="pr-12" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => { alert('Compra confirmada (simulado)!'); onOpenChange(false); }}>Confirmar Compra</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
