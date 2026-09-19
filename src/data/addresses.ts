import { UserAddress } from '../types';

export const INITIAL_ADDRESSES: UserAddress[] = [
  {
    id: 'addr-1',
    name: 'Rajeev Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Signature Towers, Tower B, 402, DLF CyberCity',
    city: 'Gurugram, Haryana',
    pincode: '122002',
    type: 'HOME',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Rajeev Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Tech Park One, Floor 5, Airport Road, Yerawada',
    city: 'Pune, Maharashtra',
    pincode: '411006',
    type: 'WORK',
    isDefault: false
  }
];

export const AVAILABLE_COUPONS = [
  {
    code: 'EXTRA10',
    discountPercent: 10,
    title: '10% OFF App Special',
    description: 'Valid on all orders above ₹999 with complimentary shipping.'
  },
  {
    code: 'RELOAD10',
    discountPercent: 10,
    title: 'VIP 10% Welcome Reward',
    description: 'Gold Elite member exclusive discount code.'
  },
  {
    code: 'FESTIVE15',
    discountPercent: 15,
    title: '15% Off Festive Kurtas',
    description: 'Applicable on high-end ceremonial and luxury co-ord collections.'
  }
];
