const url = 'https://api.freeapi.app/api/v1/public/randomproducts'
const options = { method: 'GET', headers: { accept: 'application/json' } }

const productsContainer = document.getElementById('products')

async function fetchProducts() {
	try {
		const response = await fetch(url, options)
		const data = await response.json()

		const products = data?.data?.data || []

		if (!products.length) {
			productsContainer.innerHTML = '<p>No products found</p>'
			return
		}

		productsContainer.innerHTML = products
			.map(product => {
				return `
			<div class="product-card">
				<img src="${product.thumbnail}" alt="${product.title}" />
				<div class="product-info">
					<h3>${product.title}</h3>
					<p class="product-price">$${product.price.toFixed(2)}</p>
					<p class="product-category">${product.category}</p>
				</div>
			</div>
		`
			})
			.join('')
	} catch (error) {
		console.error('Error:', error)
	}
}
fetchProducts()
