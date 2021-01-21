import {Visit} from '../../api/visitAPI.types';
import {ActionsSubmitionType} from './CaseView.types';

export const dateFormat = 'MM/dd/yyyy HH:mm';

export const initialValues = (visitInfo: Visit | null): ActionsSubmitionType => ({
    requiredActions: visitInfo?.requiredActions ?? [],
});
