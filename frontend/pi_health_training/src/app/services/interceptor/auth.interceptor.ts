import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environments";
import { AuthenticationService } from "../security/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Requisição interceptada. URL:', req.url);

        // Ignorar requisições para o endpoint de autenticação
        if (req.url === environment.authentication_api_endpoint) {
            return next.handle(req);
        }

        let authenticatedUser;
        try {
            authenticatedUser = this.authenticationService.getAuthenticatedUser();
        } catch (error) {
            console.error('Erro ao obter usuário autenticado:', error);
            return next.handle(req);
        }

        // Se o usuário ou o token não existirem, segue sem alterações
        if (!authenticatedUser || !authenticatedUser.token) {
            console.warn('Usuário não autenticado ou token ausente.');
            return next.handle(req);
        }

        const token = authenticatedUser.token;

        // Clonar a requisição e adicionar o cabeçalho Authorization
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Cabeçalho Authorization adicionado à requisição.');

        return next.handle(clonedRequest);
    }
}
