import http from "./httpService";

export function GetAllActivitiesAsync() {
    return http.get("Activites/GetAllActivitiesAsync");
}

export function GetActivityAsync(id) {
    return http.get(`Activites/GetActivityAsync?id=${id}`);
}

export function CreateActivityAsync(activity) {
    return http.post("Activites/CreateActivityAsync", activity);
}

export function UpdateActivityAsync(activity) {
    return http.put(`Activites/UpdateActivityAsync/${activity.id}`, activity);
}

export function DeleteActivityAsync(id) {
    return http.delete(`Activites/DeleteActivityAsync/${id}`);
}