// Realistic content drawn from the actual Arbooz menu in the source screenshots.
// In production this would live in a CMS with locale fields (RU/EN/LV).

export type Product = {
  id: string;
  category: 'macaron' | 'cake' | 'cupcake' | 'pastry' | 'sweet';
  name: string;
  flavor: string;
  description: string;
  price: string;
  unit: string;
  image: string;
  tag?: 'fresh-today' | 'seasonal' | 'limited' | 'signature';
  imageAlt: string;
};

// Curated dessert photography — warm-graded, editorial-quality
const IMG = {
  hero: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&q=85&w=1600',
  macaronTower: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&q=85&w=900',
  macaronPink: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=85&w=900',
  macaronGreen: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&q=85&w=900',
  macaronBox: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=85&w=900',
  eclair: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&q=85&w=900',
  cupcakeWhite: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=85&w=900',
  cupcakeChocolate: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&q=85&w=900',
  cakeBerry: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=85&w=1200',
  cakeChocolate: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=85&w=1200',
  cakeWedding: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=85&w=1800',
  tartlet: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=85&w=900',
  caramel: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=85&w=900',
  cookies: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=85&w=900',
  founder: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=85&w=1000',
  boutique: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=85&w=1400',
  instagram1: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=85&w=600',
  instagram2: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=85&w=600',
  instagram3: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&q=85&w=600',
  instagram4: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=85&w=600',
  instagram5: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=85&w=600',
  instagram6: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=85&w=600',
};

// What's at the counter today — drawn from the real Arbooz menu
export const todaysSelection: Product[] = [
  {
    id: 'macaron-pistachio',
    category: 'macaron',
    name: 'Pistachio',
    flavor: 'Macaron',
    description: 'Toasted Sicilian pistachio, white chocolate ganache.',
    price: '€2.50',
    unit: 'each',
    image: IMG.macaronGreen,
    tag: 'fresh-today',
    imageAlt: 'Pistachio macarons in a soft pale green',
  },
  {
    id: 'eclair-raspberry',
    category: 'pastry',
    name: 'Éclair · Raspberry',
    flavor: 'Pastry',
    description: 'Choux, vanilla cream, fresh raspberries, icing sugar.',
    price: '€4.20',
    unit: 'each',
    image: IMG.eclair,
    tag: 'signature',
    imageAlt: 'Raspberry éclairs dusted with powdered sugar on dark slate',
  },
  {
    id: 'cupcake-mango',
    category: 'cupcake',
    name: 'Chocolate · Mango · Passion Fruit',
    flavor: 'Cupcake',
    description: 'Dark chocolate sponge, mango passion-fruit cream.',
    price: '€5.50',
    unit: 'each',
    image: IMG.cupcakeChocolate,
    imageAlt: 'Chocolate cupcakes topped with cream and gold flakes',
  },
  {
    id: 'macaron-strawberry-basil',
    category: 'macaron',
    name: 'Strawberry & Basil',
    flavor: 'Macaron',
    description: 'A signature pairing since 2014.',
    price: '€2.50',
    unit: 'each',
    image: IMG.macaronPink,
    tag: 'signature',
    imageAlt: 'Pink strawberry-basil macarons on a textured grey surface',
  },
  {
    id: 'tartlet-salted-caramel',
    category: 'pastry',
    name: 'Salted Caramel Tartlet',
    flavor: 'Tartlet',
    description: 'Sablé breton, salted caramel, hazelnut pearls.',
    price: '€4.80',
    unit: 'each',
    image: IMG.tartlet,
    tag: 'fresh-today',
    imageAlt: 'Salted caramel tartlet topped with golden pearls',
  },
  {
    id: 'cake-matcha-blueberry',
    category: 'cake',
    name: 'Matcha & Blueberry',
    flavor: 'Cake · slice',
    description: 'Uji matcha sponge, blueberry compote, mascarpone.',
    price: '€6.50',
    unit: 'slice',
    image: IMG.cakeBerry,
    tag: 'seasonal',
    imageAlt: 'A slice of matcha and blueberry layer cake on a pink plate',
  },
  {
    id: 'sweet-caramel',
    category: 'sweet',
    name: 'Soft Caramels',
    flavor: 'Sweets',
    description: 'Fleur de sel, wrapped in parchment, six to a bundle.',
    price: '€8.00',
    unit: 'bundle of 6',
    image: IMG.caramel,
    imageAlt: 'Soft caramels wrapped in parchment paper, tied with string',
  },
];

