import { createBrowserRouter } from "react-router-dom";
import Layout from "./componets/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./componets/ProtectedRoute";
import PacientesPage from "./pages/PacientesPage";
import MedicosPage from "./pages/MedicosPage";
import ConsultasPage from "./pages/ConsultasPage";
import ReceitasPage from "./pages/ReceitasPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <Layout />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />
                    },
                    {
                        path: "/pacientes",
                        element: <PacientesPage />
                    },
                    {
                        path: "/medicos",
                        element: <MedicosPage />
                    },
                    {
                        path: "/consultas",
                        element: <ConsultasPage />
                    },
                    {
                        path: "/receitas",
                        element: <ReceitasPage />
                    }
                ]
            }
        ]
    }
]);