/**
 * External dependencies
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Internal dependencies
 */
import isRequestingJetpackScanHistory from 'wp-calypso-client/state/selectors/is-requesting-jetpack-scan-history';
import { requestJetpackScanHistory } from 'wp-calypso-client/state/jetpack-scan/history/actions';

interface Props {
	siteId: number;
}

const QueryJetpackScanHistory = ( { siteId }: Props ) => {
	const requestingJetpackScanHistory = useSelector( ( state ) =>
		isRequestingJetpackScanHistory( state, siteId )
	);
	const dispatch = useDispatch();

	React.useEffect( () => {
		if ( requestingJetpackScanHistory ) {
			return;
		}
		siteId && dispatch( requestJetpackScanHistory( siteId ) );
	}, [ dispatch, siteId ] );

	return null;
};

export default QueryJetpackScanHistory;
