var courseApi = "https://5f8a90f68453150016706008.mockapi.io/courses";

function start() {
    getCourses(renderCourses);

    hadleCreateForm();
}

start();

// function
function getCourses(callback) {
    fetch(courseApi)
        .then((response) => {
            return response.json();
        })
        .then(callback)
        .catch((err) => {});
}

function createCourses(data, callback) {
    fetch(courseApi, {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((response) => {
            response.json();
        })
        .then(callback);
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector("#list-courses");
    var htmls = courses.map((course) => {
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="deleteCourse(${course.id})">xoa</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join("");
}

function hadleCreateForm() {
    var createBtn = document.querySelector("#create");
    createBtn.onclick = function () {
        var name = document.querySelector(`input[name='name']`).value;
        var description = document.querySelector(`input[name='description']`)
            .value;

        var formData = {
            name,
            description,
        };

        createCourses(formData, function () {
            getCourses(renderCourses);
        });
    };
}

function deleteCourse(id) {
    fetch(courseApi + "/" + id, {
        method: "DELETE",
    })
        .then((response) => {
            response.json();
        })
        .then(() => {
            var courseItem = document.querySelector(".course-item-" + id);
            courseItem.remove();
        });
}
