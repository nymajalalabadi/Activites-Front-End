import http from "./httpService";

export function GetAllActivitiesAsync() {
    return http.get("Activites/GetAllActivitiesAsync").then(({data}) => data);
}

export function GetActivityAsync(id) {
    return http.get(`Activites/GetActivityAsync/${id}`).then(({data}) => data);
}

export function CreateActivityAsync(activity) {
    return http.post("Activites/CreateActivityAsync", activity).then(({data}) => data);
}

export function UpdateActivityAsync(activity) {
    return http.put("Activites/UpdateActivityAsync", activity).then(({data}) => data);
}

export function DeleteActivityAsync(id) {
    return http.delete(`Activites/DeleteActivityAsync/${id}`).then(({data}) => data);
}