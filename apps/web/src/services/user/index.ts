import axiosInstance from "../axios";

export const getAvailableAvatars = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.get("/api/v1/avatars").then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const updateUserAvatar = ({ avatarId }: { avatarId: string }): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.post("/api/v1/user/metadata", { avatarId }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
};
