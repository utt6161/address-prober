import { PortalProvider } from '@gorhom/portal';
import * as React from 'react';
import Index from "./src/Index"


export default function App() {
    return (
        <PortalProvider>
            <Index />
        </PortalProvider>
    );
}