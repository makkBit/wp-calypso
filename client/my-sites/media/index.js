/**
 * External dependencies
 */

import page from 'page';

/**
 * Internal dependencies
 */
import { navigation, siteSelection, sites } from 'wp-calypso-client/my-sites/controller';
import mediaController from './controller';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { getSiteFragment } from 'wp-calypso-client/lib/route';

export default function () {
	page( '/media', siteSelection, sites, makeLayout, clientRender );

	page(
		'/media/:filter(this-post|images|documents|videos|audio)?/:domain',
		siteSelection,
		navigation,
		mediaController.media,
		makeLayout,
		clientRender
	);

	page(
		'/media/:domain/:mediaId',
		siteSelection,
		navigation,
		mediaController.media,
		makeLayout,
		clientRender
	);

	page( '/media/*', ( { path } ) => {
		const siteFragment = getSiteFragment( path );

		if ( siteFragment ) {
			return page.redirect( `/media/${ siteFragment }` );
		}

		return page.redirect( '/media' );
	} );
}
