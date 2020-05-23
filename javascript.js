let quackList = JSON.parse(localStorage.getItem('session')) || []
let maxInput = 100;
let username = "bitna"
let avatar = "https://img.lovepik.com/element/40125/9858.png_860.png"


// let username = "haibaotran"
// let avatar = "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"


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
    var sortable = [];
    for (var item in obj1) {
        sortable.push([item, obj1[item]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    var objSorted = {}
    sortable.forEach(function(item) {
        objSorted[item[0]] = item[1]
    })
    let myArray = Object.keys(objSorted)
    console.log(myArray)
    let html = myArray.map((item, index) => (`<li>
    <a href="#" data-hashtag=${item} onclick="filterHashTag(event)" class="hashFont">${item}</a>
    <p class="qNum">${objSorted[item]} Quacks</p>
    </li>`)).join("")
    document.getElementById("trending-section").innerHTML = html
}
getTrending()



renderList(quackList)


//render textarea
function rederTextArea() {
    return `

   <div class="profile-info">
    <div class="img-wrapper">
        <img class="profile-avatar" src="${avatar}" alt="img">
    </div>
    </div>

    <div class="text-area-section">
        <textarea type="text" placeholder="What's quackin'?" id="input"></textarea>
        <div>
            <button id="btn-post" onclick="post()" class="qButton">Quack</button>
            <span id="remain"></span>
        </div>
    </div>


 `
}
document.getElementById("quack-input").innerHTML = rederTextArea()
document.getElementById("username").innerHTML = `Hello ${username}`


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
        document.getElementById("remain").innerHTML = `${textRemain} characters left`
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
        "comments": comments,
        "author": username
    }
    quackList.unshift(quack)
    document.getElementById("input").value = ""
    document.getElementById("remain").innerHTML = ""
    renderList(quackList)
    updateLocalStorage(quackList)
    getTrending()
}

function renderAuthorize(item, index) {
    if (item.username == username) {
        return `<span onclick="deleteQuack(${index})"><i class="fas fa-trash-alt fa-lg iconFormat trash"></i></span>`
    } else {
        return ``
    }
}

function renderLikedList(list) {
    let html = list.map(elm => ` <li>${elm}</li>`)
    return html

}

function showLike(index) {
    document.getElementsByClassName("showLike")[index].style = "display:flex"
}

function hideLike(index) {
    document.getElementsByClassName("showLike")[index].style = "display:none"
}


