const url = 'https://api.freeapi.app/api/v1/public/randomproducts'
const options = {
	method: 'GET',
	headers: { accept: 'application/json' }
}

document.addEventListener('DOMContentLoaded', () => {
	const productsContainer = document.getElementById('products')

	const renderProducts = products => {
		if (!products.length) {
			productsContainer.innerHTML = '<p>No products found</p>'
			return
		}

		productsContainer.innerHTML = products
			.map(product => {
				return `
          <div class="product-card">
            <img src="${product.thumbnail || 'https://via.placeholder.com/150'}" alt="${product.title || 'Product'}" />
            <div class="product-info">
              <h3>${product.title || 'No Title'}</h3>
              <p class="product-price">$${Number(product.price || 0).toFixed(2)}</p>
              <p class="product-category">${product.category || 'Unknown'}</p>
            </div>
          </div>
        `
			})
			.join('')
	}

	const fetchProducts = async () => {
		try {
			productsContainer.innerHTML = '<p>Loading...</p>'

			const response = await fetch(url, options)

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}

			const data = await response.json()
			const products = data?.data?.data || []

			renderProducts(products)
		} catch (error) {
			console.error('Error:', error)
			productsContainer.innerHTML = '<p>Something went wrong</p>'
		}
	}

	fetchProducts()
})
