/**
 * Internal dependencies
 */
import { SIGNUP_STEPS_SURVEY_SET } from 'wp-calypso-client/state/action-types';
import {
	composeAnalytics,
	recordCustomAdWordsRemarketingEvent,
	recordCustomFacebookConversionEvent,
	withAnalytics,
} from 'wp-calypso-client/state/analytics/actions';

import 'wp-calypso-client/state/signup/init';

export function setSurvey( survey ) {
	const vertical = survey.vertical;
	const attributes = { vertical };

	return withAnalytics(
		composeAnalytics(
			recordCustomAdWordsRemarketingEvent( attributes ),
			recordCustomFacebookConversionEvent( 'VerticalSelectedEvent', attributes )
		)
	)( {
		type: SIGNUP_STEPS_SURVEY_SET,
		survey,
	} );
}
