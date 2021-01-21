import {colors} from '../../../../../globalTheme/theme';

export function getStatusColor(status: string): string {
    switch (status) {
        case 'at service':
            return colors.silver;
        case 'checked in':
            return colors.yellow;
        case 'repaired':
            return colors.green;
        case 'diagnose':
            return colors.red;
        default:
            return colors.windsor;
    }
}
