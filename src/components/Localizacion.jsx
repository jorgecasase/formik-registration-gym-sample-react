import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css'

// Esquema de validación con Yup
const validationSchema = Yup.object({
    ciudad: Yup.string().required('La ciudad es requerida'),
    calle: Yup.string().required('La calle es requerida'),
    numero: Yup.number()
        .typeError('El número debe ser un valor numérico')
        .required('El número es requerido')
        .positive('El número debe ser positivo')
        .integer('El número debe ser un valor entero'),
    codigoPostal: Yup.string()
        .matches(/^[0-9]{5}$/, 'El código postal debe tener 5 dígitos')
        .required('El código postal es requerido'),
});

// Función para enviar los datos a la API
const enviarLocalizacionAPI = async (datos) => {
    const respuesta = await fetch('https://api.fitlife.com/localizacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    });
    if (respuesta.ok) {
        console.log('Localización enviada correctamente');
    } else {
        console.log('Error al enviar localización');
    }
};

const Localizacion = () => {
    const [enviado, setEnviado] = React.useState(false);
    return (

        <div className="form-container">
            <Formik
                initialValues={{ ciudad: '', calle: '', numero: '', codigoPostal: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    console.log(values);
                    setEnviado(true);
                    await enviarLocalizacionAPI(values);
                }}
            >
                {() => (
                    <Form>
                        <h2>Localización</h2>
                        <div>
                            <label htmlFor="ciudad">Ciudad:</label>
                            <Field type="text" id="ciudad" name="ciudad" />
                            <ErrorMessage name="ciudad" component="div" className="error-message" />
                        </div>

                        <div>
                            <label htmlFor="calle">Calle:</label>
                            <Field type="text" id="calle" name="calle" />
                            <ErrorMessage name="calle" component="div" className="error-message" />
                        </div>

                        <div>
                            <label htmlFor="numero">Número:</label>
                            <Field type="text" id="numero" name="numero" />
                            <ErrorMessage name="numero" component="div" className="error-message" />
                        </div>

                        <div>
                            <label htmlFor="codigoPostal">Código Postal:</label>
                            <Field type="text" id="codigoPostal" name="codigoPostal" />
                            <ErrorMessage name="codigoPostal" component="div" className="error-message" />
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

export default Localizacion;