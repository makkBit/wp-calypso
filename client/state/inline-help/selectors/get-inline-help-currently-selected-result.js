/**
 * External Dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import getInlineHelpSearchResultsForQuery from 'wp-calypso-client/state/inline-help/selectors/get-inline-help-search-results-for-query';
import getSelectedResultIndex from 'wp-calypso-client/state/inline-help/selectors/get-selected-result-index';
import getContextualHelpResults from 'wp-calypso-client/state/inline-help/selectors/get-contextual-help-results';

import 'wp-calypso-client/state/inline-help/init';

/**
 * Returns the selected search result item
 *
 * @param  {object}  state  Global state tree
 * @returns {object}        The selected search result
 */
export default function getInlineHelpCurrentlySelectedResult( state ) {
	const results = getInlineHelpSearchResultsForQuery( state );
	const selectedIndex = getSelectedResultIndex( state );

	return get( results, selectedIndex ) || getContextualHelpResults( state )[ selectedIndex ];
}
