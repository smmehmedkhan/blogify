/**
 * Active route helper
 * Checks current route to originals routes & toggle active class
 */
export default function isActiveRoute(route, currentRoute) {
  return currentRoute === route ||
    (route !== '/' && currentRoute.startsWith(route))
    ? 'active'
    : '';
}
