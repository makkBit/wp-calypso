/**
 * Internal dependencies
 */
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { updateConciergeBookingStatus } from 'wp-calypso-client/state/concierge/actions';
import { errorNotice } from 'wp-calypso-client/state/notices/actions';
import { CONCIERGE_APPOINTMENT_CANCEL } from 'wp-calypso-client/state/action-types';
import {
	CONCIERGE_STATUS_CANCELLED,
	CONCIERGE_STATUS_CANCELLING,
	CONCIERGE_STATUS_CANCELLING_ERROR,
} from 'wp-calypso-client/me/concierge/constants';
import fromApi from './from-api';
import { recordTracksEvent, withAnalytics } from 'wp-calypso-client/state/analytics/actions';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

export const cancelConciergeAppointment = ( action ) => {
	return [
		updateConciergeBookingStatus( CONCIERGE_STATUS_CANCELLING ),
		http(
			{
				method: 'POST',
				path: `/concierge/schedules/${ action.scheduleId }/appointments/${ action.appointmentId }/cancel`,
				apiNamespace: 'wpcom/v2',
				body: {},
			},
			action
		),
	];
};

export const onSuccess = () =>
	withAnalytics(
		recordTracksEvent( 'calypso_concierge_appointment_cancellation_successful' ),
		updateConciergeBookingStatus( CONCIERGE_STATUS_CANCELLED )
	);

export const onError = () => {
	return [
		errorNotice( "We couldn't cancel your session, please try again later." ),
		withAnalytics(
			recordTracksEvent( 'calypso_concierge_appointment_cancellation_error' ),
			updateConciergeBookingStatus( CONCIERGE_STATUS_CANCELLING_ERROR )
		),
	];
};

registerHandlers( 'state/data-layer/wpcom/concierge/schedules/appointments/cancel/index.js', {
	[ CONCIERGE_APPOINTMENT_CANCEL ]: [
		dispatchRequest( { fetch: cancelConciergeAppointment, onSuccess, onError, fromApi } ),
	],
} );

export default {};
