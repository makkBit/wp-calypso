/**
 * External Dependencies
 */
const ipc = require( 'wp-calypso-client/desktop/lib/calypso-commands' );

/**
 * Internal dependencies
 */
const calypsoMenu = require( 'wp-calypso-client/desktop/lib/menu/calypso-menu' );

module.exports = function ( app, mainWindow ) {
	return calypsoMenu( mainWindow ).concat(
		{
			type: 'separator',
		},
		{
			label: 'Sign out',
			requiresUser: true,
			enabled: false,
			click: function () {
				ipc.signOut( mainWindow );
			},
		}
	);
};
