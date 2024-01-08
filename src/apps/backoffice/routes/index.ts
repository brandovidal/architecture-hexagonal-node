import type { Router } from 'express'
import { globSync } from 'glob'

export async function registerRoutes (router: Router) {
  const routes = globSync(__dirname + '**/*.route.*')

  for (const route of routes) {
    await register(route, router)
  }
}

export async function register (routerPath: string, router: Router) {
  const route = await import(routerPath)
  route.default(router)
}
