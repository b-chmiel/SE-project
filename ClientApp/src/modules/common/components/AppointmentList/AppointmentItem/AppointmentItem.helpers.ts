import {colors} from '../../../../../globalTheme/theme';

export function getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
        case 'atservice':
            return colors.windsor;
        case 'checkedin':
            return colors.yellow;
        case 'repaired':
            return colors.green;
        case 'diagnose':
            return colors.red;
        default:
            return colors.silver;
    }
}
