export type Avatar = {
    id: string;
    imageUrl: string;
    name: string;
}

export type Space = {
    id: string;
    name: string;
    thumbnail: string;
    dimensions: string;
}

export type Map = {
    id: string;
    name: string;
    thumbnail: string;
    dimensions: string;
}

export type User = {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar: Avatar;
}

export type Element = {
    id: string,
    imageUrl: string,
    width: number,
    height: number,
    static: boolean
}