import { makeAutoObservable } from "mobx";

export default class CommonStore {
    constructor() {
        makeAutoObservable(this);
    }

    token : string | null = null;
    appLoaded = false;


    setToken = (token: string | null) => {
        this.token = token;
        if (token) 
        {
            localStorage.setItem('jwt', token);
        }
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}