import router from "@/router";
export function execRouter(url:string,params?:any) {
    router.push({
        path: url,
        query :params
    });
}
