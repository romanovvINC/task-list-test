import type {RouteRecordRaw} from "vue-router";
import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";

export enum AppRoutes {
  MAIN = 'main',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '/:pathMatch(.*)*',
};

export const routeConfig: RouteRecordRaw[] = [
  {
    path: RoutePath.main,
    name: [AppRoutes.MAIN].toString(),
    component: MainPage,
  },
  {
    path: RoutePath.not_found,
    name: [AppRoutes.NOT_FOUND].toString(),
    component: NotFoundPage,
  },
];
