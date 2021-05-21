function Validator(formSelector) {
    var _this = this;
    var formRules = {};
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    /**
     * Quy uoc tao rule:
     * - khi co loi thi return errror message
     * - k co loi thi return required
     */
    var validatorRules = {
        required: function (value) {
            return value ? undefined : "Vui long nhap truong nay";
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)
                ? undefined
                : "Vui long nhap dung dinh dang email";
        },
        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : `Vui long nhap it nhat ${min} ki tu`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length <= max
                    ? undefined
                    : `Vui long nhap nhieu nhat ${max} ki tu`;
            };
        },
    };
    // lay ra form element trong DOM
    var formElement = document.querySelector(formSelector);
    // chi xu ly khi element co trong DOME
    if (formElement) {
        var inputs = formElement.querySelectorAll("[name][rules]");
        for (let input of inputs) {
            if (Object.hasOwnProperty) {
                var rules = input.getAttribute("rules").split("|");
                for (let rule of rules) {
                    var isRulehasValue = rule.includes(":");
                    var ruleInfo;

                    if (isRulehasValue) {
                        ruleInfo = rule.split(":");
                        rule = ruleInfo[0];
                    }
                    var ruleFunc = validatorRules[rule];

                    if (isRulehasValue) {
                        ruleFunc = ruleFunc(ruleInfo[1]);
                    }
                    // console.log(ruleFunc);
                    if (Array.isArray(formRules[input.name])) {
                        // console.log(rule);

                        formRules[input.name].push(ruleFunc);
                    } else {
                        formRules[input.name] = [ruleFunc];
                    }
                }
                // Lắng nghe sự kiện để validate(blur, change...)
                input.onblur = handleValidate;
                input.oninput = handleClearError;
            }
        }
        // hàm thực hiện validate
        function handleValidate(event) {
            let rules = formRules[event.target.name];
            // console.log(rules);
            let errorMessage;

            for (var rule of rules) {
                errorMessage = rule(event.target.value);
                if (errorMessage) break;
            }

            // Neu co loi thi hien thi message loi ra UI
            if (errorMessage) {
                let formGroup = getParent(event.target, ".form-group");
                if (formGroup) {
                    formGroup.classList.add("invalid");
                    let formMessgae = formGroup.querySelector(".form-message");
                    if (formMessgae) {
                        formMessgae.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }
        function handleClearError(event) {
            let formGroup = getParent(event.target, ".form-group");
            if (formGroup.classList.contains("invalid")) {
                formGroup.classList.remove("invalid");
                let formMessgae = formGroup.querySelector(".form-message");
                if (formMessgae) {
                    formMessgae.innerText = "";
                }
            }
        }
        // console.log(formRules);
    }

    // Xu ly hanh vi submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();

        var inputs = formElement.querySelectorAll("[name][rules]");
        var isValid = true;
        for (var input of inputs) {
            // if(!handleValidate())
            if (!handleValidate({ target: input })) {
                isValid = false;
            }
        }
        if (isValid) {
            if (typeof _this.onSubmit === "function") {
                var enableInputs = formElement.querySelectorAll("[name]");
                var formValues = Array.from(enableInputs).reduce(function (
                    values,
                    input
                ) {
                    switch (input.type) {
                        case "radio":
                            values[input.name] = formElement.querySelector(
                                'input[name="' + input.name + '"]:checked'
                            ).value;
                            break;
                        case "checkbox":
                            if (!input.matches(":checked")) {
                                values[input.name] = "";
                                return values;
                            }
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        case "file":
                            values[input.name] = input.files;
                            break;
                        default:
                            values[input.name] = input.value;
                    }

                    return values;
                },
                {});
                _this.onSubmit(formValues);
            }
            // Trường hợp submit với hành vi mặc định
            else {
                formElement.submit();
            }
        }
    };
}
