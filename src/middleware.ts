import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // O Easypanel (usando Traefik ou Caddy) geralmente repassa o protocolo original
    // através do header X-Forwarded-Proto
    const proto = request.headers.get('x-forwarded-proto');

    // Aplica o redirect apenas em ambiente de produção
    if (
        process.env.NODE_ENV === 'production' &&
        (proto === 'http' || url.protocol === 'http:') &&
        !url.hostname.includes('localhost')
    ) {
        url.protocol = 'https:';
        url.port = ''; // Garante que não repassamos uma porta insegura ao forçar o Https
        return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
}

// Configuração para rodar o middleware apenas nas rotas principais do app
// (ignorando arquivos estáticos, _next interno e API)
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|.*\\.webp|.*\\.png|.*\\.jpg|.*\\.svg).*)',
};
