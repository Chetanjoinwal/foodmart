'use client';

import React, { createContext, useState, useContext } from 'react';

export type PaymentMethod = 'cod' | 'card' | 'upi';

type PaymentContextType = {
  paymentMethod: PaymentMethod | null;
  setPaymentMethod: (method: PaymentMethod) => void;
  cardDetails: {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
  };
  upiId: string;
  updateCardDetails: (details: Partial<PaymentContextType['cardDetails']>) => void;
  updateUpiId: (id: string) => void;
  isPaymentValid: () => boolean;
};

const defaultCardDetails = {
  number: '',
  name: '',
  expiry: '',
  cvv: ''
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [cardDetails, setCardDetails] = useState(defaultCardDetails);
  const [upiId, setUpiId] = useState('');

  const updateCardDetails = (details: Partial<typeof cardDetails>) => {
    setCardDetails(prev => ({ ...prev, ...details }));
  };

  const updateUpiId = (id: string) => {
    setUpiId(id);
  };

  const isPaymentValid = (): boolean => {
    if (!paymentMethod) return false;
    
    if (paymentMethod === 'card') {
      return (
        cardDetails.number.length >= 16 &&
        cardDetails.name.trim().length > 0 &&
        cardDetails.expiry.length === 5 &&
        cardDetails.cvv.length >= 3
      );
    }
    
    if (paymentMethod === 'upi') {
      return upiId.includes('@') && upiId.length > 3;
    }
    
    // Cash on delivery is always valid
    return paymentMethod === 'cod';
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
        cardDetails,
        upiId,
        updateCardDetails,
        updateUpiId,
        isPaymentValid,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}; 