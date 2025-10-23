import http from "./httpService";
import { UserFormValues } from "../models/user";

export function LoginAsync(user : UserFormValues) {
    return http.post("/Account/Login", user).then(({data}) => data);
}

export function registerAsync(user : UserFormValues) {
    return http.post("/Account/Register", user).then(({data}) => data);
}
