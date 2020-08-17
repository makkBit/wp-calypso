/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { navigation, siteSelection } from 'wp-calypso-client/my-sites/controller';
import { pages } from './controller';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { getSiteFragment } from 'wp-calypso-client/lib/route';

export default function () {
	page(
		'/pages/:status(published|drafts|scheduled|trashed)/:domain?',
		siteSelection,
		navigation,
		pages,
		makeLayout,
		clientRender
	);

	page( '/pages/:domain?', siteSelection, navigation, pages, makeLayout, clientRender );

	page( '/pages/*', ( { path } ) => {
		const siteFragment = getSiteFragment( path );
		if ( siteFragment ) {
			page.redirect( `/pages/${ siteFragment }` );
			return;
		}

		page.redirect( '/pages' );
	} );
}
