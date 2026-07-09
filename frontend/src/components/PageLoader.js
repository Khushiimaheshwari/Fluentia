import React from "react";

function PageLoader() {
    return (
        <div className="page-loader">
            <div className="page-loader-spinner" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="page-loader-text">Loading...</p>
        </div>
    );
}

export default PageLoader;
