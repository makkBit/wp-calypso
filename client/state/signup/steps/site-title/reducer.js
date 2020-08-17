/**
 * Internal dependencies
 */
import {
	SIGNUP_COMPLETE_RESET,
	SIGNUP_STEPS_SITE_TITLE_SET,
} from 'wp-calypso-client/state/action-types';

import { withSchemaValidation } from 'wp-calypso-client/state/utils';
import { siteTitleSchema } from './schema';

export default withSchemaValidation( siteTitleSchema, ( state = '', action ) => {
	switch ( action.type ) {
		case SIGNUP_STEPS_SITE_TITLE_SET: {
			return action.siteTitle;
		}
		case SIGNUP_COMPLETE_RESET: {
			return '';
		}
	}

	return state;
} );
