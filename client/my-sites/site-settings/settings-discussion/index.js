/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { discussion } from './controller';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { navigation, siteSelection } from 'wp-calypso-client/my-sites/controller';
import { siteSettings } from 'wp-calypso-client/my-sites/site-settings/settings-controller';

export default function () {
	page(
		'/settings/discussion/:site_id',
		siteSelection,
		navigation,
		siteSettings,
		discussion,
		makeLayout,
		clientRender
	);
}
