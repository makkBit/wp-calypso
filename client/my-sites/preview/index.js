/**
 * Internal dependencies
 */

import { makeLayout } from 'wp-calypso-client/controller';
import { siteSelection, sites, navigation } from 'wp-calypso-client/my-sites/controller';
import { preview } from './controller';

export default function ( router ) {
	router( '/view', siteSelection, sites, makeLayout );
	router( '/view/:site', siteSelection, navigation, preview, makeLayout );
}
