/**
 * navigation.js — Single source of truth for the route table.
 *
 *   To add a new feature with its own routes:
 *     1. Create the feature folder under src/features/<name>/.
 *     2. In its index.js, register components and export `<name>Routes`.
 *     3. Import that array here and spread it into `routes`.
 *     4. (Optional) Add the path to the menu in
 *        src/ui/components/site-header/site-header.js so it appears in the header.
 *
 *   That is the entire process. No other file needs to know about the new
 *   routes — bootstrap.js calls router.register(routes) at startup.
 */

import { homeRoutes }         from '../../features/home/index.js';
import { tutorialRoutes }     from '../../features/tutorial/index.js';
import { architectureRoutes } from '../../features/architecture/index.js';
import { aboutRoutes }        from '../../features/about/index.js';

const routes = [
  ...homeRoutes,
  ...tutorialRoutes,
  ...architectureRoutes,
  ...aboutRoutes,
];

export default routes;