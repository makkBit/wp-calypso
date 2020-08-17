/**
 * External dependencies
 */

import page from 'page';

/**
 * Internal Dependencies
 */
import { navigation, siteSelection } from 'wp-calypso-client/my-sites/controller';
import postsController from './controller';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { getSiteFragment } from 'wp-calypso-client/lib/route';

export default function () {
	page(
		'/posts/:author(my)?/:status(published|drafts|scheduled|trashed)?/:domain?',
		siteSelection,
		navigation,
		postsController.posts,
		makeLayout,
		clientRender
	);

	page( '/posts/*', ( { path } ) => {
		const siteFragment = getSiteFragment( path );

		if ( siteFragment ) {
			return page.redirect( `/posts/my/${ siteFragment }` );
		}

		return page.redirect( '/posts/my' );
	} );
}
