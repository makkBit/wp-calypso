/**
 * Internal dependencies
 */
import { LOGIN_FORM_UPDATE } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/login/init';

export const formUpdate = () => ( { type: LOGIN_FORM_UPDATE } );
