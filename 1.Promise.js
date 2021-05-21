/** 
 *  Promise
        - Sync
        - Async
        - Kho khan
        - ly thuyet, luong hoat dong
        - Thuc hanh, vi du
        
         Sync / Async  
        Đồng bộ là code chạy từ trên xuống dưới, viết trước
        chạy trước
        - setTimeout, SetInterval, fetch, XMLHttprequest, đọc file
 *  Callback
 *  Callback hell
 *  Pyramid of doom

        1. new Promise
        2.Executor

        // Trang thai
        1. Pendding
        2. Fullilled
        3. Rejected
 */
// var promise = new Promise(
//     // Executor
//     function (resolve, reject) {
//         // logic
//         // Thanh cong: resolve()
//         // That bai: reject()
//         // Fake call API
//         // resolve([
//         //     {
//         //         id: 1,
//         //         name: "js",
//         //     },
//         // ]);
//     }
// );

// promise
//     // khi resolve duoc goi thi .then duoc go
//     .then(function (courses) {
//         console.log(courses);
//     })
//     .catch(function () {
//         console.log("failure");
//     })
//     .finally(function () {
//         console.log("done!");
//     });

// function sleeps(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms);
//     });
// }
// sleeps(1000)
//     .then((result) => {
//         console.log(1);
//         return sleeps(1000);
//     })
//     .then((result) => {
//         console.log(2);
//         return new Promise((resolve, reject) => {
//             reject("co loi!");
//         });
//     })
//     .then((result) => {
//         console.log(3);
//         return sleeps(1000);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// 1. Promise.resolve
// 2. Promise.reject
// 3. Promise.all

// var promise = Promise.resolve("Successfully");

var promise = new Promise((resolve, reject) => {
    // resolve("Successfully");
    reject("Error");
});

promise
    .then((result) => {
        console.log("result: ", result);
    })
    .catch((err) => {
        console.log("Fail: ", err);
    });
