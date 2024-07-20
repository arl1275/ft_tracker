import React from "react"

export const Botton_Navbar = ({ texto, proppage }) => {
    return (
        <button
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: proppage === texto ? 'black' : 'white',
                borderWidth : 0,
                width: 150,
                height: 30,
            }}
        >
            <h5 style={{ color: proppage === texto ? 'white' : 'grey', margin: 0, fontWeight: proppage === texto ? 'bold' : 'inherit' }}>{texto}</h5>
        </button>
    )
}

export const Botton_Navbar_Admin = ({ texto, prop }) => {
    return (
        <>
            <button
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: prop === texto ? 'white' : 'black',
                    width: 200,
                    height: 30, // Ajusta la altura del botón según sea necesario
                    borderRadius: 5, // Opcional: agrega borde redondeado al botón
                    borderWidth: 0
                }}
            >
                <h5 style={{ color: prop === texto ? 'black' : 'white', margin: 0 }}>{texto}</h5>
            </button>
        </>
    )
}

export const Botton_small_Admin = ({ texto, proppage }) => {
    return (
        <>
            <button
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: proppage === texto ? 2 : 0,
                    backgroundColor: proppage === texto ? 'black' : '#D0D3D4',
                    width: 150,
                    height: 25,
                    borderRadius: 5,
                    margin: '0px 5px 0px 5px'
                }}
            >
                <h6 style={{ color: 'white', margin: 0, fontSize: 12 }}>{texto}</h6>
            </button>
        </>
    )
}