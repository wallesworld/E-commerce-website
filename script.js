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
        <div class="cart-product-row"> 
            <img src="${product.image}" class="cart-img" alt="${product.name}">
            <p>${product.name}</p> 
            <div class="quantity-ctrl">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${product.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <p>${productTotal} SEK</p> 
            <p class="delete-btn" onclick="removeItem(${index})">x</p>
        </div>
        <hr>
    `; 
    });

    // Uppdatera totalsumman och lägg till 49 kr frakt om vagnen inte är tom
    const shipping = cart.length > 0 ? 49 : 0; 
    totalDisplay.innerText = (totalSum + shipping) + "SEK"; 
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

// Kör igång allting när sidan laddas 
renderCart(); 
