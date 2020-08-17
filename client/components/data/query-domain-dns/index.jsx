/**
 * External dependencies
 */
import React from 'react';
import { useDispatch } from 'react-redux';

/**
 * Internal dependencies
 */
import { fetchDns } from 'wp-calypso-client/state/domains/dns/actions';

export default function QueryDomainDns( { domain } ) {
	const dispatch = useDispatch();
	React.useEffect( () => {
		dispatch( fetchDns( domain ) );
	}, [ dispatch, domain ] );

	return null;
}
