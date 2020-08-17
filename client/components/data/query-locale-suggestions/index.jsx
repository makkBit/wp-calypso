/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import getLocaleSuggestions from 'wp-calypso-client/state/selectors/get-locale-suggestions';
import { requestLocaleSuggestions } from 'wp-calypso-client/state/i18n/locale-suggestions/actions';

class QueryLocaleSuggestions extends Component {
	static propTypes = {
		localeSuggestions: PropTypes.array,
		requestLocaleSuggestions: PropTypes.func,
	};

	static defaultProps = {
		requestLocaleSuggestions: () => {},
	};

	componentDidMount() {
		if ( ! this.props.localeSuggestions ) {
			this.props.requestLocaleSuggestions();
		}
	}

	render() {
		return null;
	}
}

export default connect(
	( state ) => ( {
		localeSuggestions: getLocaleSuggestions( state ),
	} ),
	{ requestLocaleSuggestions }
)( QueryLocaleSuggestions );
