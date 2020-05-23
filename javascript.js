let quackList = JSON.parse(localStorage.getItem('session')) || []
let maxInput = 100;
let username = "bitna"
let avatar = "https://www.catprotection.com.au/site/wp-content/uploads/2019/03/cat-banner.jpg"



// let username = "haibaotran"
// let avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTI9luOzrxxgQ_CTWLAbTEEp_b-CYFSFllZTeKxUEI6Z4jYKBTq&usqp=CAU"


function getTrending() {

    let testArray = []
    let hashTagArray = quackList.map(quack => {
        for (let i = 0; i < quack.hashTag.length; i++) {
            testArray.push(quack.hashTag[i])
        }
    })
    let obj1 = {};
    for (let i = 0; i < testArray.length; i++) {
        let name = testArray[i];
        if (!obj1[name]) {
            obj1[name] = 1;
        } else {
            obj1[name]++;
        }
    }
    let myArray = Object.keys(obj1)
    console.log(myArray)
    let html = myArray.map((item, index) => (`<li><a href="#" data-hashtag=${item} onclick="filterHashTag(event)">${item}</a></li>`)).join("")
    document.getElementById("trending-section").innerHTML = html
}
getTrending()







renderList(quackList)
    //render textarea
function rederTextArea() {
    return `

 <img src="${avatar}" width="100px" height="100px">
 <div>
 <p>Hello <a href="#">${username}</a></p>
 <textarea type="text" placeholder="Input tweet" id="input"></textarea>
 <button id="btn-post" onclick="post()">Quack</button>
 </div>

 `
}
document.getElementById("input-area").innerHTML = rederTextArea()


//check textarea input
document.getElementById("input").addEventListener("input", (event) => {
    let message = event.target.value
    if (event.target.value == "#") {

    }
    let textRemain = maxInput - message.length
    document.getElementById("remain").innerHTML = `textRemain:${textRemain}`
    if (textRemain < 0) {
        document.getElementById("remain").style = "color:red"
        document.getElementById("remain").innerHTML = "Your Quack is too long"
        document.getElementById("btn-post").disabled = true
    } else {
        document.getElementById("remain").innerHTML = `textRemain:${textRemain}`
        document.getElementById("remain").style = "color:black"
        document.getElementById("btn-post").disabled = false
    }
})

function post() {
    let message = document.getElementById("input").value
    let hashTag = [];
    let peopleTag = [];
    let likeBy = [];
    let comments = [];
    let newMessage = message.split(" ").map((elm, index) => {
        if (elm.startsWith("#")) {
            hashTag.push(elm)
            return `<a href="#" data-hashtag=${elm} onclick="filterHashTag(event)">${elm}</a>`;
        } else if (elm.startsWith("@")) {
            peopleTag.push(elm)
            return `<a href="#" onclick="filterPeopleTag(${elm})">${elm}</a>`;
        }
        return elm;
    }).join(" ");

    let quack = {
        "username": username,
        "avatar": avatar,
        "content": newMessage,
        "isReQuacked": false,
        "isLiked": false,
        "reQuackLevel": 0,
        "likeBy": likeBy,
        "hashTag": hashTag,
        "peopleTag": peopleTag,
        "comments": comments
    }
    quackList.unshift(quack)
    renderList(quackList)
    updateLocalStorage(quackList)
    getTrending()
}

