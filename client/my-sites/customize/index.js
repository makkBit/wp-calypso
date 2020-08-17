/**
 * External dependencies
 */

import page from 'page';

/**
 * Internal dependencies
 */
import { siteSelection, sites, navigation } from 'wp-calypso-client/my-sites/controller';
import { customize } from './controller';
import config from 'wp-calypso-client/config';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';

export default function () {
	if ( config.isEnabled( 'manage/customize' ) ) {
		page( '/customize/:panel([^.]+)?', siteSelection, sites, makeLayout, clientRender );
		page(
			'/customize/:panel?/:domain',
			siteSelection,
			navigation,
			customize,
			makeLayout,
			clientRender
		);
	}
}
