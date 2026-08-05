import { Navigate, Route, Routes } from "react-router-dom";
import { NutritionPage } from "../../features/nutrition/nutritionPage";
import { Dashboard } from "../../features/dashboard/dashboardPage";
import { WorkoutsPage } from "../../features/workout/WorkoutsPage";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/nutricao" element={<NutritionPage />} />
            <Route path="/treinos" element={<WorkoutsPage />} />
        </Routes>
    )

}