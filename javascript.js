

let quackList = [{"username":"haibaotran","avatar":"https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg","content":"<img src=\"https://quatangabc.com/images/hinhsinhnhat/avatar1.jpg\" alt=\"image\" width=\"50px\" height=\"50px\">","isReQuacked":false,"isLiked":false,"reQuackLevel":0,"likeBy":["haibaotran","Alyssa"],"hashTag":[],"peopleTag":[],"comments":[{"content":"so cute !!!","username":"Alyssa","avatar":"https://img.lovepik.com/element/40125/9858.png_860.png"}],"author":"haibaotran"},{"username":"Bitna","avatar":"https://zicxa.com/hinh-anh/wp-content/uploads/2020/02/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-avatar-h%C3%A0i-h%C6%B0%E1%BB%9Bc-nh%C3%ACn-l%C3%A0-b%E1%BA%ADt-c%C6%B0%E1%BB%9Di-1.jpg","content":"<a href=\"#\" data-hashtag=#quack onclick=\"filterHashTag(event)\">#quack</a> ","isReQuacked":false,"isLiked":false,"reQuackLevel":0,"likeBy":["Bitna","haibaotran"],"hashTag":["#quack"],"peopleTag":[],"comments":[],"author":"Bitna"},{"username":"Alyssa","avatar":"https://img.lovepik.com/element/40125/9858.png_860.png","content":"<a href=\"#\" data-hashtag=#frontend onclick=\"filterHashTag(event)\">#frontend</a> how can we get an element from input box anyone ?","isReQuacked":false,"isLiked":false,"reQuackLevel":0,"likeBy":["Bitna","haibaotran"],"hashTag":["#frontend"],"peopleTag":[],"comments":[{"content":"you can use getElementById","username":"Bitna","avatar":"https://zicxa.com/hinh-anh/wp-content/uploads/2020/02/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-avatar-h%C3%A0i-h%C6%B0%E1%BB%9Bc-nh%C3%ACn-l%C3%A0-b%E1%BA%ADt-c%C6%B0%E1%BB%9Di-1.jpg"}],"author":"Alyssa"},{"username":"Alyssa","avatar":"https://img.lovepik.com/element/40125/9858.png_860.png","content":"<a href=\"#\" data-hashtag=#coderschool onclick=\"filterHashTag(event)\">#coderschool</a> i love coding ","isReQuacked":true,"isLiked":false,"reQuackLevel":1,"likeBy":["haibaotran","Bitna"],"hashTag":["#coderschool"],"peopleTag":[],"comments":[],"originalUser":"haibaotran","originalUserAvatar":"https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg","reQuackComment":"Let's coding together everyone !!!"},{"username":"haibaotran","avatar":"https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg","content":"<a href=\"#\" data-hashtag=#coderschool onclick=\"filterHashTag(event)\">#coderschool</a> i love coding ","isReQuacked":false,"isLiked":false,"reQuackLevel":0,"likeBy":["haibaotran","charles","Bitna","Alyssa"],"hashTag":["#coderschool"],"peopleTag":[],"comments":[{"content":"me too !!! ","username":"Alyssa","avatar":"https://img.lovepik.com/element/40125/9858.png_860.png"},{"content":"coding makes me feel happy ^^","username":"Alyssa","avatar":"https://img.lovepik.com/element/40125/9858.png_860.png"},{"content":"Yeah i know :D","username":"haibaotran","avatar":"https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"}],"author":"haibaotran"}]
let maxInput = 100;

// let username=""
// let avatar=""
// let username = "Alyssa"
// let avatar = "https://img.lovepik.com/element/40125/9858.png_860.png"

// let username="Bitna"
// let avatar="https://zicxa.com/hinh-anh/wp-content/uploads/2020/02/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-avatar-h%C3%A0i-h%C6%B0%E1%BB%9Bc-nh%C3%ACn-l%C3%A0-b%E1%BA%ADt-c%C6%B0%E1%BB%9Di-1.jpg"

let username = "haibaotran"
let avatar = "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"


