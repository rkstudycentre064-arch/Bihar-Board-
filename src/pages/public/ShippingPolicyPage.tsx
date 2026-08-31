import React, { useEffect } from 'react';
import { ShoppingBag, Truck, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router';

export const ShippingPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = "Shipping & Delivery Policy | BIHAR BOARD";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 pb-20">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase">
            <Truck className="w-3.5 h-3.5" /> Order Logistics
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            Shipping & Delivery Policy
          </h1>
          <p className="text-sm text-slate-600">
            Estimated timelines, delivery areas, and tracking procedures for Study Store orders.
          </p>
        </div>

        {/* Policy Body */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 text-slate-800 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Coverage Areas</h2>
            <p>
              We deliver physical study materials, formula booklets, and printed mock test packs across all 38 districts of Bihar and across major pin codes throughout India.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Processing & Delivery Timelines</h2>
            <p>
              Orders are dispatched from our fulfillment warehouse in Patna within 24–48 business hours. Delivery typically takes 3–5 business days within Bihar and 5–7 business days for other states.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Tracking Your Shipment</h2>
            <p>
              Once your order is handed over to our courier partner, you will receive an SMS and email notification containing your airway bill (AWB) tracking number.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-500">
            <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="text-blue-600 hover:underline">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</Link>
          </div>
        </div>

      </div>
    </div>
  );
};
