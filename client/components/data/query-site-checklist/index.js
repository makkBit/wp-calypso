/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**
 * Internal dependencies
 */
import { requestSiteChecklist } from 'wp-calypso-client/state/checklist/actions';
import isSiteEligibleForFullSiteEditing from 'wp-calypso-client/state/selectors/is-site-eligible-for-full-site-editing';

export default function QuerySiteChecklist( { siteId } ) {
	const dispatch = useDispatch();
	const isSiteEligibleForFSE = useSelector( ( state ) =>
		isSiteEligibleForFullSiteEditing( state, siteId )
	);

	useEffect( () => {
		if ( siteId ) {
			dispatch( requestSiteChecklist( siteId, isSiteEligibleForFSE ) );
		}
	}, [ dispatch, siteId, isSiteEligibleForFSE ] );

	return null;
}

QuerySiteChecklist.propTypes = { siteId: PropTypes.number.isRequired };
