import { makeAutoObservable, observable } from "mobx";
import { Activity } from "../models/Activity";
import { GetAllActivitiesAsync } from "../services/Activites";

export default class ActivityStore {

    constructor() {
        makeAutoObservable(this);
    }

    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;

    title = 'hello from the store';

    loadActivities = async () => {
        try {
            const activities = await GetAllActivitiesAsync();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            });
        } catch (error) {
            console.log(error);
        }
    }

}