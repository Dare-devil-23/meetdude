import axiosInstance from "@/services/axios";
import { Space } from "@/types";

export const getSpacesForUserApi = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/api/v1/space/all`).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export const deleteSpaceApi = (spaceId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.delete(`/api/v1/space/${spaceId}`).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export const getMapsApi = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/api/v1/space/maps`).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export const createSpaceApi = (payload: {
    name: string;
    mapId?: string | null;
    dimensions: string;
}): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.post(`/api/v1/space`, payload).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}
