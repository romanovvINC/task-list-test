import { createRouter, createWebHistory } from 'vue-router'
import {routeConfig} from "@/shared/config/routeConfig/routeConfig";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeConfig,
})

export default router
