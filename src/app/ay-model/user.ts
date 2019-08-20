export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    //token: string;
    active: boolean;
    role: string[];
}

export class JwtResponse {
    accessToken: string;
    type: string;
    username: string;
    authorities: string[];
}

export enum Role {
    STUDENT = "ROLE_STUDENT",
    PARENT  = "ROLE_PARENT",
    GUEST   = "ROLE_GUEST",
    TEACHER = "ROLE_TEACHER",
    DATA_ENTRY      = "ROLE_DE", /** DATA ENTRY **/
    SUBJECT_EXPERT     = "ROLE_SME", /** SUBJECT MATTER EXPERT **/
    ADMIN   = "ROLE_ADMIN"
}

export enum NAVITEM {
    HOME = "HOME",
    DE = "DE"
}

export enum DE_ACTION {
    ADD = "ADD",
    GET = "GET",
    MOD = "MOD",
    DEL = "DEL",
    PVW = "PVW"
}