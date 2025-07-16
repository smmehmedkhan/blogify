/**
 * Active route helper
 * Checks current route to originals routes & toggle active class
 */
export default function isActiveRoute(route, currentRoute) {
  if (currentRoute === route) {
    return 'active';
  }

  // Only match if route is not root and current route matches exactly with trailing slash
  if (route !== '/' && currentRoute === route + '/') {
    return 'active';
  }

  return '';
}
