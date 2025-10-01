import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/Activity";
import { v4 as uuid } from 'uuid';
import { CreateActivityAsync, DeleteActivityAsync, GetAllActivitiesAsync, UpdateActivityAsync } from "../services/Activites";

export default class ActivityStore {

    constructor() {
        makeAutoObservable(this);
    }

    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    loadActivities = async () => {
        this.loadingInitial = true;
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
        } finally {
            runInAction(() => {
                this.loadingInitial = false;
            });
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

    createActivity = async (activity: Activity) => {
        activity.id = uuid();
        this.loading = true;
        try {
            await CreateActivityAsync(activity);

            runInAction(() => {
                this.activities.push(activity);
                this.selectedActivity = activity;
                this.editMode = false;
            });

        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await UpdateActivityAsync(activity);

            runInAction(() => {
                this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.selectedActivity = activity;
                this.editMode = false;
            });

        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await DeleteActivityAsync(id);

            runInAction(() => {
                this.activities = [...this.activities.filter(a => a.id !== id)];
                if(this.selectedActivity?.id === id) this.cancelSelectActivity();
                this.editMode = false;
            });

        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

}