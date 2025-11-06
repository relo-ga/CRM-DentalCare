import { getCitasDoctor } from "@/api/citas";
import type { CitasDoctor } from "@/api/citas";
import { useQuery } from "@tanstack/react-query";

interface DataUser {
    id: string;
    nombre: string;
    email: string;
}

interface DataProps{
    dataUsuario: DataUser | null;
}

export default function CitasDoctor({dataUsuario}: DataProps){
    const { data, isLoading, error } = useQuery<CitasDoctor[]>({
        queryKey: ['citasDoctor', dataUsuario?.id],
        queryFn: async () => {
            const res = await getCitasDoctor(dataUsuario!.id);
            return res;
        },
        enabled: !!dataUsuario,
    });

    if(!dataUsuario) return <p>No hay citas programadas.</p>
    console.log(data)
    return(
        <div>
            <h2>Las Citas programadas son las siguientes:</h2>
            { isLoading && <p>Cargando...</p> }
            { error && <p>Error al cargar las citas.</p>}
            { data?.map((citas) =>{
                return(
                    <ul key={citas.id}>
                        <li>{citas.paciente.nombre}</li>
                        <li>{citas.fecha}</li>
                        <li>{citas.estado}</li>
                        <li>{citas.tratamiento_id}</li>
                    </ul>
                )
            })}
        </div>
    );
}