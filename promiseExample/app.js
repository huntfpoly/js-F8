var users = [
    {
        id: 1,
        name: "Pham Hieu",
    },
    {
        id: 2,
        name: "Admin",
    },
    {
        id: 3,
        name: "Guest",
    },
];
var comments = [
    {
        id: 1,
        id_user: 1,
        content: "ra video deee",
    },
    {
        id: 2,
        id_user: 2,
        content: "Vua ra xong e eii",
    },

    {
        id: 3,
        id_user: 1,
        content: "ok a eei",
    },
];
// 1. lay comments
// 2. Tu comment lay ra id_user
// 3. Tu id_user lay ra user

// Fake API
function getComments() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(comments);
        }, 1000);
    });
}

function getUsersByIds(idUsers) {
    return new Promise((resolve, reject) => {
        var result = users.filter((user) => {
            return idUsers.includes(user.id);
        });
        setTimeout(() => {
            resolve(result);
        }, 1000);
    });
}

getComments()
    .then((comments) => {
        var idUsers = comments.map((comment) => {
            return comment.id_user;
        });
        return getUsersByIds(idUsers).then((users) => {
            return {
                users: users,
                comments: comments,
            };
        });
    })
    .then((data) => {
        var commentBlock = document.querySelector("#comment-block");
        var html = "";
        data.comments.forEach((comment) => {
            var user = data.users.find((user) => {
                return user.id === comment.id_user;
            });
            html += `<li>${user.name}: ${comment.content}</li>`;
        });
        commentBlock.innerHTML = html;
    })
    .catch((err) => {});
