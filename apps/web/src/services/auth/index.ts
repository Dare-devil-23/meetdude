import axiosInstance from "@/services/axios";

export const signinApi = (params: { usernameOrEmail: string, password: string }): Promise<any> => {
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

export const getUserApi = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.get("/api/v1/user").then((response) => {
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

export const updateUserRoleApi = (params: { userId: string, role: string }): Promise<any> => {
    return new Promise((resolve, reject) => {
        axiosInstance.put(`/api/v1/admin/user/${params.userId}/role`, { type: params.role }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
};