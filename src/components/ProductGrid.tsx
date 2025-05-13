import React from 'react';
import ProductCard from './ProductCard';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type ProductGridProps = {
  products: Product[];
  title?: string;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <div className="container py-5">
      {title && (
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-center">{title}</h2>
            <div className="d-flex justify-content-center">
              <div className="border-bottom border-primary border-3" style={{ width: '50px' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div className="col" key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid; 