import React from "react";

export const ERRcomponent = ({ message }) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
            width: '40%',
            marginLeft: '30%'
        }}>

            <div class="card">
                <div class="card-status-top bg-danger"></div>
                <div class="card-body">
                    <h3 class="card-title">ERROR</h3>
                    <p>{message}</p>
                </div>

            </div>
        </div>
    )

}