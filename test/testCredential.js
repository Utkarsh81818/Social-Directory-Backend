import { faker } from "@faker-js/faker";
export const validRegistrationData = () => {
    return {
        email: faker.internet.email(),
        phoneNo: "7865459845",
        password: process.env.TEST_REGISTRATION_PASSWORD
    }
}

export const invalidRegistrationData = () => {
    return {
        email: faker.internet.email(),
        phoneNo: "7865459845",
        password: process.env.TEST_INVALID_REGISTRATION_PASSWORD
    }
}

export const alreadyExistEmail = () => {
    return {
        email: "utkarshkr945@gmail.com",
        phoneNo: "7865459845",
        password: process.env.TEST_REGISTRATION_PASSWORD
    }
}

export const validLoginData = () => {
    return {
        email: "utkarshkr945@gmail.com",
        password: process.env.TEST_LOGIN_PASSWORD,
    }
}

export const invalidLoginData = () => {
    return {
        email: "utrhnsj32@gmail.com",
        password: process.env.TEST_INVALID_LOGIN_PASSWORD
    }
}

export const invalidLoginPassword = () => {
    return {
        email: "utkarshkr945@gmail.com",
        password: process.env.TEST_INVALID_LOGIN_PASSWORD
    }
}

export const unmatchedCredentials = () => {
    return {
        email: "usernine98gmail.com",
        password: process.env.TEST_LOGIN_PASSWORD,
    }
}

export const validProfile = () => {
    return {
        name: "Utkarsh Mishra",
        dob: "16/07/1996",
        interests: ["Cricket", "FootBall"],
        location:"Lucknow"
    }
}

export const unvalidProfile = () => {
    return {
        name: "U",
        dob: "16/07/1996",
        interests: ["C", "F"],
        location:"L"
    }
}

export const validSearch = () => {
    return {
        interests: "Cricket"
    }
}

export const unvalidSearch = () => {
    return {
        interests: ""
    }
}

export const notFound = () => {
    return {
        interests: "Zed"
    }
}

