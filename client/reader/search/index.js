/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { search } from './controller';
import { preloadReaderBundle, sidebar, updateLastRoute } from 'wp-calypso-client/reader/controller';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';

export default function () {
	page(
		'/read/search',
		preloadReaderBundle,
		updateLastRoute,
		sidebar,
		search,
		makeLayout,
		clientRender
	);
}
