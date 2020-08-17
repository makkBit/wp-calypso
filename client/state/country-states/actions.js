/**
 * Internal dependencies
 */
import wpcom from 'wp-calypso-client/lib/wp';
import {
	COUNTRY_STATES_RECEIVE,
	COUNTRY_STATES_REQUEST,
	COUNTRY_STATES_REQUEST_FAILURE,
	COUNTRY_STATES_REQUEST_SUCCESS,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/country-states/init';

export function receiveCountryStates( countryStates, countryCode ) {
	countryCode = countryCode.toLowerCase();

	return {
		type: COUNTRY_STATES_RECEIVE,
		countryCode,
		countryStates,
	};
}

export function requestCountryStates( countryCode ) {
	countryCode = countryCode.toLowerCase();

	return ( dispatch ) => {
		dispatch( {
			type: COUNTRY_STATES_REQUEST,
			countryCode,
		} );

		return wpcom
			.undocumented()
			.getDomainRegistrationSupportedStates( countryCode )
			.then( ( countryStates ) => {
				dispatch( receiveCountryStates( countryStates, countryCode ) );
				dispatch( {
					type: COUNTRY_STATES_REQUEST_SUCCESS,
					countryCode,
				} );
			} )
			.catch( ( error ) =>
				dispatch( {
					type: COUNTRY_STATES_REQUEST_FAILURE,
					countryCode,
					error,
				} )
			);
	};
}
