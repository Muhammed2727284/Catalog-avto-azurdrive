function subscribe() {
    let email = document.getElementById("email").value;
    if (email.includes("@")) {
        alert("Вы подписаны на новости!");
    } else {
        alert("Введите корректный email!");
    }
}
