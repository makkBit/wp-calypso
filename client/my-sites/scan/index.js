/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { navigation, siteSelection, sites } from 'wp-calypso-client/my-sites/controller';
import { notFound, makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import isJetpackCloud from 'wp-calypso-client/lib/jetpack/is-jetpack-cloud';
import wrapInSiteOffsetProvider from 'wp-calypso-client/lib/wrap-in-site-offset';
import wpcomUpsellController from 'wp-calypso-client/lib/jetpack/wpcom-upsell-controller';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import isJetpackSectionEnabledForSite from 'wp-calypso-client/state/selectors/is-jetpack-section-enabled-for-site';
import {
	showUpsellIfNoScan,
	showUpsellIfNoScanHistory,
	scan,
	scanHistory,
} from 'wp-calypso-client/my-sites/scan/controller';
import WPCOMScanUpsellPage from 'wp-calypso-client/my-sites/scan/wpcom-upsell';
import getIsSiteWPCOM from 'wp-calypso-client/state/selectors/is-site-wpcom';

const notFoundIfNotEnabled = ( context, next ) => {
	const state = context.store.getState();
	const siteId = getSelectedSiteId( state );
	const showJetpackSection = isJetpackSectionEnabledForSite( state, siteId );
	const isWPCOMSite = getIsSiteWPCOM( state, siteId );

	if ( isWPCOMSite || ( ! isJetpackCloud() && ! showJetpackSection ) ) {
		return notFound( context, next );
	}

	next();
};

export default function () {
	page( '/scan', siteSelection, sites, navigation, makeLayout, clientRender );
	page(
		'/scan/:site',
		siteSelection,
		navigation,
		scan,
		wrapInSiteOffsetProvider,
		showUpsellIfNoScan,
		wpcomUpsellController( WPCOMScanUpsellPage ),
		notFoundIfNotEnabled,
		makeLayout,
		clientRender
	);

	page(
		'/scan/history/:site/:filter?',
		siteSelection,
		navigation,
		scanHistory,
		wrapInSiteOffsetProvider,
		showUpsellIfNoScanHistory,
		wpcomUpsellController( WPCOMScanUpsellPage ),
		notFoundIfNotEnabled,
		makeLayout,
		clientRender
	);

	page(
		'/scan/:site/:filter?',
		siteSelection,
		navigation,
		scan,
		wrapInSiteOffsetProvider,
		showUpsellIfNoScan,
		wpcomUpsellController( WPCOMScanUpsellPage ),
		notFoundIfNotEnabled,
		makeLayout,
		clientRender
	);
}
