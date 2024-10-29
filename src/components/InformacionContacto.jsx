import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';

// Esquema de validación con Yup
const validationSchema = Yup.object({
    telefono: Yup.string()
        .matches(/^[0-9]{9}$/, 'El teléfono debe tener 9 dígitos')
        .required('El teléfono es requerido'),
    correo: Yup.string()
        .email('Debe ser un correo válido')
        .required('El correo es requerido'),
});

// Función para enviar los datos a la API
const enviarContactoAPI = async (datos) => {
    const respuesta = await fetch('https://api.fitlife.com/contacto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    });
    if (respuesta.ok) {
        console.log('Información de contacto enviada correctamente');
    } else {
        console.log('Error al enviar información de contacto');
    }
};

const InformacionContacto = () => {
    const [enviado, setEnviado] = React.useState(false);
    return (

        <div className="form-container">
            <h2>Información de contacto</h2>
            <Formik
                initialValues={{ telefono: '', correo: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    console.log(values);
                    setEnviado(true);
                    await enviarContactoAPI(values);
                }}
            >
                {() => (
                    <Form>
                        <div>
                            <label htmlFor="telefono">Teléfono:</label>
                            <Field type="text" id="telefono" name="telefono" />
                            <ErrorMessage name="telefono" component="div" className="error-message" />
                        </div>

                        <div>
                            <label htmlFor="correo">Correo Electrónico:</label>
                            <Field type="email" id="correo" name="correo" />
                            <ErrorMessage name="correo" component="div" className="error-message" />
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

export default InformacionContacto;