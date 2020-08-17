/**
 * Internal Dependencies
 */
import { EXPERIMENT_ASSIGN } from 'wp-calypso-client/state/action-types';
import { ExperimentResponse } from 'wp-calypso-client/state/experiments/types';

/**
 * Assign the user to the specified experiments
 *
 * @param experiments The experiments to assign to the user
 */
export const assignToExperiments = ( experiments: ExperimentResponse ) => ( {
	type: EXPERIMENT_ASSIGN,
	...experiments,
} );
