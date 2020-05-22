let maxChar = 140;
let message = document.getElementById("input")
let quackMessage = []
let num = 0

message.addEventListener("input", remainder)

function remainder() {
    let text = event.target.value
    let remainText = maxChar - text.length
    document.getElementById("remain").innerHTML = `${remainText} characters left`
    if (text.length > 140 || text.length <= 0) {
        document.getElementById("btn-post").disabled = true
    } else {
        document.getElementById("btn-post").disabled = false
    }
}

function post() {
    let remainText = maxChar - event.target.value.length
    message = document.getElementById("input").value
    let quack = {
        'content': findHashtag(message),
        'id': num,
        'isLike': false,
        'isRetweet': false,
        'parents': null,
    }
    num++
    quackMessage.push(quack)
    console.log(quackMessage)
    render(quackMessage)
    document.getElementById("input").value = ''
    document.getElementById("remain").innerHTML = `${remainText} characters left`

}

function toggleLike(position) {
    if (quackMessage[position].isLike == false) {
        quackMessage[position].isLike = true
    } else {
        quackMessage[position].isLike = false
    }
    console.log(quackMessage[position])
    render(quackMessage)
}

const render = (list) => {
    console.log(list)
    let quackHtml = list.map((item, index) => {
        if (item.isLike == false) {
            return `${item.content}
            <span onclick="toggleLike(${index})"><i class="far fa-star"></i></span>
            <span onclick="retweet(${index})"><i class="fas fa-retweet"></i></span>
            <span onclick="remove(${index})"><i class="fas fa-trash-alt"></i></span>`
        } else {
            return `${item.content}
            <span onclick="toggleLike(${index})"><i class="fas fa-star"></i></span>
            <span onclick="retweet(${index})"><i class="fas fa-retweet"></i></span>
            <span onclick="remove(${index})"><i class="fas fa-trash-alt"></i></span>`
        }
    })
    document.getElementById("quackArea").innerHTML = quackHtml
}

function remove(index) {
    let deletedNumber=quackMessage[index].id
    let newArray=quackMessage.filter(elm =>{
        if(elm.id===deletedNumber || elm.parents===deletedNumber)
        {
            return false
        }
        return true
    })
    quackMessage=newArray
    render(quackMessage)

}

function retweet(position) {

    let quack = {
        'id': num,
        'content': quackMessage[position].content,
        'isLike': false,
        'isRetweet': true,
        'parents': quackMessage[position].id
    }
    quackMessage[position].isRetweet = true
    console
    console.log("erfgtj", quackMessage)
    quackMessage.push(quack)
    render(quackMessage)
    num++
}

function findHashtag(message) {
    let Array = message.split(" ").map(elm => {
        if (elm.startsWith("#")) {
            return `<a href="#">${elm}</a>`
        } else if (elm.startsWith("@")) {
            return `<span class="blue">${elm}</span>`
        } else if (elm.startsWith("https://")) {
            return `<img src="${elm}" width="300px">`
        }
        return elm
    })
    return Array.join(" ")
}
