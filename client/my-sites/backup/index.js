/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import {
	backupDownload,
	backupRestore,
	backups,
	showUpsellIfNoBackup,
} from 'wp-calypso-client/my-sites/backup/controller';
import { backupMainPath, backupRestorePath, backupDownloadPath } from './paths';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { isEnabled } from 'wp-calypso-client/config';
import { navigation, siteSelection, sites } from 'wp-calypso-client/my-sites/controller';
import { notFound, makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import isJetpackCloud from 'wp-calypso-client/lib/jetpack/is-jetpack-cloud';
import isJetpackSectionEnabledForSite from 'wp-calypso-client/state/selectors/is-jetpack-section-enabled-for-site';
import wpcomUpsellController from 'wp-calypso-client/lib/jetpack/wpcom-upsell-controller';
import WPCOMUpsellPage from 'wp-calypso-client/my-sites/backup/wpcom-upsell';
import wrapInSiteOffsetProvider from 'wp-calypso-client/lib/wrap-in-site-offset';

const notFoundIfNotEnabled = ( context, next ) => {
	const state = context.store.getState();
	const siteId = getSelectedSiteId( state );
	const showJetpackSection = isJetpackSectionEnabledForSite( state, siteId );

	if ( ! isJetpackCloud() && ! showJetpackSection ) {
		return notFound( context, next );
	}

	next();
};

export default function () {
	/* handles /backup/:site/download/:rewindId, see `backupDownloadPath` */
	page(
		backupDownloadPath( ':site', ':rewindId' ),
		siteSelection,
		navigation,
		backupDownload,
		wrapInSiteOffsetProvider,
		wpcomUpsellController( WPCOMUpsellPage ),
		notFoundIfNotEnabled,
		makeLayout,
		clientRender
	);

	if ( isEnabled( 'jetpack/backups-restore' ) ) {
		/* handles /backup/:site/restore/:rewindId, see `backupRestorePath` */
		page(
			backupRestorePath( ':site', ':rewindId' ),
			siteSelection,
			navigation,
			backupRestore,
			wrapInSiteOffsetProvider,
			wpcomUpsellController( WPCOMUpsellPage ),
			notFoundIfNotEnabled,
			makeLayout,
			clientRender
		);
	}

	/* handles /backup/:site, see `backupMainPath` */
	page(
		backupMainPath( ':site' ),
		siteSelection,
		navigation,
		backups,
		wrapInSiteOffsetProvider,
		showUpsellIfNoBackup,
		wpcomUpsellController( WPCOMUpsellPage ),
		notFoundIfNotEnabled,
		makeLayout,
		clientRender
	);
	/* handles /backups, see `backupMainPath` */
	page( backupMainPath(), siteSelection, sites, makeLayout, clientRender );
}
