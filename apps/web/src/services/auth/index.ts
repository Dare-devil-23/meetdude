import axiosInstance from "@/services/axios";

export const signinApi = (params: { username: string, password: string }): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.post("/api/v1/signin", params).then((response) => {
            if (response?.status === 200) {
                resolve(response.data);
            } else {
                reject({ message: "No api response" });
            }
        }).catch((error) => {
            reject(error);
        });
    });
};

export const verifyTokenApi = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.get("/api/v1/user/verify-token").then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
};

export const signupApi = (params: { username: string, password: string, email: string }): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.post("/api/v1/signup", params).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
};
