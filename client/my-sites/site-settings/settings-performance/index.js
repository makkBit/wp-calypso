/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { navigation, siteSelection } from 'wp-calypso-client/my-sites/controller';
import { performance } from './controller';
import { siteSettings } from 'wp-calypso-client/my-sites/site-settings/settings-controller';

export default function () {
	page(
		'/settings/performance/:site_id',
		siteSelection,
		navigation,
		siteSettings,
		performance,
		makeLayout,
		clientRender
	);
}
