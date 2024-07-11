import React from "react"

export const Botton_Navbar = ({ texto, proppage }) => {
    return (
        <button
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth : 0,
                borderRadius : 5,
                backgroundColor : proppage === texto ?  'black' : '#979A9A' ,
                width: 150,
                height: 30,
            }}
        >
            <h5 style={{ color: proppage === texto ?  'white' : 'white' , margin: 0 }}>{texto}</h5>
        </button>
    )
}

export const Botton_Navbar_Admin = ({ texto , prop  }) => {
    return(
        <>
         <button
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor : prop === texto ? 'black' : 'white',
                width: 200,
                height: 30, // Ajusta la altura del botón según sea necesario
                borderRadius: 50, // Opcional: agrega borde redondeado al botón
            }}
        >
            <h5 style={{ color: prop === texto ? 'white' : 'black', margin: 0 }}>{texto}</h5>
        </button>
        </>
    )
}

export const Botton_small_Admin = ({ texto , prop  }) => {
    return(
        <>
         <button
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: prop === texto ? 2 : 0,
                borderBlockColor: prop === texto ? 'black' : 'white',
                backgroundColor : 'white',
                width: 100,
                height: 20, // Ajusta la altura del botón según sea necesario
                borderRadius: 50, // Opcional: agrega borde redondeado al botón
                margin : '0px 5px 0px 5px'
            }}
        >
            <h6
                style={{
                    color: 'black',
                    margin: 0, // Elimina el margen predeterminado del <h4>
                }}
            >
                {texto}
            </h6>
        </button>
        </>
    )
}