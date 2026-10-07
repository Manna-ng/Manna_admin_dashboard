export type Period = 'This month' | 'Last month';
export type Detail = 'Customers' | 'Vendors' | 'Riders' | 'Products' | 'Orders' | 'Deliveries' | 'Payouts' | 'Disputes' | 'Feedback' | 'Reports' | 'Settings' | 'Help' | 'Vendor approvals' | 'Rider approvals' | 'Failed payouts';
export const snapshots = {
  'This month': { customers: 1200, vendors: 48, riders: 32, orders: 578, gmv: 8640000, earnings: 864000, owed: 2160000, refunds: 12, sales: [420, 560, 470, 710, 620, 890, 770, 1040, 850, 1100, 970, 1240] },
  'Last month': { customers: 1080, vendors: 41, riders: 28, orders: 492, gmv: 7120000, earnings: 712000, owed: 1780000, refunds: 9, sales: [350, 470, 400, 590, 520, 740, 640, 870, 700, 920, 800, 1020] },
} satisfies Record<Period, { customers: number; vendors: number; riders: number; orders: number; gmv: number; earnings: number; owed: number; refunds: number; sales: number[] }>;
export const categories = [
  { name: 'Vegetables', share: 35, color: '#3272ff' },
  { name: 'Root and Tuber', share: 25, color: '#60bac5' },
  { name: 'Grains and Legumes', share: 18, color: '#efcc35' },
  { name: 'Fruits', share: 12, color: '#ff7738' },
  { name: 'Meat and Poultry', share: 6, color: '#fa4a53' },
  { name: 'Nuts and Seeds', share: 3, color: '#df57de' },
  { name: 'Dairy and Milk', share: 1, color: '#8545ea' },
];
export type PreviewRow = { name: string; description: string; status: string };
export const previews: Partial<Record<Detail, PreviewRow[]>> = {
  'Vendor approvals': [ { name: 'Green Basket Foods', description: 'Ketu, Lagos • Submitted 29 Sep', status: 'Pending' }, { name: 'Harvest Market', description: 'Ikeja, Lagos • Submitted 30 Sep', status: 'Pending' } ],
  'Rider approvals': [ { name: 'Tunde Adewale', description: 'Ikeja • Motorcycle • Submitted 29 Sep', status: 'Pending' }, { name: 'Grace Okoro', description: 'Yaba • Motorcycle • Submitted 30 Sep', status: 'Pending' } ],
  'Failed payouts': [ { name: 'PAY-1024 • Green Basket Foods', description: '₦42,000 • Bank transfer failed', status: 'Failed' }, { name: 'PAY-1028 • Tunde Adewale', description: '₦8,500 • Bank details require review', status: 'Failed' } ],
  Vendors: [ { name: 'Green Basket Foods', description: 'Ketu • 24 listings', status: 'Approved' }, { name: 'Fresh Roots', description: 'Ikeja • 18 listings', status: 'Approved' }, { name: 'Harvest Market', description: 'Ikeja • Application under review', status: 'Pending' } ],
  Riders: [ { name: 'Tunde Adewale', description: 'Ikeja • Motorcycle', status: 'Pending' }, { name: 'Emeka Obi', description: 'Yaba • Motorcycle', status: 'Approved' } ],
  Orders: [ { name: 'MN-1058 • Ada Okafor', description: '2 vendors • ₦23,500 • 1 of 2 pickups completed', status: 'In progress' }, { name: 'MN-1057 • Samuel Bello', description: '1 vendor • ₦12,000 • Delivery confirmed', status: 'Delivered' } ],
  Deliveries: [ { name: 'MN-1058 • Emeka Obi', description: 'Green Basket collected; Fresh Roots pickup pending • Drop-off: Yaba', status: 'In progress' }, { name: 'MN-1057 • Musa Ali', description: 'Ikeja → Maryland • Customer receipt confirmed', status: 'Delivered' } ],
  Payouts: [ { name: 'PAY-1029 • Fresh Roots', description: '₦18,500 • Awaiting delivery confirmation', status: 'Pending' }, { name: 'PAY-1027 • Green Basket Foods', description: '₦25,000 • Dispute open', status: 'Held' }, { name: 'PAY-1026 • Musa Ali', description: '₦4,000 • Automatic transfer completed', status: 'Released' }, { name: 'PAY-1024 • Green Basket Foods', description: '₦42,000 • Bank transfer failed', status: 'Failed' } ],
  Disputes: [ { name: 'DSP-013 • MN-1041', description: 'Missing item • Responsibility under review • Vendor payout held', status: 'Under review' } ],
  Products: [ { name: 'Medium yam • Fresh Roots', description: '₦5,000 per tuber • Listing approved', status: 'Approved' }, { name: 'Onion basket • Green Basket Foods', description: '₦8,500 • Listing awaiting review', status: 'Pending' } ],
  Customers: [ { name: 'Ada Okafor', description: 'Yaba • 8 completed orders', status: 'Active' }, { name: 'Samuel Bello', description: 'Maryland • 3 completed orders', status: 'Active' } ],
};
export const money = (value: number) => '₦' + value.toLocaleString('en-NG');
