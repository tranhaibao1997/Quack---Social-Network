let maxChar = 140;
let tweetArea = document.getElementById("input")
tweetArea.addEventListener("input", (event) => {
    document.getElementById("remain").innerHTML = `remaining :${maxChar- event.target.value.length}`
    if (event.target.value.length > maxChar) {
        document.getElementById("remain").innerHTML = ``
    }
})