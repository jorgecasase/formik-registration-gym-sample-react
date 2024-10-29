import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';

// Esquema de validación con Yup
const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es requerido'),
    apellidos: Yup.string().required('Los apellidos son requeridos'),
    miembros: Yup.number()
        .required('Especifica el número de miembros en la familia')
        .min(1, 'Debe haber al menos un miembro'),
});

// Función para enviar los datos a la API
const enviarDatosAPI = async (datos) => {
    const respuesta = await fetch('https://api.fitlife.com/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    });
    if (respuesta.ok) {
        console.log('Usuario registrado correctamente');
    } else {
        console.log('Error al registrar usuario');
    }
};

const DatosPersonales = () => {
    const [enviado, setEnviado] = React.useState(false);
    return (
        <div className="form-container">
            <h2>Datos Personales</h2>
            <Formik
                initialValues={{ nombre: '', apellidos: '', miembros: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    console.log(values);
                    setEnviado(true);
                    await enviarDatosAPI(values);
                }}
            >
                {() => (
                    <Form>
                        <div>
                            <label htmlFor="nombre">Nombre:</label>
                            <Field type="text" id="nombre" name="nombre" />
                            <ErrorMessage name="nombre" component="div" className="error-message" />
                        </div>

                        <div>
                            <label htmlFor="apellidos">Apellidos:</label>
                            <Field type="text" id="apellidos" name="apellidos" />
                            <ErrorMessage name="apellidos" component="div" className="error-message" />
                        </div>

                        <div>
                            <label htmlFor="miembros">Miembros en la familia:</label>
                            <Field type="number" id="miembros" name="miembros" />
                            <ErrorMessage name="miembros" component="div" className="error-message" />
                        </div>

                        <button
                            type="submit"
                            style={{
                                backgroundColor: enviado ? 'green' : '#007bff',
                                cursor: enviado ? 'not-allowed' : 'pointer',
                                opacity: enviado ? 0.6 : 1,
                            }}
                            disabled={enviado} // Deshabilita el botón si se ha enviado
                        >
                            {enviado ? 'Enviado' : 'Enviar'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DatosPersonales;