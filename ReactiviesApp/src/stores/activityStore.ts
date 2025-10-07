import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/Activity";
import { v4 as uuid } from 'uuid';
import { CreateActivityAsync, DeleteActivityAsync, GetActivityAsync, GetAllActivitiesAsync, UpdateActivityAsync } from "../services/Activites";

export default class ActivityStore {

    constructor() {
        makeAutoObservable(this);
    }

    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await GetAllActivitiesAsync();
            runInAction(() => {
                if (activities && Array.isArray(activities)) {
                    activities.forEach(activity => {
                        this.setActivity(activity);
                    });
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    }

    

    loadActivity = async (id: string) => {
        this.loadingInitial = true;
        try {
            const activity = this.getActivity(id);
            if(activity) {
                this.selectedActivity = activity;
                return activity;
            } else {
                try {
                    const activity = await GetActivityAsync(id);
                    this.setActivity(activity);
                    this.selectedActivity = activity;
                    return activity;
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    }


    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        if (activity.date && typeof activity.date === 'string') {
            activity.date = activity.date.split('T')[0];
        }
        this.activityRegistry.set(activity.id, activity);
    }

    

    createActivity = async (activity: Activity) => {
        activity.id = uuid();
        this.loading = true;
        try {
            await CreateActivityAsync(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
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
                this.activityRegistry.set(activity.id, activity);
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
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id === id) this.selectedActivity = undefined;
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