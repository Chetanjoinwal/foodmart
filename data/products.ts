import { Product } from '@/components/ProductGrid';

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic Burger',
    price: 9.99,
    image: '/images/burger.jpg',
    description: 'A juicy beef patty topped with cheese, lettuce, tomato, and our secret sauce, served on a toasted bun.',
    category: 'burgers'
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    price: 12.99,
    image: '/images/pizza.jpg',
    description: 'Traditional Italian pizza topped with tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.',
    category: 'pizza'
  },
  {
    id: 3,
    name: 'Chicken Alfredo Pasta',
    price: 14.99,
    image: '/images/pasta.jpg',
    description: 'Fettuccine pasta tossed in a creamy alfredo sauce with grilled chicken, garnished with parsley and parmesan.',
    category: 'pasta'
  },
  {
    id: 4,
    name: 'Greek Salad',
    price: 8.99,
    image: '/images/salad.jpg',
    description: 'Fresh mixed greens with tomatoes, cucumbers, red onions, feta cheese, Kalamata olives, and Greek dressing.',
    category: 'salads'
  },
  {
    id: 5,
    name: 'Chocolate Lava Cake',
    price: 6.99,
    image: '/images/dessert.jpg',
    description: 'Warm chocolate cake with a molten chocolate center, served with vanilla ice cream and fresh berries.',
    category: 'desserts'
  },
  {
    id: 6,
    name: 'Vegetable Stir Fry',
    price: 11.99,
    image: '/images/stirfry.jpg',
    description: 'Mixed vegetables stir-fried in a savory sauce, served with steamed rice or noodles.',
    category: 'asian'
  },
  {
    id: 7,
    name: 'Fish & Chips',
    price: 13.99,
    image: '/images/fish.jpg',
    description: 'Crispy battered fish fillets served with golden french fries, tartar sauce, and a lemon wedge.',
    category: 'seafood'
  },
  {
    id: 8,
    name: 'Chicken Wings',
    price: 10.99,
    image: '/images/wings.jpg',
    description: 'Crispy chicken wings tossed in your choice of sauce: buffalo, BBQ, honey garlic, or teriyaki.',
    category: 'appetizers'
  },
  {
    id: 9,
    name: 'Beef bs',
    price: 9.49,
    image: '/images/bs.jpg',
    description: 'Large flour tortilla filled with seasoned ground beef, rice, beans, cheese, lettuce, and sour cream.',
    category: 'mexican'
  },
  {
    id: 10,
    name: 'Mushroom Risotto',
    price: 15.99,
    image: '/images/risotto.jpg',
    description: 'Creamy Arborio rice slow-cooked with mushrooms, onions, white wine, and finished with parmesan cheese.',
    category: 'italian'
  },
  {
    id: 11,
    name: 'Fruit Smoothie',
    price: 5.99,
    image: '/images/smoothie.jpg',
    description: 'Refreshing blend of mixed berries, banana, yogurt, and honey, topped with granola and fresh fruit.',
    category: 'beverages'
  },
  {
    id: 12,
    name: 'Vegetable Soup',
    price: 7.49,
    image: '/images/soup.jpg',
    description: 'Hearty vegetable soup with carrots, celery, potatoes, tomatoes, and herbs, served with crusty bread.',
    category: 'soups'
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
}; 