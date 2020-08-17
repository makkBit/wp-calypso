/**
 * Internal Dependencies
 */
import { getPreference } from 'wp-calypso-client/state/preferences/selectors';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { savePreference } from 'wp-calypso-client/state/preferences/actions';

export const dismissNudge = () => ( dispatch, getState ) => {
	const siteId = getSelectedSiteId( getState() );
	const preference = getPreference( getState(), 'upwork-dismissible-nudge' ) || {};

	return dispatch(
		savePreference( 'upwork-dismissible-nudge', {
			...preference,
			...{
				[ siteId ]: [
					...( preference[ siteId ] || [] ),
					{
						dismissedAt: Date.now(),
						type: 'dismiss',
					},
				],
			},
		} )
	);
};
