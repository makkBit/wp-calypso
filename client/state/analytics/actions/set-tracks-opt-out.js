/**
 * Internal dependencies
 */
import { ANALYTICS_TRACKS_OPT_OUT } from 'wp-calypso-client/state/action-types';

export function setTracksOptOut( isOptingOut ) {
	return {
		type: ANALYTICS_TRACKS_OPT_OUT,
		isOptingOut,
	};
}
