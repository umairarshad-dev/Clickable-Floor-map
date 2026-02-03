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
      <div 
        className="absolute inset-0"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{shop.name}</h2>
          <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
            {shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Shop Size</span>
            <span className="text-gray-900 font-medium">{shop.size}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Status</span>
            <span className={`text-sm font-medium ${
              shop.status === 'rented' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Rent Status</span>
            <span className={`text-sm font-medium ${
              shop.rentStatus === 'paid' ? 'text-green-600' :
              shop.rentStatus === 'unpaid' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {shop.rentStatus === 'n/a' ? 'N/A' : shop.rentStatus.charAt(0).toUpperCase() + shop.rentStatus.slice(1)}
            </span>
          </div>

          {shop.description && (
            <div className="py-2">
              <p className="text-gray-600 text-sm mb-1">Description</p>
              <p className="text-gray-800 text-sm">{shop.description}</p>
            </div>
          )}

          {shop.contact?.phone && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Phone</span>
              <span className="text-gray-900 text-sm">{shop.contact.phone}</span>
            </div>
          )}

          {shop.hours && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Hours</span>
              <span className="text-gray-900 text-sm">{shop.hours.opening} - {shop.hours.closing}</span>
            </div>
          )}

          {shop.contact?.email && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Email</span>
              <span className="text-gray-900 text-sm">{shop.contact.email}</span>
            </div>
          )}

          {shop.contact?.website && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Website</span>
              <a 
                href={`https://${shop.contact.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                {shop.contact.website}
              </a>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors text-sm font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
