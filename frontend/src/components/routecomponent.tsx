import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

export function RouteComponent(): JSX.Element {
  return (
    <Routes>
      <Route path="*" element={ <Dashboard/> } />
    </Routes>
  );
}