/**
 * Internal dependencies
 */

import Dispatcher from 'wp-calypso-client/dispatcher';

const PeopleActions = {
	removePeopleNotices: ( logs ) => {
		Dispatcher.handleViewAction( {
			type: 'REMOVE_PEOPLE_NOTICES',
			logs: logs,
		} );
	},
};

export default PeopleActions;
