import React from 'react';
import {Visit} from '../../../employee/api/visitAPI.types';
import {VisitItem} from './AppointmentItem/AppointmentItem';

interface Props {
    visits: Visit[];
    detailsPath: string;
}
export const VisitsList: React.FC<Props> = ({visits, detailsPath}) => {
    return (
        <>
            {visits?.map((visit, i) => (
                <VisitItem visit={visit} key={i} detailsPath={detailsPath} />
            ))}
        </>
    );
};
