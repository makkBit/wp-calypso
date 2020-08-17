/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import JetpackCredentials from 'wp-calypso-client/my-sites/site-settings/jetpack-credentials';
import JetpackDevModeNotice from 'wp-calypso-client/my-sites/site-settings/jetpack-dev-mode-notice';
import JetpackManageErrorPage from 'wp-calypso-client/my-sites/jetpack-manage-error-page';
import Main from 'wp-calypso-client/components/main';
import QueryRewindState from 'wp-calypso-client/components/data/query-rewind-state';
import QuerySitePurchases from 'wp-calypso-client/components/data/query-site-purchases';
import SidebarNavigation from 'wp-calypso-client/my-sites/sidebar-navigation';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import SiteSettingsNavigation from 'wp-calypso-client/my-sites/site-settings/navigation';
import { siteHasScanProductPurchase } from 'wp-calypso-client/state/purchases/selectors';
import isRewindActive from 'wp-calypso-client/state/selectors/is-rewind-active';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import { getSelectedSite, getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';

const SiteSettingsJetpack = ( { site, siteId, siteIsJetpack, showCredentials, translate } ) => {
	//todo: this check makes sense in Jetpack section?
	if ( ! siteIsJetpack ) {
		return (
			<JetpackManageErrorPage
				action={ translate( 'Manage general settings for %(site)s', {
					args: { site: site.name },
				} ) }
				actionURL={ '/settings/general/' + site.slug }
				title={ translate( 'No Jetpack configuration is required.' ) }
				// line={ translate( 'Security management is automatic for WordPress.com sites.' ) }
				illustration="/calypso/images/illustrations/illustration-jetpack.svg"
			/>
		);
	}

	return (
		<Main className="settings-jetpack site-settings">
			<QueryRewindState siteId={ siteId } />
			<QuerySitePurchases siteId={ siteId } />
			<DocumentHead title={ translate( 'Site Settings' ) } />
			<JetpackDevModeNotice />
			<SidebarNavigation />
			<FormattedHeader
				brandFont
				className="settings-jetpack__page-heading"
				headerText={ translate( 'Settings' ) }
				align="left"
			/>
			<SiteSettingsNavigation site={ site } section="jetpack" />

			{ showCredentials && <JetpackCredentials /> }
		</Main>
	);
};

SiteSettingsJetpack.propTypes = {
	site: PropTypes.object,
	siteId: PropTypes.number,
	siteIsJetpack: PropTypes.bool,
	showCredentials: PropTypes.bool,
};

export default connect( ( state ) => {
	const site = getSelectedSite( state );
	const siteId = getSelectedSiteId( state );

	return {
		site,
		siteId,
		siteIsJetpack: isJetpackSite( state, siteId ),
		showCredentials: isRewindActive( state, siteId ) || siteHasScanProductPurchase( state, siteId ),
	};
} )( localize( SiteSettingsJetpack ) );
