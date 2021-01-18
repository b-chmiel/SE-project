import {screen} from '@testing-library/react';
import React from 'react';
import {AppointmentView} from '../../modules/client/views/AppointmentView/AppointmentView';
import {render} from '../../test-utils';

test('renders Appointment View component', () => {
    render(<AppointmentView />);
    const linkElement = screen.getByText(/REQUIRED ACTIONS/i);
    expect(linkElement).toBeInTheDocument();
});
