'use client';

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginRequest, LoginData } from "@/api/auth";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { Smile } from "lucide-react";

export const LoginForm = () => {
    const [form, setForm] = useState<LoginData>({email: '', password: ''});
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { mutate, isPending, error } = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            dispatch(loginSuccess({ user: data.user, token: data.access_token }));
            router.push('/dashboard')
        },
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
        setForm({ ...form, [e.target.name ]: e.target.value });
    
    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center mb-8">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Smile className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                DentalCare
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                Sistema de Gestión Clínica
                </p>

                <form onSubmit={ (e) => {
                        e.preventDefault();
                        mutate(form);
                    }} className="space-y-6">
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                    Error: {(error as Error).message}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                    </label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contraseña
                    </label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>
                <button
                    disabled = { isPending }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    { isPending ? 'Cargando...': 'Iniciar Sesion'}
                </button>
                </form>
            </div>
        </div>
    )
}