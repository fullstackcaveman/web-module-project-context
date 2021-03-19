import React, { useContext } from 'react';
import { ProductContext } from '../contexts/productContext';

// Components
import Product from './Product';

const Products = () => {
	const { products, addItem, setToLocalStorage } = useContext(ProductContext);

	return (
		<div className='products-container'>
			{products.map((product) => (
				<Product
					key={product.id}
					product={product}
					addItem={() => addItem(product)}
					localStorage={setToLocalStorage}
				/>
			))}
		</div>
	);
};

export default Products;
