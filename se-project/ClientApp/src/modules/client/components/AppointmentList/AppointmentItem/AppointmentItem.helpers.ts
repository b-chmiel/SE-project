import {colors} from '../../../../../globalTheme/theme';

export function getStatusColor(status: string): string {
    switch (status) {
        case 'planned':
            return colors.silver;
        case 'atService':
            return colors.yellow;
        case 'repaired':
            return colors.green;
        case 'checkedIn':
            return colors.red;
        default:
            return colors.green;
    }
}
