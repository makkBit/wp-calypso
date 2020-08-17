/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { navigation, siteSelection, sites } from 'wp-calypso-client/my-sites/controller';
import { settings } from 'wp-calypso-client/landing/jetpack-cloud/sections/settings/controller';
import { settingsPath } from 'wp-calypso-client/lib/jetpack/paths';
import isJetpackCloud from 'wp-calypso-client/lib/jetpack/is-jetpack-cloud';

export default function () {
	if ( isJetpackCloud() ) {
		page( settingsPath(), siteSelection, sites, navigation, makeLayout, clientRender );
		page( settingsPath( ':site' ), siteSelection, navigation, settings, makeLayout, clientRender );
	}
}
