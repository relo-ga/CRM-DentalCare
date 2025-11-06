'use client'

import { getUsuarios } from "@/api/usuarios"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { logout, restoreSesion } from "@/store/slices/authSlice"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CitasUsuarioDashboard } from "@/components/CitasUsuario"
import CitasDoctor from "@/components/CitasDoctor"

export default function DashboardPage() {
    // este user y token vienen de authSlice
    const {user, token } = useAppSelector((s) => s.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {data, isLoading, error} = useQuery({
        queryKey: ['usuarios'],
        queryFn: getUsuarios,
        enabled: !!token,
    });

    useEffect(() => {
        dispatch(restoreSesion());
        if(!user?.rol) router.push('/');
    },[user?.rol, router,dispatch]);

    return(
        <div className="p-6">
            <h1 className="text-xl font-semibold">Bienvenido, {user?.nombre}</h1>
            <button
                onClick={() => {
                    dispatch(logout());
                    router.push('/');
                }}
                className="bg-red-500 text-white px-3 py-2 rounded my-3"
            >
                Cerrar sesión
            </button>

            <h2 className="text-lg mb-2">Usuarios:</h2>
            {isLoading && <p>Cargando...</p>}
            {error && <p>Error al cargar usuarios.</p>}

            <ul className="list-disc pl-5">
                {data?.map((u) => (
                <li key={u.id}>
                    {u.nombre} — {u.email} - {u.rol}
                </li>
                ))}
            </ul>
            
            { user?.rol== "DOCTOR" && <CitasUsuarioDashboard usuario={user} />}
            { user?.rol== "DOCTOR" && <CitasDoctor dataUsuario={user} />}
            
            
        </div>
    )

}

 