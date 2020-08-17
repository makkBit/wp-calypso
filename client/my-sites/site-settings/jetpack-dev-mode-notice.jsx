/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import isJetpackSiteInDevelopmentMode from 'wp-calypso-client/state/selectors/is-jetpack-site-in-development-mode';
import Notice from 'wp-calypso-client/components/notice';
import NoticeAction from 'wp-calypso-client/components/notice/notice-action';
import QueryJetpackConnection from 'wp-calypso-client/components/data/query-jetpack-connection';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';

const JetpackDevModeNotice = ( { isJetpackSiteInDevMode, siteId, siteIsJetpack, translate } ) => {
	if ( ! siteIsJetpack ) {
		return null;
	}

	return (
		<div className="site-settings__jetpack-dev-mode-notice">
			<QueryJetpackConnection siteId={ siteId } />

			{ isJetpackSiteInDevMode && (
				<Notice
					text={ translate(
						'Some features are disabled because your site is in development mode.'
					) }
					showDismiss={ false }
				>
					<NoticeAction href={ 'https://jetpack.com/support/development-mode/' } external>
						{ translate( 'Learn more' ) }
					</NoticeAction>
				</Notice>
			) }
		</div>
	);
};

export default connect( ( state ) => {
	const siteId = getSelectedSiteId( state );
	const siteIsJetpack = isJetpackSite( state, siteId );

	return {
		isJetpackSiteInDevMode: isJetpackSiteInDevelopmentMode( state, siteId ),
		siteId,
		siteIsJetpack,
	};
} )( localize( JetpackDevModeNotice ) );
