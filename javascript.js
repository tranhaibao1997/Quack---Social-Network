let maxChar = 140;
let tweetArea = document.getElementById("input").value

tweetArea.addEventListener("input", (event) => {
    let reamainText = maxChar - event.target.value.length
    document.getElementById("remain").innerHTML = `remaining :${reamainText}`
    if (reamainText > maxChar) {
        document.getElementById("remain").innerHTML = ``
    }
})