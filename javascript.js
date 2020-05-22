let maxChar = 20;
let message = document.getElementById("input")
let quackMessage = []

message.addEventListener("input", remainder)

function remainder() {
    let text = event.target.value
    let remainText = maxChar - text.length
    document.getElementById("remain").innerHTML = `${remainText} characters left`
    if (text.length > 20 || text.length <= 0) {
        document.getElementById("btn-post").disabled = true
    } else {
        document.getElementById("btn-post").disabled = false
    }
}

function post() {
    let remainText = maxChar - event.target.value.length
    message = document.getElementById("input").value
    num=0
    let quack = {
        'content':  findHashtag(message),
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
    quackMessage.splice(index, 1)
    render(quackMessage)
}

function retweet(position) {

    let quack = {
        'content': quackMessage[position].content,
        'isLike': false,
        'isRetweet': true,
        'parents': quackMessage[position].id
    }
    quackMessage[position].id.isRetweet = true
    console.log(position)
    quackMessage.push(quack)
    render(quackMessage)

}

function findHashtag(message) {
    let Array = message.split(" ").map(elm => {
        if(elm.startsWith("#"))
        {
            return `<a href="#">${elm}</a>`
        }
       
            return elm
        
    })
   return Array.join(" ")
    
}
