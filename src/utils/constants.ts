export const ROUTES = {
    HOME: '/',
    DASHBOARD: "/auth/dashboard",
    LEADERBOARDS: "/auth/leaderboards",
    PROFILE: "/auth/profile",
    GAME: "/auth/game",
    REGISTER_PROCESS: "/register-process",
}

export const SOCIAL_MEDIA = {
    YOUTUBE: "",
    DISCORD: "",
    LINKEDIN: "https://www.linkedin.com/company/kryzel/",
    TWITTER: "https://x.com/kryzel_io",
    TELEGRAM: "https://t.me/KryzelCommunity",
}

export const BASE_URL = "https://api-backend.kryzel.io";
// export const BASE_URL = "http://localhost:4000";

export enum APIURL {
    LOGIN = "login",
    REGISTER = "register",
    GOOGLELOGIN = "/user/google-login",
    INVITE = "/user/invite",
    PROFILE = "/user/profile",
    GETCREDITSCORELIST = "/user/get-credit-score-list"
}
