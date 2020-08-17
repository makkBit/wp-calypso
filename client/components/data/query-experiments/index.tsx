/**
 * External Dependencies
 */

import { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import { fetchExperiments } from 'wp-calypso-client/state/data-layer/wpcom/experiments';
import { nextRefresh } from 'wp-calypso-client/state/experiments/selectors';
import { AppState } from 'wp-calypso-client/types';

type QueryProps = {
	doFetchExperiments: typeof fetchExperiments;
	updateAfter: number;
};

const QueryExperiments: FunctionComponent< QueryProps > = ( {
	updateAfter,
	doFetchExperiments,
} ) => {
	useEffect( () => {
		if ( updateAfter < Date.now() ) doFetchExperiments();
	}, [ updateAfter, doFetchExperiments ] );

	return null;
};

const mapStateToProps = ( state: AppState ) => ( {
	updateAfter: nextRefresh( state ),
} );

export default connect( mapStateToProps, { doFetchExperiments: fetchExperiments } )(
	QueryExperiments
);
