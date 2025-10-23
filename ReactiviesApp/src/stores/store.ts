import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import UserStore from "../models/userStore";

interface Store {
    activityStore: ActivityStore;
    userStore: UserStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
}

export const StoreContext = createContext<Store>(store);

export function useStore() {
    return useContext(StoreContext);
}
