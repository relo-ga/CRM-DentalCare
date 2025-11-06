import { apiClient } from './client';

export interface Usuario{
    id: string;
    nombre: string;
    email: string;
    rol: string;
}

export interface CitasUsuario{
    id: string;
    nombre: string;
    email: string;
    password: string;
    rol: string;
    creado_en: string;
    clinica_id: string;
    clinica: {
        id: string;
        nombre: string;
        direccion: string;
        telefono: string;
        email: string;
        citas: [
            {
                id: string;
                clinica_id: string;
                paciente_id: string;
                tratamiento_id: string;
                doctor_id: string;
                fecha: string;
                estado: string;
                ingreso: 50.5,
                creado_en: string;
                notas: string;            
            }
        ]
    }
}

export const getUsuarios = async (): Promise<Usuario[]> => {
    const res = await apiClient.get<Usuario[]>('/usuarios');
    return res.data;
}

export const getCitasUsuario = async(id: string): Promise<CitasUsuario> =>{
    const res = await apiClient.get<CitasUsuario>(`/usuarios/citas/${id}`)
    return res.data;
}