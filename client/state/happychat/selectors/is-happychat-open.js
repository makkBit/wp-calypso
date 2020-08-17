/**
 * Internal dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';
import { getSectionName } from 'wp-calypso-client/state/ui/selectors';

/**
 * Returns whether the docked happychat client UI should be displayed
 * The docked UI should not be displayed when viewing the happychat section
 *
 * @param {object} state - global redux state
 * @returns {boolean}
 */
export default createSelector(
	( state ) => state.happychat.ui.isOpen && getSectionName( state ) !== 'happychat',
	( state ) => [ state.happychat.ui.isOpen, getSectionName( state ) ]
);
