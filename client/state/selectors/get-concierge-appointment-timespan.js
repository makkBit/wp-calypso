/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/concierge/init';

export default ( state ) => get( state, 'concierge.appointmentTimespan', null );
