import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Detalle } from './pages/detalle/detalle';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'detalle/:id',
        component: Detalle
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'registro',
        component: Registro
    },
    {
        path: '**',
        redirectTo: ''
    }
];
