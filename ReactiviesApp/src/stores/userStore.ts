import { makeAutoObservable } from "mobx";
import { User, UserFormValues } from "../models/user";
import { LoginAsync } from "../services/Account";
import { store } from "./store";
import { runInAction } from "mobx";
import { router } from "../router/Router";
import { currentUser } from "../services/Account";

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
            store.commonStore.setToken(response.token);
            runInAction(() => {
                this.user = response;
            });
            router.navigate('/activities');
        } catch (error) {
            console.log(error);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await currentUser();
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.log(error);
        }
    }

}