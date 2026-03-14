import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AccountantPortal from "./pages/portals/AccountantPortal";
import AdminPortal from "./pages/portals/AdminPortal";
import ParentPortal from "./pages/portals/ParentPortal";
import StudentPortal from "./pages/portals/StudentPortal";
import SuperiorPortal from "./pages/portals/SuperiorPortal";
import TeacherPortal from "./pages/portals/TeacherPortal";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.17 0.15 264)",
            border: "1px solid oklch(0.74 0.13 84)",
            color: "oklch(0.98 0 0)",
          },
        }}
      />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const superiorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portal/superior",
  component: SuperiorPortal,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portal/admin",
  component: AdminPortal,
});

const accountantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portal/accountant",
  component: AccountantPortal,
});

const teacherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portal/teacher",
  component: TeacherPortal,
});

const studentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portal/student",
  component: StudentPortal,
});

const parentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portal/parent",
  component: ParentPortal,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  superiorRoute,
  adminRoute,
  accountantRoute,
  teacherRoute,
  studentRoute,
  parentRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
