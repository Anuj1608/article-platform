import { Routes } from "@angular/router";
import { authGuard } from "@/app/core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "articles",
    pathMatch: "full",
  },
  {
    path: "articles",
    loadComponent: () =>
      import("@/app/features/articles/article-list/article-list.component").then(
        (m) => m.ArticleListComponent,
      ),
  },
  {
    path: "articles/create",
    loadComponent: () =>
      import("@/app/features/articles/create-article/create-article.component").then(
        (m) => m.CreateArticleComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: "articles/:id",
    loadComponent: () =>
      import("@/app/features/articles/article-detail/article-detail.component").then(
        (m) => m.ArticleDetailComponent,
      ),
  },
  {
    path: "login",
    loadComponent: () =>
      import("@/app/features/auth/login/login.component").then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("@/app/features/auth/register/register.component").then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: "**",
    redirectTo: "articles",
  },
];
