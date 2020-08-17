/**
 * Internal dependencies
 */

import { makeLayout } from 'wp-calypso-client/controller';
import { siteSelection, navigation, sites } from 'wp-calypso-client/my-sites/controller';
import { list, redirect } from './controller';
import config from 'wp-calypso-client/config';

export default function ( router ) {
	if ( ! config.isEnabled( 'manage/custom-post-types' ) ) {
		return;
	}

	router( '/types/:type/:status?/:site', siteSelection, navigation, list, makeLayout );
	router( '/types/:type', siteSelection, sites, makeLayout );
	router( '/types', redirect );
}
