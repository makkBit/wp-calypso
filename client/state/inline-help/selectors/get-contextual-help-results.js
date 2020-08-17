/**
 * External Dependencies
 */
import { flow } from 'lodash';

/**
 * Internal Dependencies
 */
import { getLastRouteAction } from 'wp-calypso-client/state/ui/action-log/selectors';
import pathToSection from 'wp-calypso-client/lib/path-to-section';
import { getContextResults } from 'wp-calypso-client/blocks/inline-help/contextual-help';

import 'wp-calypso-client/state/inline-help/init';

/**
 * Returns an array of contextual results
 *
 * @param  {object}  state  Global state tree
 * @returns {Array}         List of contextual results based on route
 */
export default flow(
	getLastRouteAction,
	( x ) => x.path,
	pathToSection,
	getContextResults,
	( x = [] ) => x
);
