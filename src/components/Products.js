import React, { useContext } from 'react';
import { ProductContext } from '../contexts/productContext';

// Components
import Product from './Product';

const Products = () => {
	const { products, addItem } = useContext(ProductContext);

	return (
		<div className='products-container'>
			{products.map((product) => (
				<Product
					key={product.id}
					product={product}
					addItem={() => addItem(product)}
				/>
			))}
		</div>
	);
};

export default Products;
