import { makeAutoObservable } from "mobx";
import { User, UserFormValues } from "./user";
import { LoginAsync } from "../services/Account";

export default class UserStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    user: User | null = null;

    get isLoggedIn() {
        return !!this.user;
    }


    login = async (user : UserFormValues) => {
        try {
            const response = await LoginAsync(user);
            this.user = response;
        } catch (error) {
            console.log(error);
        }
    }
}