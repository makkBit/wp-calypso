/**
 * Internal dependencies
 */
import { keyedReducer, withoutPersistence } from 'wp-calypso-client/state/utils';
import {
	CONCIERGE_APPOINTMENT_DETAILS_REQUEST,
	CONCIERGE_APPOINTMENT_DETAILS_UPDATE,
} from 'wp-calypso-client/state/action-types';

export const appointmentDetails = withoutPersistence( ( state = null, action ) => {
	switch ( action.type ) {
		case CONCIERGE_APPOINTMENT_DETAILS_REQUEST:
			return null;
		case CONCIERGE_APPOINTMENT_DETAILS_UPDATE:
			return action.appointmentDetails;
	}

	return state;
} );

export default keyedReducer( 'appointmentId', appointmentDetails );
