/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import config from 'wp-calypso-client/config';
import HappychatConnection from 'wp-calypso-client/components/happychat/connection-connected';
import QueryTicketSupportConfiguration from 'wp-calypso-client/components/data/query-ticket-support-configuration';
import QueryLanguageNames from 'wp-calypso-client/components/data/query-language-names';
import QuerySupportHistory from 'wp-calypso-client/components/data/query-support-history';
import { openChat as openHappychat } from 'wp-calypso-client/state/happychat/ui/actions';
import { initialize as initializeDirectly } from 'wp-calypso-client/state/help/directly/actions';
import { getCurrentUserEmail } from 'wp-calypso-client/state/current-user/selectors';
import { isRequestingSites } from 'wp-calypso-client/state/sites/selectors';
import { getHelpSelectedSiteId } from 'wp-calypso-client/state/help/selectors';
import {
	isTicketSupportConfigurationReady,
	getTicketSupportRequestError,
} from 'wp-calypso-client/state/help/ticket/selectors';
import isHappychatUserEligible from 'wp-calypso-client/state/happychat/selectors/is-happychat-user-eligible';
import isDirectlyUninitialized from 'wp-calypso-client/state/selectors/is-directly-uninitialized';

class QueryInlineHelpSupportTypes extends Component {
	componentDidMount() {
		this.prepareDirectlyWidget();
	}

	componentDidUpdate() {
		// Directly initialization is a noop if it's already happened. This catches
		// instances where a state/prop change moves a user to Directly support from
		// some other variation.
		this.prepareDirectlyWidget();
	}

	prepareDirectlyWidget = () => {
		if ( this.hasDataToDetermineVariation() && this.props.isDirectlyUninitialized ) {
			this.props.initializeDirectly();
		}
	};

	/**
	 * Before determining which variation to assign, certain async data needs to be in place.
	 * This function helps assess whether we're ready to say which variation the user should see.
	 *
	 * @returns {boolean} Whether all the data is present to determine the variation to show
	 */
	hasDataToDetermineVariation = () => {
		const ticketReadyOrError =
			this.props.ticketSupportConfigurationReady || this.props.ticketSupportRequestError !== null;
		const happychatReadyOrDisabled =
			! config.isEnabled( 'happychat' ) || this.props.isHappychatUserEligible !== null;

		return ticketReadyOrError && happychatReadyOrDisabled;
	};

	render() {
		return (
			<React.Fragment>
				<QueryTicketSupportConfiguration />
				<QuerySupportHistory email={ this.props.currentUserEmail } />
				<QueryLanguageNames />
				{ this.props.shouldStartHappychatConnection && <HappychatConnection /> }
			</React.Fragment>
		);
	}
}

export default connect(
	( state ) => ( {
		shouldStartHappychatConnection:
			! isRequestingSites( state ) && !! getHelpSelectedSiteId( state ),
		ticketSupportConfigurationReady: isTicketSupportConfigurationReady( state ),
		ticketSupportRequestError: getTicketSupportRequestError( state ),
		isHappychatUserEligible: isHappychatUserEligible( state ),
		isDirectlyUninitialized: isDirectlyUninitialized( state ),
		currentUserEmail: getCurrentUserEmail( state ),
	} ),
	{
		initializeDirectly,
		openHappychat,
	}
)( QueryInlineHelpSupportTypes );
