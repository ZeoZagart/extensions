const FIRST_NAME = "first name"
const LAST_NAME = "last name"
const FULL_NAME = "full name"
const EMAIL = "email"
const PHONE = "phone"
const RESUME = "resume"
const COVER_LETTER = "cover letter"
const WEBSITE = "website"
const LINKEDIN = "linkedin"
const GITHUB = "github"
const UNDEFINED = "UNDEFINED"
const SUBMIT = "submit"

const ALLOWED_TYPES = [
    FIRST_NAME,
    LAST_NAME,
    FULL_NAME,
    EMAIL,
    PHONE,
    RESUME,
    COVER_LETTER,
    WEBSITE,
    LINKEDIN,
    GITHUB
]

fillForm()
//setForSaving()

function setForSaving() {
    let { fields, button } = findFillableForm()
    let user_props = {}
    button.addEventListener('click', () => {
        for (let field of fields) {
            let ft = findFieldType(field)
            user_props[ft] = field.value
        }
        console.log(`Storing user data: ${user_props}`)
    })
}

function fillForm() {
    console.log(`filling form`)
    let { fields } = findFillableForm()
    console.log(`fields result: ${JSON.stringify(fields)}`)
    let user_data = getUserData("abcd")
    for (let field of fields) {
        let ft = findFieldType(field)
        let user_prop = getUserPropForField(ft, user_data)
        console.log(`Filling field: ${ft} with value: ${user_prop}`)
        if (user_prop !== UNDEFINED && isBlank(field.value)) {
            field.value = user_prop
        }
    }
}

function isBlank(filledValue) {
    return filledValue === "" || filledValue === undefined || filledValue === null
}

function getUserPropForField(ft, user_data) {
    switch (ft) {
        case FIRST_NAME: return user_data.FIRST_NAME;
        case LAST_NAME: return user_data.LAST_NAME;
        case EMAIL: return user_data.EMAIL;
        case PHONE: return user_data.PHONE;
        case LINKEDIN: return user_data.LINKEDIN
    }
    return UNDEFINED
}


function getUserData(user_id) {
    return {
        FIRST_NAME: "abhash",
        LAST_NAME: "yadav",
        EMAIL: "abhashasd1@gmail.com",
        PHONE: "+91 8168-579-798",
        LINKEDIN: "linkedin.com/abhashy"
    }
}



// --------------------- FINDS THE TYPE OF FIELD (SEE ALLOWED_TYPES) ---------------------
function findFieldType(field) {
    let ft = findFieldTypeI(field)
    if (ft !== UNDEFINED) {
        return ft
    }
    ft = findFieldTypeI(field.parentElement)
    if (ft !== UNDEFINED) {
        return ft
    }
    ft = findFieldTypeI(field.parentElement.parentElement)
    if (ft !== UNDEFINED) {
        return ft
    }
    return UNDEFINED
}

// only for internal use --> find the type without traversing parents
function findFieldTypeI(field) {
    for (let allowed_type of ALLOWED_TYPES) {
        if (doesFieldMatchInput(field, allowed_type)) {
            return allowed_type
        }
    }
    return UNDEFINED
}

function doesFieldMatchInput(f, typ) {
    return matches(f["id"], typ) || matches(f["name"], typ) || matches(f["textContent"], typ) || matches(f["placeholder"], typ)
}

function matches(field_string, allowed_field) {
    if (field_string == null ) {
        return false
    }
    // check if field-string contains all parts of the valid-field-items
    let cleaned_string = field_string.toLowerCase()
    return allowed_field.split(" ").every(part => cleaned_string.includes(part))
}

// ------------------- FINDS THE FORM TO FILL & EXTRACT THE INPUT FIELDS -------------------
function findFillableForm() {
    let forms = document.getElementsByTagName("form")
    forms = [...forms, document]
    for (let form of forms) {
        let fields = findFieldsInForm(form)
        console.log(`found fields: ${JSON.stringify(fields)}`)
        // a page can have multiple forms. We are assuming that career form is the only one with > 3 fields.
        if (fields.length > 3) {
            return {
                fields: fields,
                submit: submitButton(form)
            }
        }
    }
    return {fields: [], submit: undefined}
}

function findFieldsInForm(form) {
    let fields = form.querySelectorAll("input")
    return [...fields].filter((item) => ["text", "radio", "file"].includes(item.type))
}

function submitButton(form) {
    let fields = form.querySelectorAll("input")
    return [...fields].find((item) => item.type === SUBMIT.toLowerCase())
}