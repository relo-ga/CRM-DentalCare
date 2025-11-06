'use client'

import { getCitasUsuario, CitasUsuario } from "@/api/usuarios"
import { useQuery } from "@tanstack/react-query"

//esto está definido como en authSlice, hay que unificar todo a futuro
interface User {
    id: string;
    nombre: string;
    email: string;
}

interface CitasUsuarioDashboardProps {
  usuario: User | null; 
}

export function CitasUsuarioDashboard({ usuario }: CitasUsuarioDashboardProps) {

    const { data, isLoading, error } = useQuery<CitasUsuario>({
        queryKey: ['citas', usuario?.id],
        queryFn: async () => {
            const res = await getCitasUsuario(usuario!.id)
            return res
        },
        enabled: !!usuario,
    });

    if (!usuario) return <p>No hay usuario seleccionado</p>;

    return(
        <div>
            <h2>Citas de {usuario.nombre}</h2>
            {isLoading && <p>Cargando...</p>}
            {error && <p>Error al cargar usuarios.</p>}
            <ul> Las citas:
                { data?.clinica.citas.map((item,index)=>(
                    <li key={index}>
                        {item.clinica_id} - {item.paciente_id} 
                    </li>
                ))}
            </ul>
        </div>
    );
}