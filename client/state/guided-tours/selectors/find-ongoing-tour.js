/**
 * External dependencies
 */
import { findLast } from 'lodash';

/**
 * Internal dependencies
 */
import { getActionLog } from 'wp-calypso-client/state/ui/action-log/selectors';
import { GUIDED_TOUR_UPDATE } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/guided-tours/init';

/*
 * When applicable, returns the name of the tour that has been started and not
 * yet finished or dimissed according to the action log.
 */
export default ( state ) => {
	const last = findLast( getActionLog( state ), { type: GUIDED_TOUR_UPDATE } );
	return last && last.shouldShow === undefined && last.tour;
};
