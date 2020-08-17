/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { makeLayout, render as clientRender, notFound } from 'wp-calypso-client/controller';
import { navigation, siteSelection } from 'wp-calypso-client/my-sites/controller';
import {
	setScroll,
	siteSettings,
} from 'wp-calypso-client/my-sites/site-settings/settings-controller';
import isJetpackSectionEnabledForSite from 'wp-calypso-client/state/selectors/is-jetpack-section-enabled-for-site';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { jetpack } from './controller';

const notFoundIfNotEnabled = ( context, next ) => {
	const state = context.store.getState();
	const siteId = getSelectedSiteId( state );
	const showJetpackSection = isJetpackSectionEnabledForSite( state, siteId );

	if ( ! showJetpackSection ) {
		return notFound( context, next );
	}

	next();
};

export default function () {
	page(
		'/settings/jetpack/:site_id',
		siteSelection,
		navigation,
		setScroll,
		siteSettings,
		jetpack,
		notFoundIfNotEnabled,
		makeLayout,
		clientRender
	);
}
