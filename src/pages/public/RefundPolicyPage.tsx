import React, { useEffect } from 'react';
import { CreditCard, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router';

export const RefundPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = "Cancellation & Refund Policy | BIHAR BOARD";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 pb-20">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase">
            <CreditCard className="w-3.5 h-3.5" /> Billing & Returns
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            Cancellation & Refund Policy
          </h1>
          <p className="text-sm text-slate-600">
            Learn about return, cancellation, and refund guidelines for digital courses and Study Store books.
          </p>
        </div>

        {/* Policy Body */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 text-slate-800 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Digital Courses & Online Test Series</h2>
            <p>
              Due to the immediate access nature of digital study notes, mock tests, and AI tutor credits, payments for digital subscriptions are generally non-refundable once content has been accessed. If a duplicate transaction occurs due to payment gateway delay, full refunds are processed within 5–7 business days to the original payment source.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Physical Books & Study Materials (Study Store)</h2>
            <p>
              Physical study books purchased through our Study Store can be replaced or refunded if received in damaged, misprinted, or defective condition. You must report the issue within 7 days of delivery with photos of the damaged item.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Refund Request Process</h2>
            <p>
              To initiate a refund inquiry, email <span className="font-mono text-blue-600">support@biharboard.org.in</span> with your Order ID and transaction receipt.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-500">
            <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="text-blue-600 hover:underline">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/shipping-policy" className="text-blue-600 hover:underline">Shipping Policy</Link>
          </div>
        </div>

      </div>
    </div>
  );
};