export const categories = [
  {
    id: 'macarons',
    name: 'Macarons',
    accent: 'Twelve flavors. The French method.',
    image: IMG.macaronTower,
    href: '/desserts/macarons',
    span: 'large' as const,
    imageAlt: 'A tall stack of pastel macarons, sliced to reveal their fillings',
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    accent: 'Buttercream and meringue.',
    image: IMG.cupcakeWhite,
    href: '/desserts/cupcakes',
    span: 'small' as const,
    imageAlt: 'White velvet cupcakes topped with raspberry and cream',
  },
  {
    id: 'cakes',
    name: 'Cakes',
    accent: 'Layered, slow-baked.',
    image: IMG.cakeChocolate,
    href: '/desserts/cakes',
    span: 'small' as const,
    imageAlt: 'A slice of layered chocolate raspberry cake',
  },
  {
    id: 'pastries',
    name: 'Pastries',
    accent: 'Éclairs, tartlets, choux.',
    image: IMG.eclair,
    href: '/desserts/pastries',
    span: 'large' as const,
    imageAlt: 'Raspberry éclairs with powdered sugar',
  },
];

export const press = [
  {
    label: 'Google · 4.7 ★',
    quote: 'A small jewel of a patisserie tucked between Antonijas and Dzirnavu.',
    source: 'from 177 reviews',
  },
  {
    label: 'Riga 2014',
    quote: 'Selected as one of twelve brands representing Riga at the European Capital of Culture year.',
    source: 'Ministry of Foreign Affairs, Latvia',
  },
  {
    label: 'Local press',
    quote: "The matcha cake alone is worth crossing the river for.",
    source: 'Anonymous, on a Tuesday',
  },
];

export const founder = {
  name: 'Karina Krasovitskaya',
  role: 'Founder & pastry chef',
  quote:
    'A hobby that became a life. I am in the kitchen every morning before the boutique opens, and I would not have it any other way.',
  bio: 'Since June 4th, 2013, Karina has spent every morning in the Arbooz kitchen — developing the seasonal menu, training the team, and arranging the counter before the first customer arrives at eleven.',
  image: IMG.founder,
  imageAlt: 'Karina Krasovitskaya, founder of Arbooz, at the counter of the boutique',
};

export const customCakes = {
  image: IMG.cakeWedding,
  imageAlt: 'A two-tier semi-naked wedding cake topped with fresh peonies and berries',
};

export const visit = {
  address: 'Dzirnavu iela 34A',
  city: 'Rīga, LV-1010',
  phone: '+371 26 530 164',
  email: 'karina@arbooz.lv',
  hours: [
    { day: 'Tuesday – Friday', time: '11:00 – 18:00' },
    { day: 'Saturday', time: '11:00 – 17:00' },
    { day: 'Monday', time: '11:00 – 18:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
  image: IMG.boutique,
  imageAlt: 'The interior of the Arbooz boutique with yellow floral wallpaper and white tables',
};

export const instagramFeed = [
  { id: 1, image: IMG.instagram1, alt: 'Macaron close-up shot for Instagram' },
  { id: 2, image: IMG.instagram2, alt: 'Box of pastel macarons for Instagram' },
  { id: 3, image: IMG.instagram3, alt: 'Flat lay of pastry tools and ingredients' },
  { id: 4, image: IMG.instagram4, alt: 'Cake decorating in progress' },
  { id: 5, image: IMG.instagram5, alt: 'Finished tartlets on a serving tray' },
  { id: 6, image: IMG.instagram6, alt: 'Chocolate dessert close-up' },
];
