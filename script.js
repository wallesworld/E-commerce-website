//HÄmtar kundvagnen från localStorage
let cart = JSON.parse(localStorage.getItem("aevora_cart")) || [];

// Funktion för att rita upp innehållet på skärmen 
function renderCart() {
    const output = document.getElementById("cart-display");
    const totalDisplay = document.getElementById("cart-total-price"); 


//Om vi inte är på cart.html sidan så avbryter funktionen 
    if (!output) return; 

    output.innerHTML = ""; // Rensa listan innan vi ritar
    let totalSum = 0; 
    
    cart.forEach((product, index) => {
        const productTotal = product.price * product.quantity;
        totalSum += productTotal; 


// Skapar HTML-koden för varje produkt som läggs till 
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

// Uppdatera totalsumman och lägg till 49 kr frakt om vagnen inte är tom
if (totalDisplay) {
    const shipping = cart.length > 0 ? 49 : 0; 
    totalDisplay.innerText = (totalSum + shipping) + "SEK"; 

    }
}

// Funktion för att ändra antal (+ / -)
window.updateQuantity = (index, change) => {
    cart[index].quantity += change; 

    //Förhindra att man har o produkter 
    if (cart[index].quantity < 1) cart[index].quantity = 1; 

    saveCart(); 
}; 

// Funktion för att ta bort en produkt helt 
window.removeItem = (index) => {
    cart.splice(index, 1); // Tar bort 1 objekt på vald plats 
    saveCart(); 
}; 

// Hjälpfunktion för att spara och ladda om 
function saveCart() {
    localStorage.setItem("aevora_cart", JSON.stringify(cart)); 
    renderCart(); 
}

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

    saveCart();
    const notification = document.getElementById("cart-notification");
    if(notification) {
        notification.innerText = name + " Added to cart! ";
        notification.style.display = "block";

        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    };
};

renderCart(); 