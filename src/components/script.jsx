// --- Product Data ---
export const productData = [
  { id: 1, name: 'Organic Carrots', price: 2.99, unit: 'lb', image: 'https://placehold.co/400x400/f97316/ffffff?text=Carrots' },
  { id: 2, name: 'Fresh Broccoli', price: 1.99, unit: 'head', image: 'https://placehold.co/400x400/16a34a/ffffff?text=Broccoli' },
  { id: 3, name: 'Ripe Tomatoes', price: 3.49, unit: 'lb', image: 'https://placehold.co/400x400/dc2626/ffffff?text=Tomatoes' },
  { id: 4, name: 'Crisp Lettuce', price: 2.29, unit: 'head', image: 'https://placehold.co/400x400/84cc16/ffffff?text=Lettuce' },
  { id: 5, name: 'Sweet Peppers', price: 4.99, unit: 'lb', image: 'https://placehold.co/400x400/facc15/ffffff?text=Peppers' },
  { id: 6, name: 'Organic Spinach', price: 3.99, unit: 'bag', image: 'https://placehold.co/400x400/15803d/ffffff?text=Spinach' },
  { id: 7, name: 'Red Onions', price: 1.79, unit: 'lb', image: 'https://placehold.co/400x400/a21caf/ffffff?text=Onions' },
  { id: 8, name: 'Fresh Garlic', price: 0.99, unit: 'head', image: 'https://placehold.co/400x400/e5e5e5/000000?text=Garlic' },
];

// --- SVG Icons ---
export const CartIcon = () => (
  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

export const MenuIcon = () => (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const CloseIcon = () => (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const PlusIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const MinusIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>
);

export const TrashIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.124 0c.342.052.682.107 1.022.166m-1.022-.165L4.772 5.79m14.456 0l-2.083 2.083m0 0L12 5.79m-3.21 2.083l-2.083-2.083" />
  </svg>
);

export const EmptyCartIcon = () => (
  <svg className="w-16 h-16 mx-auto text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

export const CheckCircleIcon = () => (
  <svg className="w-16 h-16 mx-auto text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
