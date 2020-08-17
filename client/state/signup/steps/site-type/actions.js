/**
 * Internal dependencies
 */
import { SIGNUP_STEPS_SITE_TYPE_SET } from 'wp-calypso-client/state/action-types';
import { getSiteTypePropertyValue } from 'wp-calypso-client/lib/signup/site-type';
import { submitSignupStep } from 'wp-calypso-client/state/signup/progress/actions';

import 'wp-calypso-client/state/signup/init';

export function setSiteType( siteType ) {
	return {
		type: SIGNUP_STEPS_SITE_TYPE_SET,
		siteType,
	};
}

export function submitSiteType( siteType, stepName = 'site-type' ) {
	return ( dispatch ) => {
		dispatch( setSiteType( siteType ) );

		let themeSlugWithRepo = undefined;
		if ( 'site-type-with-theme' !== stepName ) {
			themeSlugWithRepo =
				getSiteTypePropertyValue( 'slug', siteType, 'theme' ) || 'pub/independent-publisher-2';
		}

		dispatch(
			submitSignupStep(
				{ stepName },
				{ siteType, ...( themeSlugWithRepo && { themeSlugWithRepo } ) }
			)
		);
	};
}
