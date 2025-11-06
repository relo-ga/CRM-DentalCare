import apiClient from "./client"

export interface CitasDoctor {
            id: string;
            clinica_id: string;
            paciente_id: string;
            tratamiento_id: string;
            doctor_id: string;
            fecha: string;
            estado: string;
            ingreso: number;
            creado_en: string;
            notas: string;
            paciente: {
                id: string;
                clinica_id: string;
                nombre: string;
                email: string;
                telefono: string;
                fecha_nacimiento: string;
                genero: string;
                notas: string;
                creado_en: string;            }
        }
    
export const getCitasDoctor = async (id: string): Promise<CitasDoctor[]> => {
    const res = await apiClient.get<CitasDoctor[]>(`/cita/citadoctor/${id}`)
    return res.data;
}