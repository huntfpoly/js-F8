/**
 *  1. Let, const
 *  - Var/ Let, const: scope, hosting
 *  - Const/ Var, let: Assignment
 *  Code block: if else, loop, {}...
 *
 * 2. Template Literals
 * 3. Mutil-line String
 * 4. Arrow function
 * 5. Classes
 * - Định nghĩa key: value cho object
 * - Định nghĩa method cho object
 * - Định nghĩa key cho object dưới dạng biến
 *
 * 6. Default parameter values
 * 7. Destructuring
 * 8. Rest parameters
 * 9. Spread
 * 10. Enhanced object literals
 * 11. Tagged template literals
 * 12. Modules
 *  */
// 5.
// var name = "js";
// var price = 1000;
// var fieldname = "js";
// var fielprice = "price";

// var course = {
//     name,
//     price,
//     getName() {
//         return name;
//     },
// };

// const course1 = {
//     [fieldname]: "js",
//     [fielprice]: "js",
// };
// console.log(course1);

// 8.
// var array = ["js", "php", "python"];
// var [...rest] = array;
// console.log(...array);

// 9.
// var array1 = ["js"];
// var array2 = ["php"];
// var array3 = [...array1, ...array2];
// console.log(array3);

// 11.
function highlight([first, ...strings], ...values) {
    return values
        .reduce(
            (acc, curr) => [...acc, `<span>${curr}</span>`, strings.shift()],
            [first]
        )
        .join("");
}
var brand = "F8";
var course = "Js";
const html = highlight`Hoc lap trinh ${course} tai ${brand}!`;
console.log(html);

// 12.modules
// import logger from "./logger.js";
// logger("test", "warn");
