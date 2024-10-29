import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';

// Esquema de validación con Yup
const validationSchema = Yup.object({
    tipoEntrenamiento: Yup.string().required('Selecciona un tipo de entrenamiento'),
    objetivos: Yup.string().required('Selecciona un objetivo'),
    disponibilidad: Yup.array()
        .min(1, 'Selecciona al menos un día')
        .required('Selecciona tu disponibilidad'),
});

// Función para enviar los datos a la API
const enviarPreferenciasAPI = async (datos) => {
    const respuesta = await fetch('https://api.fitlife.com/preferencias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    });
    if (respuesta.ok) {
        console.log('Preferencias enviadas correctamente');
    } else {
        console.log('Error al enviar preferencias');
    }
};

const Preferencias = () => {
    const [enviado, setEnviado] = React.useState(false);
    return (
        <div className="form-container">
            <Formik
                initialValues={{
                    tipoEntrenamiento: '',
                    objetivos: '',
                    disponibilidad: [],
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    console.log(values);
                    setEnviado(true);
                    await enviarPreferenciasAPI(values);
                }}
            >
                {() => (
                    <Form>
                        <div>
                            <label htmlFor="tipoEntrenamiento">Tipo de Entrenamiento:</label>
                            <Field as="select" id="tipoEntrenamiento" name="tipoEntrenamiento">
                                <option value="">Selecciona una opción</option>
                                <option value="pesas">Pesas</option>
                                <option value="natacion">Natación</option>
                                <option value="yoga">Yoga</option>
                            </Field>
                            <ErrorMessage name="tipoEntrenamiento" component="div" />
                        </div>

                        <div>
                            <label htmlFor="objetivos">Objetivos:</label>
                            <Field as="select" id="objetivos" name="objetivos">
                                <option value="">Selecciona un objetivo</option>
                                <option value="alto_rendimiento">Alto Rendimiento</option>
                                <option value="mantenerse_activo">Mantenerse Activo</option>
                                <option value="salud">Salud</option>
                            </Field>
                            <ErrorMessage name="objetivos" component="div" />
                        </div>

                        <div>
                            <label>Disponibilidad (días de la semana):</label>
                            <div role="group" aria-labelledby="disponibilidad">
                                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
                                    <label key={dia}>
                                        <Field type="checkbox" name="disponibilidad" value={dia} />
                                        {dia}
                                    </label>
                                ))}
                            </div>
                            <ErrorMessage name="disponibilidad" component="div" />
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

export default Preferencias;