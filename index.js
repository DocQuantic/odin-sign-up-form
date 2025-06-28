const formElement = document.querySelector("form");

const inputElements = formElement.querySelectorAll("input");
const inputErrorElements = formElement.querySelectorAll("input + p.error-msg");

inputElements.forEach((input, index) => {
    const inputError = inputErrorElements[index];
    input.addEventListener("input", (event) => {
        if(input.id === "password-confirm" & input.value === inputElements[4].value){
            input.setCustomValidity("")
        }
        if(input.validity.valid){
            inputError.textContent = "";
            inputError.className = "error-msg";
        } else {
            if(input.id === "password-confirm" & input.value !== inputElements[4].value){
                input.setCustomValidity("invalid password confirmation")
            }
            showSpecificError(input, inputError);
        }
    })
})

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    let formValidity = true;
    inputElements.forEach((input) => {
        formValidity &= input.checkValidity();
    })

    if(!formValidity){
        inputElements.forEach((input, index) => {
            showSpecificError(input, inputErrorElements[index]);
        })
        return;
    } else {
        console.log("form valid");
    }
})

function showSpecificError(input, inputError){
    switch(input.id){
        case "first-name":
            if(input.validity.valueMissing){
                inputError.textContent = "You need to enter your first name."
            }else if(input.validity.patternMismatch){
                inputError.textContent = "First name must contain only letters."
            }
            break;
        case "last-name":
            if(input.validity.valueMissing){
                inputError.textContent = "You need to enter your last name."
            }else if(input.validity.patternMismatch){
                inputError.textContent = "Last name must contain only letters."
            }
            break;
        case "email":
            if(!input.validity.valid){
                inputError.textContent = "You need to enter a valid email address"
            }
            break;
        case "phone":
            if(input.validity.valueMissing){
                inputError.textContent = "You need to enter your phone number."
            }else if(input.validity.patternMismatch){
                inputError.textContent = "Phone number must contain 10 digits, starting with 0. Second digit can only be 1, 2, 3, or 5."
            }
            break;
        case "password":
            if(input.validity.valueMissing){
                inputError.textContent = "You need to enter a password."
            }else if(input.validity.patternMismatch){
                inputError.textContent = "Password must contain between 10 and 30 alphanumeric characters, including - and _."
            }
            break;
        case "password-confirm":
            if(input.validity.valueMissing){
                inputError.textContent = "You need to enter a password confirmation."
            }
            if(!input.validity.valid){
                inputError.textContent = "Password confirmation must be the same than the password."
            }
    }
    inputError.className = "error-msg active";
}