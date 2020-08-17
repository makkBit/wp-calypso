/**
 * External dependencies
 */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Internal dependencies
 */
import { isRequestingActivePromotions } from 'wp-calypso-client/state/active-promotions/selectors';
import { requestActivePromotions } from 'wp-calypso-client/state/active-promotions/actions';

const request = () => ( dispatch, getState ) => {
	if ( ! isRequestingActivePromotions( getState() ) ) {
		dispatch( requestActivePromotions() );
	}
};

export default function QueryActivePromotions() {
	const dispatch = useDispatch();

	useEffect( () => {
		dispatch( request() );
	}, [ dispatch ] );

	return null;
}
