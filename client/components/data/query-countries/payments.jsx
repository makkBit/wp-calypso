/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import QueryCountries from 'wp-calypso-client/components/data/query-countries';
import { fetchPaymentCountries } from 'wp-calypso-client/state/countries/actions';

export default connect( null, { requestCountries: fetchPaymentCountries } )( QueryCountries );
