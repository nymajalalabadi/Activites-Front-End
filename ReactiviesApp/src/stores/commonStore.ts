import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    
    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if(token)
                {
                    localStorage.setItem('jwt', token)
                }
                else
                {
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    token : string | null = localStorage.getItem('jwt');
    appLoaded = false;


    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}