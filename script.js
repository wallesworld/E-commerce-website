// Gets cart from localStorage HÄmtar kundvagnen från localStorage
let cart = JSON.parse(localStorage.getItem("aevora_cart")) || [];

// Function to sketch up the content on the screen Funktion för att rita upp innehållet på skärmen 
function renderCart() {
    const output = document.getElementById("cart-display");
    const totalDisplay = document.getElementById("cart-total-price"); 


// If we're not on the cart.html page, the function will stop 
    if (!output) return; 

    output.innerHTML = ""; // Rensa listan innan vi ritar
    let totalSum = 0; 
    
    cart.forEach((product, index) => {
        const productTotal = product.price * product.quantity;
        totalSum += productTotal; 


// Creates the HTML-code for each product that is being added 
    output.innerHTML += `
        <div class="cart-product-row cart-grid-shared"> 
            <div class="cart-col-img">
                <img src="${product.image}" class="cart-img" alt="${product.name}">
            </div>
            <div class="cart-col-desc">
                <p>${product.name}</p> 
            </div>
            <div class="cart-sol-qty">
                <div class="quantity-ctrl">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${product.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
                <p>${productTotal} SEK</p> 
            <p class="delete-btn" onclick="removeItem(${index})">
                <img src="images/trashCan.png" alt="Delete" class="delete-icon">
            </p>
        </div>
        <hr>
    `; 
    });

// Update the total sum and add 49 kr for shipping if the cart isn't empty 
if (totalDisplay) {
    const shipping = cart.length > 0 ? 49 : 0; 
    totalDisplay.innerText = (totalSum + shipping) + "SEK"; 

    }
}

// Function to change the quantity (+ / -) 
window.updateQuantity = (index, change) => {
    cart[index].quantity += change; 

    // Prevent that you have 0 products 
    if (cart[index].quantity < 1) cart[index].quantity = 1; 

    saveCart(); 
}; 

// Function to delete a product 
window.removeItem = (index) => {
    cart.splice(index, 1); // Deletes 1 object 
    saveCart(); 
}; 

// Helpfunction to save and reload 
function saveCart() {
    // Converts the "cart" array into a JSON string and saves it to localStorage 
    localStorage.setItem("aevora_cart", JSON.stringify(cart)); 
    renderCart(); 
}
// Adds a prooduct to the cart array. This is an arrow function attached to the "window" object to make it globally accessible
window.addToCart = (name, price, image) => {
    const existingProduct = cart.find(item => item.name === name); 

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name, 
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Save the new state to localStorage 
    saveCart();

    // Selecting the notification element from the DOM 
    const notification = document.getElementById("cart-notification");
    
    if(notification) {
        // Change the visible text to confirm the action 
        notification.innerText = name + " Added to cart! ";
        // Make the notification visible 
        notification.style.display = "block";

        // Asynchronous JS: Hide the notification again after 3000ms (3 seconds)
        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    };
};

// Initial call to display the cart items when the page first loads 
renderCart(); 

// Getting the hamburger button and the menu links 
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Checks if the elements exist before adding listeners 
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });
}