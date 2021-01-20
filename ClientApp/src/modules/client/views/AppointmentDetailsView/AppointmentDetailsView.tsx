import axios from 'axios';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

interface Props {
    visitId: number
}

export const ApppointmentDetailsView: React.FC = (Props) => {
    let query = useQuery();
    React.useEffect(()=>{
        axios.get("/")

    }, [])

    return (
        
        <div>

        </div>
    );
};
