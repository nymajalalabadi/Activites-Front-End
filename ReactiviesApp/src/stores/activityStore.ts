import { makeAutoObservable, observable } from "mobx";

export default class ActivityStore {
    constructor() {
        makeAutoObservable(this, {
            title: observable,
        });
    }

    title = 'hello from the store';

}