function renderList(list) {
    function renderElm(elm, index) {
        console.log(elm)
        if (elm.likeBy.findIndex(name => name == username) !== -1 && elm.username == username) {
            //if user liked and this post belong to user
            console.log(" //if user liked and this post belong to user")
            console.log(elm.likeBy)
            return `
            <div class="quack">
            <img src="${elm.avatar}" width="100px" height="100px">
            <div>
             <a href="#">@${elm.username}</a>
            <p>${elm.content}</p>
            </div>
            <button onclick="deleteQuack(${index})">Delete</button>
            <button onclick="editQuack(${index})">Edit</button>
            <button onclick="reQuack(${index})">Retweet</button>
            <button onclick="comments(${index})">Comment</button>
            <button onclick="likeTweet(${index})"><i class="fas fa-star"></i><span>${elm.likeBy.length}</span></button>
            <input class="comment-box" type="text" placeholder="add comment...">
            <button onclick="postComment(${index})">Post Comment</button>
            ${renderComments(elm.comments)}
            </div>
          
      
          
            `
        } else if (elm.likeBy.findIndex(name => name == username) === -1 && elm.username == username) {
            //if user dont like and this post belong to user
            console.log("//if user dont like and this post belong to user")
            return `
            <div class="quack">
            <img src="${elm.avatar}" width="100px" height="100px">
            <div>
             <a href="#">@${elm.username}</a>
            <p>${elm.content}</p>
            </div>
            <button onclick="deleteQuack(${index})">Delete</button>
            <button onclick="editQuack(${index})">Edit</button>
            <button onclick="reQuack(${index})">Retweet</button>
            <button onclick="comments(${index})">Comment</button>
            <button onclick="likeTweet(${index})"><i class="far fa-star"></i><span>${elm.likeBy.length}</span></button>
            <input class="comment-box" type="text" placeholder="add comment...">
            <button onclick="postComment(${index})">Post Comment</button>
            ${renderComments(elm.comments)}
            </div>
            `
        } else if (elm.likeBy.findIndex(name => name == username) !== -1 && elm.username != username) {
            //if user liked but this post dont belong to user
            console.log(" //if user liked but this post dont belong to user")
            return `
            <div class="quack">
            <img src="${elm.avatar}" width="100px" height="100px">
            <div>
             <a href="#">@${elm.username}</a>
            <p>${elm.content}</p>
            </div>
            <button onclick="reQuack(${index})">Retweet</button>
            <button onclick="comments(${index})">Comment</button>
            <button onclick="likeTweet(${index})"><i class="fas fa-star"></i><span>${elm.likeBy.length}</span></button>
            <input class="comment-box" type="text" placeholder="add comment...">
            <button onclick="postComment(${index})">Post Comment</button>
            ${renderComments(elm.comments)}
            </div>
            `

        } else if (elm.likeBy.findIndex(name => name == username) !== -1 && elm.username !== username) {
            //if user dont link and this post dont belong to user
            console.log(" if user dont link and this post dont belong to user")
            return `
            <div class="quack">
            <img src="${elm.avatar}" width="100px" height="100px">
            <div>
             <a href="#">@${elm.username}</a>
            <p>${elm.content}</p>
            </div>
            <button onclick="reQuack(${index})">Retweet</button>
            <button onclick="comments(${index})">Comment</button>
            <button onclick="likeTweet(${index})"><i class="far fa-star"></i><span>${elm.likeBy.length}</span></button>
            <input class="comment-box" type="text" placeholder="add comment...">
            <button onclick="postComment(${index})">Post Comment</button>
            ${renderComments(elm.comments)}
            </div>
            `
        } else {
            //if user dont link and this post dont belong to user
            console.log(" if user dont link and this post dont belong to user")
            return `
 <div class="quack">
 <img src="${elm.avatar}" width="100px" height="100px">
 <div>
  <a href="#">@${elm.username}</a>
 <p>${elm.content}</p>
 </div>
 <button onclick="reQuack(${index})">Retweet</button>
 <button onclick="comments(${index})">Comment</button>
 <button onclick="likeTweet(${index})"><i class="far fa-star"></i><span>${elm.likeBy.length}</span></button>
 <input class="comment-box" type="text" placeholder="add comment...">
 <button onclick="postComment(${index})">Post Comment</button>
 ${renderComments(elm.comments)}
 </div>
 `
        }


    }
    let html = list.map(renderElm).join("")
    document.getElementById("quackArea").innerHTML = html


}

function deleteQuack(index) {
    console.log(quackList[index].reQuackLevel)
    let newlist = quackList.filter(quack => {
        if (quackList[index].content == quack.content && quackList[index].reQuackLevel <= quack.reQuackLevel) {
            return false
        }
        return true
    })
    console.log(newlist)
    quackList = newlist
    renderList(quackList)
    updateLocalStorage(quackList)
    getTrending()
}

function likeTweet(index) {
    if (quackList[index].likeBy.findIndex(name => name == username) !== -1) {
        let likedUserNameIndex = quackList[index].likeBy.findIndex(name => name == username)
        quackList[index].likeBy.splice(likedUserNameIndex, 1)

    } else {
        quackList[index].likeBy.push(username)
        renderList(quackList)
    }
    renderList(quackList)
    updateLocalStorage(quackList)

}

function reQuack(index) {
    let quack = {
        "username": username,
        "avatar": avatar,
        "content": quackList[index].content,
        "isReQuacked": true,
        "isLiked": false,
        "reQuackLevel": (quackList[index].reQuackLevel) + 1,
        "likeBy": [],
        "hashTag": quackList[index].hashTag,
        "peopleTag": quackList[index].peopleTag,
        "comments": []
    }
    quackList.unshift(quack)
    renderList(quackList)
    updateLocalStorage(quackList)
    getTrending()
}

function filterHashTag(e) {
    let hashtag = e.target.attributes["data-hashtag"].nodeValue
    let hashTagList = quackList.filter(quack => {
        if (quack.hashTag.find(elm => elm == hashtag)) {
            return true;
        }
    })
    renderList(hashTagList)
}

function updateLocalStorage(list) {
    var a = [];
    a = JSON.parse(localStorage.getItem('session')) || [];
    a = list
    localStorage.setItem('session', JSON.stringify(a));

}

function comments(index) {
    let allCommentBoxes = document.querySelectorAll(".comment-box")
    allCommentBoxes[index].style = "display:block"

}

function postComment(index) {
    let allCommentBoxes = document.querySelectorAll(".comment-box")
    let comment = {
        content: allCommentBoxes[index].value,
        username: username
    }
    quackList[index].comments.push(comment)
    allCommentBoxes[index].style = "display:none"
    updateLocalStorage(quackList)
    console.log(quackList, "after post")
    renderList(quackList)
}

function renderComments(list) {
    function renderComment(elm) {
        console.log(elm)
        return ` <p>${elm.username}:${elm.content}</p>`
    }
    const commentNode = list.map(renderComment).join("")
    return commentNode


}