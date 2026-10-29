
const openBtn = document.getElementById("openBtn");
const welcome = document.getElementById("welcome");

openBtn.addEventListener("click", () => {
    welcome.classList.add("swipe-up");
});
function bookCar(carName, price) {
    const confirmBooking = confirm(
        "Car: " + carName +
        "\nPrice: ₹" + price + "/day" +
        "\n\nDo you want to book this car?"
    );

    if (confirmBooking) {
        const bookingDetails = {
            carName: carName,
            price: price
        };

        sessionStorage.setItem(
            "bookingDetails",
            JSON.stringify(bookingDetails)
        );

        window.location.href = "purchase-order.html";
    }
}