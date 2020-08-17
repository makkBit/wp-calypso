/**
 * External dependencies
 */
import { filter } from 'lodash';

/**
 * Internal dependencies
 */
import { getActionLog } from 'wp-calypso-client/state/ui/action-log/selectors';
import { ROUTE_SET } from 'wp-calypso-client/state/action-types';

export default function hasNavigated( state ) {
	return filter( getActionLog( state ), { type: ROUTE_SET } ).length > 1;
}
