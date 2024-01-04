import type { Router } from 'express'
import { globSync } from 'glob'

export function registerRoutes (router: Router) {
  const routes = globSync(__dirname + '**/*.route.*')
  routes.map(route => register(route, router))
}

export async function register (routerPath: string, router: Router) {
  const route = await import(routerPath)
  void route.default(router)
}
