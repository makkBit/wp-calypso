/**
 * External dependencies
 */

import { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { requestSubscriptionsList } from 'wp-calypso-client/state/memberships/subscriptions/actions';

class QueryMembershipsSubscriptions extends Component {
	componentDidMount() {
		this.props.requestSubscriptionsList();
	}

	render() {
		return null;
	}
}

export default connect( null, { requestSubscriptionsList } )( QueryMembershipsSubscriptions );
