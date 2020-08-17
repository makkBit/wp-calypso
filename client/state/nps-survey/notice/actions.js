/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import { NPS_SURVEY_DIALOG_IS_SHOWING } from 'wp-calypso-client/state/action-types';
import {
	setNpsSurveyEligibility,
	setNpsConciergeSessionAvailaibility,
} from 'wp-calypso-client/state/nps-survey/actions';

import 'wp-calypso-client/state/nps-survey/init';

export function setNpsSurveyDialogShowing( isShowing ) {
	return {
		type: NPS_SURVEY_DIALOG_IS_SHOWING,
		isShowing,
	};
}

export function setupNpsSurveyDevTrigger() {
	return ( dispatch ) => {
		if ( config.isEnabled( 'nps-survey/dev-trigger' ) ) {
			window.npsSurvey = function ( isAvailableForSupportSession = false ) {
				dispatch( setNpsSurveyEligibility( true ) );
				dispatch( setNpsConciergeSessionAvailaibility( isAvailableForSupportSession ) );
			};
		}
	};
}
