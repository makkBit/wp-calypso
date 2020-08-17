/**
 * External dependencies
 */
import page from 'page';
import { startsWith } from 'lodash';

/**
 * Internal dependencies
 */
import { tagListing } from './controller';
import {
	initAbTests,
	preloadReaderBundle,
	sidebar,
	updateLastRoute,
} from 'wp-calypso-client/reader/controller';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';

const redirectHashtaggedTags = ( context, next ) => {
	if ( context.hashstring && startsWith( context.pathname, '/tag/#' ) ) {
		page.redirect( `/tag/${ context.hashstring }` );
	}
	next();
};

export default function () {
	page( '/tag/*', preloadReaderBundle, redirectHashtaggedTags, initAbTests );
	page( '/tag/:tag', updateLastRoute, sidebar, tagListing, makeLayout, clientRender );
}
