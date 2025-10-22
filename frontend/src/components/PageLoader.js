import React from 'react';
import { Loader } from "lucide-react";

function PageLoader() {
    return (
        <div className="page-loader">
            <Loader className="animate-spin" size={40} />
            <p>Loading...</p>
        </div>
    );
};

export default PageLoader;