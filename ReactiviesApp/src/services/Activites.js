import http from "./httpService";

export function GetAllActivitiesAsync() {
    return http.get("Activites/GetAllActivitiesAsync").then(({data}) => data);
}