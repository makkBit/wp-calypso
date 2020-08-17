/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

/**
 * Internal dependencies
 */
import FormTextInput from 'wp-calypso-client/components/forms/form-text-input';

import 'wp-calypso-client/state/form/init';

const TextInputRenderer = ( { input, meta, ...props } ) => (
	<FormTextInput { ...input } { ...props } />
);

const ReduxFormTextInput = ( props ) => <Field component={ TextInputRenderer } { ...props } />;

ReduxFormTextInput.propTypes = {
	name: PropTypes.string.isRequired,
};

export default ReduxFormTextInput;
