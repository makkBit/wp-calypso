/**
 * External dependencies
 */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Internal dependencies
 */
import { isProductsListFetching } from 'wp-calypso-client/state/products-list/selectors';
import { requestProductsList } from 'wp-calypso-client/state/products-list/actions';

const request = () => ( dispatch, getState ) => {
	if ( ! isProductsListFetching( getState() ) ) {
		dispatch( requestProductsList() );
	}
};

export default function QueryProductsList() {
	const dispatch = useDispatch();

	// Only runs on mount.
	useEffect( () => {
		dispatch( request() );
	}, [ dispatch ] );

	return null;
}
