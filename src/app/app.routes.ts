import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { ArticlesPageComponent } from './pages/articles-page/articles-page.component';
import { ChatsPageComponent } from './pages/chats-page/chats-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ModifyUserPageComponent } from './pages/modify-user-page/modify-user-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { SavedArticlePageComponent } from './pages/saved-article-page/saved-article-page.component';
import { CreateNewArticlePageComponent } from './pages/create-new-article-page/create-new-article-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent, title:'Home' },
    { path: 'profile/:id', component: ProfilePageComponent , title:'Profile' },
    { path: 'article/:id', component: ArticlePageComponent, title:'Article' },
    { path: 'saved/:id', component: SavedArticlePageComponent, title:'Saved' },
    { path: 'chats/:id', component:  ChatsPageComponent, title:'Chats' },
    { path: 'new', component:  CreateNewArticlePageComponent, title:'New article' },
    { path: 'articles', component: ArticlesPageComponent , title:'Articles'},
    { path: 'users', component: UsersPageComponent, title:'Users'},
    { path: 'login', component: LoginPageComponent , title:'Login' },
    { path: 'register', component: RegisterPageComponent , title: 'Register' },
    { path: 'forgot-password', component: ForgotPasswordPageComponent , title:'Forgot Password' },
    { path: 'modify/:id', component: ModifyUserPageComponent, title:'Modify User' },
    { path: '', redirectTo: 'home' ,pathMatch: "full" },
    { path: '**', component: ErrorPageComponent },
];
