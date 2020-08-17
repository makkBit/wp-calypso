/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { navigation, siteSelection } from 'wp-calypso-client/my-sites/controller';
import { security } from './controller';
import {
	setScroll,
	siteSettings,
} from 'wp-calypso-client/my-sites/site-settings/settings-controller';

export default function () {
	page(
		'/settings/security/:site_id',
		siteSelection,
		navigation,
		setScroll,
		siteSettings,
		security,
		makeLayout,
		clientRender
	);
}
