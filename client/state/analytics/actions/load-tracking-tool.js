/**
 * Internal dependencies
 */
import { ANALYTICS_TRACKING_ON } from 'wp-calypso-client/state/action-types';

export function loadTrackingTool( trackingTool ) {
	return {
		type: ANALYTICS_TRACKING_ON,
		trackingTool,
	};
}
