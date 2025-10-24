import http from "./httpService";
import { UserFormValues } from "../models/user";

export function LoginAsync(user : UserFormValues) {
    return http.post("/Account/LoginAsync", user).then(({data}) => data);
}

export function registerAsync(user : UserFormValues) {
    return http.post("/Account/RegisterAsync", user).then(({data}) => data);
}

export function currentUser()
{
    return http.get("/Account/GetCurrentUserAsync").then(({data}) => data);
}
