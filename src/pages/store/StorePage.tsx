import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ShoppingBag, 
  Star, 
  Book, 
  FileText, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router';

interface Product {
  id: number;
  title: string;
  type: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  icon: any;
  color: string;
}

export const StorePage = () => {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Items');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [orderCompleted, setOrderCompleted] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: 1,
      title: 'Class 10 Question Bank 2026 (Solved)',
      type: 'Book (Physical)',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 124,
      image: 'bg-blue-100',
      icon: Book,
      color: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Science VVI Chapter Notes + Formula PDFs',
      type: 'Digital',
      price: 99,
      originalPrice: 199,
      rating: 4.9,
      reviews: 45,
      image: 'bg-purple-100',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      id: 3,
      title: 'Premium Test Series (All 5 Board Subjects)',
      type: 'Subscription',
      price: 499,
      originalPrice: 999,
      rating: 4.7,
      reviews: 312,
      image: 'bg-orange-100',
      icon: CheckCircle2,
      color: 'text-orange-600'
    },
    {
      id: 4,
      title: 'Class 12 Physics & Chemistry Target 90+ Pack',
      type: 'Book (Physical)',
      price: 349,
      originalPrice: 499,
      rating: 4.9,
      reviews: 88,
      image: 'bg-emerald-100',
      icon: Book,
      color: 'text-emerald-600'
    }
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutError(null);
    if (!termsAgreed) {
      setCheckoutError("Please accept the Terms & Conditions and Privacy Policy to place your order.");
      return;
    }

    // Save consent timestamp
    localStorage.setItem('bihar_board_terms_consent', JSON.stringify({
      accepted: true,
      date: new Date().toISOString(),
      version: "v2.4 (2026)"
    }));

    const orderId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCompleted(orderId);
    setCart([]);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'All Items') return true;
    if (selectedFilter === 'Books') return p.type.includes('Book');
    if (selectedFilter === 'Digital Notes') return p.type.includes('Digital');
    if (selectedFilter === 'Test Series') return p.type.includes('Subscription');
    return true;
  });

  return (
    <div className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 rounded-3xl p-8 text-white shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">BIHAR BOARD STUDY STORE</h1>
            </div>
            <p className="text-slate-300 text-sm md:text-base">
              Printed solved question banks, bilingual formula books, and test series passes delivered across Bihar.
            </p>
          </div>
          <Button onClick={() => setIsCartOpen(true)} className="bg-blue-600 hover:bg-blue-700 font-semibold gap-2">
            <ShoppingBag className="w-4 h-4" /> View Cart ({totalItems})
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 text-xs md:text-sm">
          {['All Items', 'Books', 'Digital Notes', 'Test Series'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? 'default' : 'outline'}
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full ${selectedFilter === filter ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group flex flex-col justify-between border-slate-200 shadow-sm hover:shadow-md transition">
              <div>
                <div className={`h-44 ${product.image} flex items-center justify-center relative`}>
                  <product.icon className={`w-16 h-16 ${product.color} opacity-80`} />
                  <span className="absolute top-2 right-2 bg-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm text-slate-800">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <CardContent className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{product.type}</span>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-blue-600 transition">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-slate-800">{product.rating}</span>
                    <span>({product.reviews} reviews)</span>
                  </div>
                </CardContent>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <div>
                  <span className="text-base font-black text-slate-900">₹{product.price}</span>
                  <span className="text-xs text-slate-400 line-through ml-1.5">₹{product.originalPrice}</span>
                </div>
                <Button size="sm" onClick={() => addToCart(product)} className="bg-blue-600 hover:bg-blue-700 text-xs font-semibold">
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Store Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-slate-600">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <Truck className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <strong className="block text-slate-900">Bihar 38 Districts Delivery</strong>
              <span>Dispatched within 24–48 hours via registered courier.</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <strong className="block text-slate-900">7-Day Replacement Guarantee</strong>
              <span>Defective or misprinted books replaced free of cost.</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <strong className="block text-slate-900">100% Secure Checkout</strong>
              <span>RBI-authorized UPI, Cards, and Net Banking gateways.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Cart & Checkout Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900">Your Study Cart ({totalItems})</h3>
              </div>
              <button 
                onClick={() => { setIsCartOpen(false); setOrderCompleted(null); setCheckoutError(null); }}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-4 flex-1 space-y-4 overflow-y-auto">
              {orderCompleted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Order Confirmed!</h4>
                  <p className="text-xs text-slate-600">
                    Order ID: <strong className="font-mono text-blue-600">{orderCompleted}</strong>
                  </p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    A confirmation receipt has been generated. For physical books, dispatch begins within 24 hours from Patna.
                  </p>
                  <div className="pt-2">
                    <Button onClick={() => { setIsCartOpen(false); setOrderCompleted(null); }} className="text-xs">
                      Continue Studying
                    </Button>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <ShoppingBag className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-sm font-medium">Your cart is currently empty</p>
                  <p className="text-xs text-slate-400">Add question banks or test series to proceed.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">{item.product.title}</h4>
                        <span className="text-[10px] text-slate-500">{item.product.type} • Qty: {item.quantity}</span>
                        <div className="text-xs font-semibold text-blue-600">₹{item.product.price * item.quantity}</div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer / Checkout */}
            {!orderCompleted && cart.length > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
                
                {/* Total */}
                <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Grand Total (GST Inc.):</span>
                  <span className="text-lg text-blue-600 font-black">₹{totalPrice}</span>
                </div>

                {checkoutError && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                {/* Explicit Terms Acceptance Checkbox */}
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => {
                        setTermsAgreed(e.target.checked);
                        if (e.target.checked) setCheckoutError(null);
                      }}
                      className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                    />
                    <span className="leading-relaxed text-[11px]">
                      I have read and agree to the{' '}
                      <Link to="/terms-and-conditions" target="_blank" className="text-blue-600 font-semibold underline hover:text-blue-800">
                        Terms & Conditions
                      </Link>
                      ,{' '}
                      <Link to="/refund-policy" target="_blank" className="text-blue-600 font-semibold underline hover:text-blue-800">
                        Refund Policy
                      </Link>
                      , and{' '}
                      <Link to="/privacy-policy" target="_blank" className="text-blue-600 font-semibold underline hover:text-blue-800">
                        Privacy Policy
                      </Link>.
                    </span>
                  </label>
                </div>

                <Button 
                  onClick={handleCheckout} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 text-sm"
                >
                  Proceed to Secure Checkout (₹{totalPrice})
                </Button>

                <div className="text-[10px] text-center text-slate-500">
                  Deliveries across all 38 districts of Bihar with live tracking.
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
