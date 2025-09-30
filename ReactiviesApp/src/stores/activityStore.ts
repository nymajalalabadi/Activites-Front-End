import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/Activity";
import { GetAllActivitiesAsync } from "../services/Activites";

export default class ActivityStore {

    constructor() {
        makeAutoObservable(this);
    }

    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;


    loadActivities = async () => {
        try {
            const activities = await GetAllActivitiesAsync();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity);
                });
            });
        } catch (error) {
            console.log(error);
        }
    }


    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
    }

    cancelSelectActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

}