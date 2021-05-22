## Closures

-   Một trong những "tính năng" hay ho quan trọng của closures đó là hàm bên trong vẫn có thể truy cập đến các biến số của hàm bên ngoài ngay cả khi hàm bên ngoài đã trả về. Khi các hàm trong Javascript thực thi, chúng sử dụng cùng scope chain. Điều này có nghĩa là sau khi hàm bên ngoài trả về, hàm bên trong vẫn có thể truy cập đến các biến của hàm bên ngoài

```javascript
const myModule = (function () {
    const privateVariable = "Hello World";

    function privateMethod() {
        console.log(privateVariable);
    }

    return {
        publicMethod: function () {
            privateMethod();
        },
    };
})();

myModule.publicMethod();
```

-   Closure không lưu giá trị. Closures trở nên thú vị khi giá trị của biến của hàm bên ngoài thay đổi trươc khi closures được gọi. Đây là một "tính năng" mạnh mẽ có thể được khai thác theo nhiều cách sáng tạo,

```javascript
function celebrityID() {
    var celebrityID = 999;
    // Ta đang trả về một object với các hàm bên trong.
    // Tất cả các hàm bên trong có thể truy cập đến biến của hàm ngoài (celebrityID).
    return {
        getID: function () {
            // Hàm này sẽ trả về celebrityID đã được cập nhật.
            // Nó sẽ trả về giá trị hiện tại của celebrityID, sau khi setID thay đổi nó.
            return celebrityID;
        },
        setID: function (theNewID) {
            // Hàm này sẽ thay đổi biến của hàm ngoài khi gọi.
            celebrityID = theNewID;
        },
    };
}

var mjID = celebrityID(); //Lúc này, celebrityID đã trả về
mjID.getID(); // 999
mjID.setID(567); // Thay đổi biến của hàm ngoài
mjID.getID(); // 567: Tả về biến celebrityID đã được cập nhật.
```

-   Bởi vì closures có thể truy cập đến các giá trị đã được cập nhật của các biến của hàm bên ngoài, chúng có thể gây ra bugs khi biến của hàm bên ngoài thay đổi với vòng lặp for,closure (hàm anonymous trong ví dụ) đã truy cập đến biến của hàm bên ngoài bằng tham chiếu, không phải truy cập giá trị.

```javascript
function celebrityIDCreator(theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
        console.log(i);
        // vòng for chạy xong thì nó chỉ gán theCelebrities[i]['id'] bằng 1 function
        // khi gọi tới nó thì nó truy cập lại vào biến i (for đã chạy xong) dù hàm cha đã return
        // lúc đó i = 3 nên tất cả id đều là 103
        theCelebrities[i]["id"] = function () {
            console.log(i);
            return uniqueID + i;
        };
    }

    return theCelebrities;
}

var actionCelebs = [
    { name: "Stallone", id: 0 },
    { name: "Cruise", id: 0 },
    { name: "Willis", id: 0 },
];

var createIdForActionCelebs = celebrityIDCreator(actionCelebs);

var stalloneID = createIdForActionCelebs[0];
console.log(stalloneID.id()); // 103
```

Để sửa bug này trong closures, ta có thể sử dụng Immediately Invoked Function Expression (IIFE), ví dụ như sau:

```javascript
function celebrityIDCreator(theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
        theCelebrities[i]["id"] = (function (j) {
            return (function () {
                return uniqueID + j;
            })();
        })(i); // Chạy ngay khi hàm được gọ với tham số i
    }

    return theCelebrities;
}

var actionCelebs = [
    { name: "Stallone", id: 0 },
    { name: "Cruise", id: 0 },
    { name: "Willis", id: 0 },
];

var createIdForActionCelebs = celebrityIDCreator(actionCelebs);

var stalloneID = createIdForActionCelebs[0];
console.log(stalloneID.id); // 100

var cruiseID = createIdForActionCelebs[1];
console.log(cruiseID.id); // 101
```

## Factory Pattern

-   Factory Pattern là một pattern sử dụng phương thức đặc biệt để tạo các object mà không cần chỉ định rõ chính xác class hay constructor nào,

```javascript
class Car {
    constructor(options) {
        this.door = options.doors || 4;
        this.state = options.state || "brand new";
        this.color = options.color || "white";
    }
}

class Truck {
    constructor(options) {
        this.doors = options.doors || 4;
        this.state = options.state || "used";
        this.color = options.color || "black";
    }
}
class VehicleFactory {
    createVehicle(options) {
        if (options.vehicleType === "car") {
            return new Car(options);
        } else if (options.vehicleType === "truck") {
            return new Truck(options);
        }
    }
}

const factory = new VehicleFactory();

const car = factory.createVehicle({
    vehicleType: "car",
    doors: 4,
    color: "silver",
    state: "Brand New",
});

const truck = factory.createVehicle({
    vehicleType: "truck",
    doors: 2,
    color: "white",
    state: "used",
});

// Prints Car {doors: 4, state: "Brand New", color: "silver"}
console.log(car);

// Prints Truck {doors: 2, state: "used", color: "white"}
console.log(truck);
```

## Decorator Pattern

-   Decorator pattern được sử dụng để mở rộng chức năng của một object mà không làm thay đổi class hiện tại hay hàm tạo. Pattern này có thể được sử dụng để thêm feature mới vào object

```javascript
function Car(name) {
    this.name = name;

    // Default values
    this.color = "White";
}

// Creating a new Object to decorate
const tesla = new Car("Tesla Model 3");

// Decorating the object with new functionality

tesla.setColor = function (color) {
    this.color = color;
};

tesla.setPrice = function (price) {
    this.price = price;
};

tesla.setColor("black");
tesla.setPrice(49000);

// Prints blank
console.log(tesla.color);
```

## Decorator Pattern

-   Decorator pattern được sử dụng để mở rộng chức năng của một object mà không làm thay đổi class hiện tại hay hàm tạo. Pattern này có thể được sử dụng để thêm feature mới vào object.

```javascript
class Car {
    constructor() {
        // Default Cost
        this.cost = function () {
            return 20000;
        };
    }
}

// Decorator function
function carWithAC(car) {
    car.hasAC = true;
    const prevCost = car.cost();
    car.cost = function () {
        return prevCost + 500;
    };
}
const car = new Car();

// Prints 20000
console.log(car.cost());
carWithAC(car);
// Prints 20500
console.log(car.cost());
```
