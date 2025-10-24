import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";

interface Store {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),

}

export const StoreContext = createContext<Store>(store);

export function useStore() {
    return useContext(StoreContext);
}
