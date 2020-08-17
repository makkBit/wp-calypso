/**
 * External dependencies
 */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Internal dependencies
 */
import { getAllDomainsRequest } from 'wp-calypso-client/state/all-domains/actions';
import isRequestingAllDomains from 'wp-calypso-client/state/selectors/is-requesting-all-domains';

const request = () => ( dispatch, getState ) => {
	if ( ! isRequestingAllDomains( getState() ) ) {
		dispatch( getAllDomainsRequest() );
	}
};

export default function QueryAllDomains() {
	const dispatch = useDispatch();

	useEffect( () => {
		dispatch( request() );
	}, [ dispatch ] );

	return null;
}
