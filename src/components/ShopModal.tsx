'use client';

import { Shop } from '@/components/types';
import { X } from 'lucide-react';

interface ShopModalProps {
  shop: Shop | null;
  onClose: () => void;
}

export default function ShopModal({ shop, onClose }: ShopModalProps) {
  if (!shop) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{shop.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Shop Size</span>
            <span className="text-gray-900 font-medium">{shop.size}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Status</span>
            <span className={`font-medium ${shop.status === 'rented' ? 'text-green-600' : 'text-yellow-600'
              }`}>
              {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Rent Status</span>
            <span className={`font-medium ${shop.rentStatus === 'paid' ? 'text-green-600' :
              shop.rentStatus === 'unpaid' ? 'text-red-600' : 'text-gray-600'
              }`}>
              {shop.rentStatus === 'n/a' ? 'N/A' : shop.rentStatus}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
