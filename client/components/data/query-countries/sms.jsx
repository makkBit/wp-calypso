/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import QueryCountries from 'wp-calypso-client/components/data/query-countries';
import { fetchSmsCountries } from 'wp-calypso-client/state/countries/actions';

export default connect( null, { requestCountries: fetchSmsCountries } )( QueryCountries );
