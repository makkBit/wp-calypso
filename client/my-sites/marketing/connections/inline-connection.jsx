/**
 * External dependencies
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { getKeyringServiceByName } from 'wp-calypso-client/state/sharing/services/selectors';
import QueryKeyringServices from 'wp-calypso-client/components/data/query-keyring-services';
import QueryPublicizeConnections from 'wp-calypso-client/components/data/query-publicize-connections';
import InlineConnectionAction from 'wp-calypso-client/my-sites/marketing/connections/inline-connection-action';

class InlineConnection extends Component {
	static propTypes = {
		serviceName: PropTypes.string.isRequired,
	};

	render() {
		const { service } = this.props;

		return (
			<div>
				<QueryPublicizeConnections selectedSite />
				<QueryKeyringServices />

				{ service && <InlineConnectionAction service={ service } /> }
			</div>
		);
	}
}

export default connect( ( state, props ) => ( {
	service: getKeyringServiceByName( state, props.serviceName ),
} ) )( InlineConnection );
