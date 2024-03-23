import React from "react";
import { Crossword } from "./Crossword";

export default function Home() {
    return (
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
            <div className="jumbotron jumbotron-fluid bg-transparent">
                <div className="container secondary-color">
                    <Crossword />
                </div>
            </div>
        </div>
    );
};
