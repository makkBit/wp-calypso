/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import GeneralSettings from './section-general';
import JetpackBackupCredsBanner from 'wp-calypso-client/blocks/jetpack-backup-creds-banner';
import JetpackDevModeNotice from './jetpack-dev-mode-notice';
import Main from 'wp-calypso-client/components/main';
import QueryProductsList from 'wp-calypso-client/components/data/query-products-list';
import QuerySitePurchases from 'wp-calypso-client/components/data/query-site-purchases';
import SidebarNavigation from 'wp-calypso-client/my-sites/sidebar-navigation';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import SiteSettingsNavigation from './navigation';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';

/**
 * Style dependencies
 */
import './style.scss';

const SiteSettingsComponent = ( { siteId, translate } ) => {
	return (
		<Main className="site-settings">
			<DocumentHead title={ translate( 'Site Settings' ) } />
			<QueryProductsList />
			<QuerySitePurchases siteId={ siteId } />
			<JetpackDevModeNotice />
			<SidebarNavigation />
			<JetpackBackupCredsBanner event={ 'settings-backup-credentials' } />
			<FormattedHeader
				brandFont
				className="site-settings__page-heading"
				headerText={ translate( 'Settings' ) }
				align="left"
			/>
			<SiteSettingsNavigation section={ 'general' } />
			<GeneralSettings />
		</Main>
	);
};

SiteSettingsComponent.propTypes = {
	// Connected props
	siteId: PropTypes.number,
};

export default connect( ( state ) => ( {
	siteId: getSelectedSiteId( state ),
} ) )( localize( SiteSettingsComponent ) );
