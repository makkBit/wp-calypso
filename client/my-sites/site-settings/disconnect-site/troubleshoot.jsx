/**
 * External dependencies
 */
import React from 'react';
import Gridicon from 'wp-calypso-client/components/gridicon';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import HelpButton from 'wp-calypso-client/jetpack-connect/help-button';
import JetpackConnectHappychatButton from 'wp-calypso-client/jetpack-connect/happychat-button';
import LoggedOutFormLinkItem from 'wp-calypso-client/components/logged-out-form/link-item';
import LoggedOutFormLinks from 'wp-calypso-client/components/logged-out-form/links';
import { addQueryArgs } from 'wp-calypso-client/lib/route';
import { recordTracksEvent, withAnalytics } from 'wp-calypso-client/state/analytics/actions';
import getSiteUrl from 'wp-calypso-client/state/selectors/get-site-url';
import isSiteOnFreePlan from 'wp-calypso-client/state/selectors/is-site-on-free-plan';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';

const Troubleshoot = ( { isFreePlan, siteUrl, trackDebugClick, translate } ) => (
	<LoggedOutFormLinks>
		<LoggedOutFormLinkItem
			href={ addQueryArgs( { url: siteUrl }, 'https://jetpack.com/support/debug/' ) }
			onClick={ trackDebugClick }
		>
			<Gridicon size={ 18 } icon="offline" /> { translate( 'Diagnose a connection problem' ) }
		</LoggedOutFormLinkItem>
		{ isFreePlan ? (
			<HelpButton label={ translate( 'Get help from our Happiness Engineers' ) } />
		) : (
			<JetpackConnectHappychatButton
				label={ translate( 'Get help from our Happiness Engineers' ) }
				eventName="calypso_jetpack_disconnect_chat_initiated"
			>
				<HelpButton label={ translate( 'Get help from our Happiness Engineers' ) } />
			</JetpackConnectHappychatButton>
		) }
	</LoggedOutFormLinks>
);

export default connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );
		return {
			siteUrl: getSiteUrl( state, siteId ),
			isFreePlan: isSiteOnFreePlan( state, siteId ),
		};
	},
	{
		trackDebugClick: withAnalytics( recordTracksEvent( 'calypso_jetpack_disconnect_debug_click' ) ),
	}
)( localize( Troubleshoot ) );
