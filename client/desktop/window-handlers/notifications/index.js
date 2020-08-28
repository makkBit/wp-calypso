/**
 * External Dependencies
 */
const { ipcMain: ipc, Notification } = require( 'electron' ); // eslint-disable-line import/no-extraneous-dependencies

/**
 * Internal dependencies
 */
const Settings = require( 'desktop/lib/settings' );
const Platform = require( 'desktop/lib/platform' );
const log = require( 'desktop/lib/logger' )( 'desktop:notifications' );

function updateNotificationBadge( count ) {
	const badgeEnabled = Settings.getSetting( 'notification-badge' );
	if ( ! badgeEnabled ) {
		return;
	}

	const bounceEnabled = Settings.getSetting( 'notification-bounce' );

	if ( count > 0 ) {
		Platform.showNotificationsBadge( count, bounceEnabled );
	} else {
		Platform.clearNotificationsBadge();
	}
}

module.exports = function () {
	ipc.on( 'unread-notices-count', function ( _, count ) {
		log.info( 'Notification count received: ' + count );

		updateNotificationBadge( count );
	} );

	ipc.on( 'preferences-changed-notification-badge', function ( _, arg ) {
		updateNotificationBadge( arg );
	} );

	ipc.on( 'received-notifications', function ( _, notifications ) {
		log.info( `Received ${ notifications.length } new notifications: `, notifications );

		// TODO: Add "notifications" to Preferences, check if enabled
		// Compare to SummaryInList component in apps/notifications/src/panel
		if ( Notification.isSupported() ) {
			for ( let i = 0; i < notifications.length; i++ ) {
				// https://www.electronjs.org/docs/api/notification
				// TODO: icon,
				// TODO: inspect JSON notification output
				// TODO: how to mark as read? Keeps repeatedly displaying the same notification.
				// Note: don't mark as read until notification is clicked. In the meantime, find a way to update
				const note = notifications[ i ];
				const body = note.subject.length > 1 ? note.subject[ 1 ].text : '';
				const notification = new Notification( {
					title: note.subject[ 0 ],
					body: body,
					silent: true,
					hasReply: false,
				} );
				notification.show();
			}
		}
	} );
};