function getTrending() {

    let testArray = []
    quackList.map(quack => {
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

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });
    var objSorted = {}
    sortable.forEach(function (item) {
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
    if(username=="" && avatar=="")
    {
return ``
    }
    else
    {
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

}
document.getElementById("quack-input").innerHTML = rederTextArea()
if(username=="" & avatar=="")
{
    document.getElementById("username").innerHTML = `<a href="#">Sign up</a>`
}
else
{
    document.getElementById("username").innerHTML = `Hello <a onclick="changeAccount()" href="#" id="account" style="color:red;font-size:20px">${username}</a>`
}






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
        else if(elm.startsWith("http"))
        {
            return `<img src="${elm}" alt="image" width="50px" height="50px">`
        }
        return elm;
    }).join(" ");
console.log(message.split(" "))
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
function renderCommentAuthorize(item, index,quackIndex) {
    if (item.username == username) {
        return `<span onclick="deleteComment(${index,quackIndex})"><i class="fas fa-trash-alt fa-lg iconFormat trash"></i></span>`
    } else {
        return `<span style="opacity:0"><i class="fas fa-trash-alt fa-lg iconFormat trash"></i></span>`
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
                    <span onclick="comment(${index})"><i class="far fa-comment fa-lg iconFormat comment">${item.comments.length}</i></span>
                   ${renderAuthorize(item, index)}
                    </div>
                    <ul class="showLike">
                    ${renderLikedList(item.likeBy)}
                    </ul>
                    
                   
                </div>
                 <div class="comment-box">
                <div class="input-section">
                <div class="img-wrapper1">
                <img src="${avatar}">
                </div>
                <input class="comment-input" type="text" placeholder="comment sth...">
                <span><i class="fas fa-paper-plane" onclick="postComment(${index})"></i></span>
                </div>
                ${renderComments(item.comments)}
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
                    <span onclick="comment(${index})"><i class="far fa-comment fa-lg iconFormat comment">${item.comments.length}</i></span>
                   ${renderAuthorize(item, index)}
                    </div>
                    <ul class="showLike">
                    ${renderLikedList(item.likeBy)}
                    </ul>
                </div>
                <div class="comment-box">
                <div class="input-section">
                <div class="img-wrapper1">
                <img src="${avatar}">
                </div>
                <input class="comment-input" type="text" placeholder="comment sth...">
                <span><i class="fas fa-paper-plane" onclick="postComment(${index})"></i></span>
                </div>
                ${renderComments(item.comments,index)}
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
                    <span onclick="comment(${index})"><i class="far fa-comment fa-lg iconFormat comment">${item.comments.length}</i></span>
                   ${renderAuthorize(item, index)}
                    </div>
                    <ul class="showLike">
                    ${renderLikedList(item.likeBy)}
                    </ul>
                    </div>
                    <div class="comment-box">
                    <div class="input-section">
                    <div class="img-wrapper1">
                    <img src="${avatar}">
                    </div>
                    <input class="comment-input" type="text" placeholder="comment sth...">
                    <span><i class="fas fa-paper-plane" onclick="postComment(${index})"></i></span>
                    </div>
                    ${renderComments(item.comments)}
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
                    <span onclick="comment(${index})"><i class="far fa-comment fa-lg iconFormat comment">${item.comments.length}</i></span>
                    ${renderAuthorize(item, index)}
                    </div>
                    <ul class="showLike">
                    ${renderLikedList(item.likeBy)}
                    </ul>
                    </div>
                    <div class="comment-box">
                    <div class="input-section">
                    <div class="img-wrapper1">
                    <img src="${avatar}">
                    </div>
                    <input class="comment-input" type="text" placeholder="comment sth...">
                    <span><i class="fas fa-paper-plane" onclick="postComment(${index})"></i></span>
                    </div>
                    ${renderComments(item.comments)}
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

function comment(index) {
    let allCommentBoxes = document.querySelectorAll(".comment-box")
    allCommentBoxes[index].classList.toggle("disappear")

}

function postComment(index) {
    let allCommentBoxes = document.querySelectorAll(".comment-input")
    let comment = {
        content: allCommentBoxes[index].value,
        username: username,
        avatar: avatar
    }
    quackList[index].comments.push(comment)
    updateLocalStorage(quackList)
    console.log(quackList, "after post")
    renderList(quackList)
    allCommentBoxes[index].classList.toggle("disappear")
}

function renderComments(list,quackIndex) {
    function renderComment(item, index) {
        return `
        <div class="each-comment">
        <div class="comment-user-info">
        <div class="img-wrapper">
        <img src="${item.avatar}">
        </div>
        </div>
     
        <div class="comment-content">
        <span>${item.username}</span>
        <p>${item.content}</p>
        </div>
        ${renderCommentAuthorize(item, index,quackIndex)}
        </div>
        `
    }
    const commentNode = list.map(renderComment).join("")
    return commentNode


}
function deleteComment(index,quackIndex)
{
    console.log(index,quackIndex)
let newList=quackList[quackIndex].comments.splice(index,1)
renderComments(newList)
}