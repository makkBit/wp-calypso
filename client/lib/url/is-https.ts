/**
 * Internal dependencies
 */
import { URL as URLString } from 'wp-calypso-client/types';

export default function isHttps( url: URLString ): boolean {
	return !! url && url.startsWith( 'https://' );
}
