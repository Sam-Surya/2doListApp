import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { RouteComponent } from './routecomponent';

const injectionElement: HTMLElement | null = document.getElementById('root');
if (injectionElement != null) {
  injectionElement?.setAttribute('react-root', '');
  createRoot(injectionElement).render(
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>
  );
}