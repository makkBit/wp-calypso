/**
 * Global polyfills
 */
import 'wp-calypso-client/boot/polyfills';
import { render } from 'wp-calypso-client/controller/web-util';

/**
 * External dependencies
 */
import debugFactory from 'debug';
import page from 'page';

/**
 * Internal dependencies
 */
import createStore from './store';
import { setupMiddlewares, configureReduxStore } from './common';
import initLoginSection from 'wp-calypso-client/login';
import userFactory from 'wp-calypso-client/lib/user';
import { setupLocale } from 'wp-calypso-client/boot/locale';
import { setStore } from 'wp-calypso-client/state/redux-store';

const debug = debugFactory( 'calypso' );

import 'wp-calypso-client/assets/stylesheets/style.scss';
// goofy import for environment badge, which is SSR'd
import 'wp-calypso-client/components/environment-badge/style.scss';

// Create Redux store
const store = createStore();
setStore( store );

const boot = ( currentUser ) => {
	debug( "Starting Calypso. Let's do this." );

	configureReduxStore( currentUser, store );
	setupMiddlewares( currentUser, store );
	setupLocale( currentUser.get(), store );

	page( '*', ( context, next ) => {
		context.store = store;
		next();
	} );

	page.exit( '*', ( context, next ) => {
		context.store = store;
		next();
	} );

	initLoginSection( ( route, ...handlers ) => page( route, ...handlers, render ) );
	page.start( { decodeURLComponents: false } );
};

window.AppBoot = () => {
	const user = userFactory();
	user.initialize().then( () => boot( user ) );
};
