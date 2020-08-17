/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import webRouter from './index.web';
import { makeLayout, redirectLoggedIn, setUpLocale } from 'wp-calypso-client/controller';
import { getLanguageRouteParam } from 'wp-calypso-client/lib/i18n-utils';

/**
 * Re-exports
 */
export { LOGIN_SECTION_DEFINITION } from './index.web';

export default ( router ) => {
	if ( config.isEnabled( 'login/magic-login' ) ) {
		const lang = getLanguageRouteParam();

		// Only do the basics for layout on the server-side
		router( `/log-in/link/use/${ lang }`, setUpLocale, redirectLoggedIn, makeLayout );
	}

	webRouter( router );
};
