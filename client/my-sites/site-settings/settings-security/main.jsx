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
import isJetpackSectionEnabledForSite from 'wp-calypso-client/state/selectors/is-jetpack-section-enabled-for-site';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import FormSecurity from 'wp-calypso-client/my-sites/site-settings/form-security';
import JetpackCredentials from 'wp-calypso-client/my-sites/site-settings/jetpack-credentials';
import JetpackCredentialsBanner from 'wp-calypso-client/my-sites/site-settings/jetpack-credentials-banner';
import JetpackDevModeNotice from 'wp-calypso-client/my-sites/site-settings/jetpack-dev-mode-notice';
import JetpackManageErrorPage from 'wp-calypso-client/my-sites/jetpack-manage-error-page';
import JetpackMonitor from 'wp-calypso-client/my-sites/site-settings/form-jetpack-monitor';
import Main from 'wp-calypso-client/components/main';
import QueryRewindState from 'wp-calypso-client/components/data/query-rewind-state';
import QuerySitePurchases from 'wp-calypso-client/components/data/query-site-purchases';
import SidebarNavigation from 'wp-calypso-client/my-sites/sidebar-navigation';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import SiteSettingsNavigation from 'wp-calypso-client/my-sites/site-settings/navigation';
import { shouldDisplayJetpackCredentialsBanner } from 'wp-calypso-client/state/site-settings/jetpack-credentials-banner/selectors';
import { siteHasScanProductPurchase } from 'wp-calypso-client/state/purchases/selectors';
import isRewindActive from 'wp-calypso-client/state/selectors/is-rewind-active';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import { getSelectedSite, getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';

const SiteSettingsSecurity = ( {
	site,
	siteId,
	siteIsJetpack,
	hasScanProduct,
	hasActiveRewind,
	isJetpackSectionEnabled,
	shouldDisplayBanner,
	translate,
} ) => {
	if ( ! siteIsJetpack ) {
		return (
			<JetpackManageErrorPage
				action={ translate( 'Manage general settings for %(site)s', {
					args: { site: site.name },
				} ) }
				actionURL={ '/settings/general/' + site.slug }
				title={ translate( 'No security configuration is required.' ) }
				line={ translate( 'Security management is automatic for WordPress.com sites.' ) }
				illustration="/calypso/images/illustrations/illustration-jetpack.svg"
			/>
		);
	}

	// If Jetpack section is enabled, we no longer display the credentials here, instead we
	// display a Banner with a CTA that points to their new location (Settings > Jetpack).
	const showCredentials = ! isJetpackSectionEnabled && ( hasActiveRewind || hasScanProduct );
	const showJetpackBanner =
		isJetpackSectionEnabled && ( hasActiveRewind || hasScanProduct ) && shouldDisplayBanner;

	return (
		<Main className="settings-security site-settings">
			<QueryRewindState siteId={ siteId } />
			<QuerySitePurchases siteId={ siteId } />
			<DocumentHead title={ translate( 'Site Settings' ) } />
			<JetpackDevModeNotice />
			<SidebarNavigation />
			<FormattedHeader
				brandFont
				className="settings-security__page-heading"
				headerText={ translate( 'Settings' ) }
				align="left"
			/>
			<SiteSettingsNavigation site={ site } section="security" />
			{ showCredentials && <JetpackCredentials /> }
			{ showJetpackBanner && <JetpackCredentialsBanner siteSlug={ site.slug } /> }
			<JetpackMonitor />
			<FormSecurity />
		</Main>
	);
};

SiteSettingsSecurity.propTypes = {
	site: PropTypes.object,
	siteId: PropTypes.number,
	siteIsJetpack: PropTypes.bool,
	hasScanProduct: PropTypes.bool,
	hasActiveRewind: PropTypes.bool,
	isJetpackSectionEnabled: PropTypes.bool,
	shouldDisplayBanner: PropTypes.bool,
};

export default connect( ( state ) => {
	const site = getSelectedSite( state );
	const siteId = getSelectedSiteId( state );

	return {
		site,
		siteId,
		siteIsJetpack: isJetpackSite( state, siteId ),
		hasScanProduct: siteHasScanProductPurchase( state, siteId ),
		hasActiveRewind: isRewindActive( state, siteId ),
		isJetpackSectionEnabled: isJetpackSectionEnabledForSite( state, siteId ),
		shouldDisplayBanner: shouldDisplayJetpackCredentialsBanner( state ),
	};
} )( localize( SiteSettingsSecurity ) );
