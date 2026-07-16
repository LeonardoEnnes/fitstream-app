import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    description: string;
    children?: ReactNode; // caso no futuro eu queira passar componentes extras (botoes etc)
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground mt-1">
                    {description}
                </p>
            </div>
            {children && <div>{children}</div>}
        </div>
    );
}