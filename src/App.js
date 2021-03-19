import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

import { ProductContext } from './contexts/productContext';
import { CartContext } from './contexts/cartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	// Set localStorage.cart to an empty array if 'cart' key is not already present
	// Keeps app from crashing on page load with no 'cart' in locale storage
	useEffect(() => {
		if (!localStorage.cart) {
			localStorage.setItem('cart', JSON.stringify([]));
		}
		// If 'cart' is in localStorage, item(s) is passed to setCart
		const initialCart = JSON.parse(localStorage.getItem('cart'));
		setCart(initialCart);
	}, []);

	// Doesn't allow duplicate items being added to cart.
	// Qty state should be added in cart for purchasing multiple copies
	const addItem = (item) => {
		if (cart.includes(item)) {
			window.alert(`${item.title} is already in the cart`);
		} else {
			setCart([...cart, item]);
		}
	};

	// Called from product at the same time as add to cart
	const setToLocalStorage = (item) => {
		const cartStorage = [...cart, item];
		localStorage.setItem('cart', JSON.stringify(cartStorage));
	};

	// Called at the same time as delete from cart
	const deleteItemHandler = (id) => {
		// Filters items that are not the item being passed in here
		const newCart = cart.filter((cartItem) => cartItem.id !== id);
		setCart(newCart);
		localStorage.setItem('cart', JSON.stringify(newCart));
	};

	return (
		<div className='App'>
			<ProductContext.Provider value={{ products, addItem, setToLocalStorage }}>
				<CartContext.Provider value={{ cart, setCart, deleteItemHandler }}>
					<Navigation cart={cart} />

					{/* Routes */}
					<Route exact path='/'>
						<Products />
					</Route>

					<Route path='/cart'>
						<ShoppingCart cart={cart} />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