function renderList(list) {
    function renderElm(item, index) {
        if (item.isReQuacked) {
            if (item.likeBy.findIndex(name => name == username) !== -1) {
                return ` <div class="requack-area">
                <div class="qAreaFormat">
                <div class="quack-info">
                <span>${item.username}</span>
                <div class="img-wrapper">
                <img src="${item.avatar}" alt="username"/>
                </div>
                </div>
                <div class="quack-content">
                    <p>${item.reQuackComment}</p>
                    <div class="btn-section">
                    <span onmouseover="showLike(${index})" onmouseout="hideLike(${index})" onclick="likeTweet(${index})"><i class="fas fa-star fa-lg iconFormat star">${item.likeBy.length}</i></span>
                    <span onclick="reQuack(${index})"><i class="fas fa-retweet fa-lg iconFormat retweet"></i></span>
                    <span><i class="far fa-comment fa-lg iconFormat comment"></i></span>
                   ${renderAuthorize(item, index)}
                    </div>
                    <ul class="showLike">
                    ${renderLikedList(item.likeBy)}
                    </ul>
                </div>
                <div class=" qAreaFormat haibao-requack">
                <div class="quack-info">
                <span>${item.originalUser}</span>
                <div class="img-wrapper">
                <img src="${item.originalUserAvatar}" alt="username"/>
                </div>
                </div>
                <div class="quack-content">
                    <p>${item.content}</p>
                    
                </div>
                    </div>
                    </div>
                  
                
                    </div>
                    `

            } else {
                return `
                <div class="requack-area">
                <div class="qAreaFormat">
                <div class="quack-info">
                <span>${item.username}</span>
                <div class="img-wrapper">
                <img src="${item.avatar}" alt="username"/>
                </div>
                </div>
                <div class="quack-content">
                    <p>${item.reQuackComment}</p>
                    <div class="btn-section">
                    <span onmouseover="showLike(${index})" onmouseout="hideLike(${index})" onclick="likeTweet(${index})"><i class="far fa-star fa-lg iconFormat star">${item.likeBy.length}</i></span>
                    <span onclick="reQuack(${index})"><i class="fas fa-retweet fa-lg iconFormat retweet"></i></span>
                    <span><i class="far fa-comment fa-lg iconFormat comment"></i></span>
                   ${renderAuthorize(item, index)}
                    </div>
                    <ul class="showLike">
                    ${renderLikedList(item.likeBy)}
                    </ul>
                </div>
                <div class=" qAreaFormat haibao-requack">
                <div class="quack-info">
                <span>${item.originalUser}</span>
                <div class="img-wrapper">
                <img src="${item.originalUserAvatar}" alt="username"/>
                </div>
                </div>
                <div class="quack-content">
                    <p>${item.content}</p>
                    
                </div>
                    </div>
                    </div>
                  
                
                    </div>
                    `

            }




        } else if (!item.isReQuacked) {
            if (item.likeBy.findIndex(name => name == username) !== -1) {

                //item is liked

                return `<div class="qAreaFormat">
                <div class="quack-info">
                <span>${item.username}</span>
                <div class="img-wrapper">
                <img src="${item.avatar}" alt="username"/>
                </div>
                </div>
                <div class="quack-content">
                    <p>${item.content}</p>
                    <div class="btn-section">
                    <span onmouseover="showLike(${index})" onmouseout="hideLike(${index})" onclick="likeTweet(${index})"><i class="fas fa-star fa-lg iconFormat star">${item.likeBy.length}</i></span>
                    <span onclick="reQuack(${index})"><i class="fas fa-retweet fa-lg iconFormat retweet"></i></span>
                    <span><i class="far fa-comment fa-lg iconFormat comment"></i></span>
                   ${renderAuthorize(item, index)}
                    </div>
                    <ul class="showLike">
                    ${renderLikedList(item.likeBy)}
                    </ul>
                    </div>
                    </div>`
            } else {

                //item is not liked
                return `<div class="qAreaFormat">
                <div class="quack-info">
                <span>${item.username}</span>
                <div class="img-wrapper">
                <img src="${item.avatar}" alt="username"/>
                </div>
                </div>
                <div class="quack-content">
                    <p>${item.content}</p>
                    <div class="btn-section">
                    <span onmouseover="showLike(${index})" onmouseout="hideLike(${index})" onclick="likeTweet(${index})"><i class="far fa-star fa-lg iconFormat star">${item.likeBy.length}</i></span>
                    <span onclick="reQuack(${index})"><i class="fas fa-retweet fa-lg iconFormat retweet"></i></span>
                    <span><i class="far fa-comment fa-lg iconFormat comment"></i></span>
                    ${renderAuthorize(item, index)}
                    </div>
                    <ul class="showLike">
                    ${renderLikedList(item.likeBy)}
                    </ul>
                    </div>
                    </div>`
            }

        }


    }
    let html = list.map(renderElm).join("")
    document.getElementById("quackArea").innerHTML = html


}

function deleteQuack(index) {
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

function findOriginalUser(index) {
    let originalPost = quackList.filter(item => item.content == quackList[index].content && item.reQuackLevel == 0)
    return originalPost[0].username


}

function findOriginalUserAvatar(index) {
    return quackList.filter(item => item.content == quackList[index].content && item.reQuackLevel == 0)[0].avatar
}

function reQuack(index) {
    var reQuackComment = prompt("Comment for this Quack", " ");
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
        "comments": [],
        "originalUser": findOriginalUser(index),
        "originalUserAvatar": findOriginalUserAvatar(index),
        "reQuackComment": reQuackComment
    }
    quackList.unshift(quack)
    renderList(quackList)
    updateLocalStorage(quackList)
        // getTrending()
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

// function postComment(index) {
//     let allCommentBoxes = document.querySelectorAll(".comment-box")
//     let comment = {
//         content: allCommentBoxes[index].value,
//         username: username
//     }
//     quackList[index].comments.push(comment)
//     allCommentBoxes[index].style = "display:none"
//     updateLocalStorage(quackList)
//     console.log(quackList, "after post")
//     renderList(quackList)
// }

// function renderComments(list) {
//     function renderComment(elm) {
//         console.log(elm)
//         return ` <p>${elm.username}:${elm.content}</p>`
//     }
//     const commentNode = list.map(renderComment).join("")
//     return commentNode


// }