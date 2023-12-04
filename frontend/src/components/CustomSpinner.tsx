import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function CustomSpinner() {
    return (
        <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>
    );
}
