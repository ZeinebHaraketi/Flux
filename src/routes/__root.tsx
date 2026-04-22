import { ClerkProvider } from "@clerk/tanstack-react-start";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Crosshair from "#/components/Crosshair";
import Navbar from "#/components/Navbar";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

type ReactRefreshContext = {
	id: string;
};

type ReactRefreshWindow = Window & {
	__TSR_REACT_REFRESH__?: {
		ignoredExportsById: Map<string, string[]>;
	};
	__getReactRefreshIgnoredExports?: (ctx: ReactRefreshContext) => Array<string>;
};

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

if (import.meta.hot && typeof window !== "undefined") {
	const reactRefreshWindow = window as ReactRefreshWindow;

	const tsrReactRefresh =
		reactRefreshWindow.__TSR_REACT_REFRESH__ ??
		(() => {
			const ignoredExportsById = new Map<string, string[]>();
			const previousGetIgnoredExports =
				reactRefreshWindow.__getReactRefreshIgnoredExports;

			reactRefreshWindow.__getReactRefreshIgnoredExports = (ctx) => {
				const ignoredExports = previousGetIgnoredExports?.(ctx) ?? [];
				const moduleIgnored = ignoredExportsById.get(ctx.id) ?? [];
				return [...ignoredExports, ...moduleIgnored];
			};

			const refreshState = { ignoredExportsById };
			reactRefreshWindow.__TSR_REACT_REFRESH__ = refreshState;
			return refreshState;
		})();

	tsrReactRefresh.ignoredExportsById.set(new URL(import.meta.url).pathname, [
		"Route",
	]);
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Flux - The Repository for Agentic Intelligence",
			},
			{
				name: "description",
				content:
					"Discover, publish, and collaborate on agentic intelligence research and applications.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	notFoundComponent: RootNotFound,
	shellComponent: RootDocument,
});

export function TSRFastRefreshAnchor() {
	return null;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: This inline script sets the theme before hydration to avoid a flash of incorrect color scheme. */}
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased wrap-anywhere">
				<ClerkProvider>
					<div id="root-layout">
						<header>
							<div className="frame">
								<Navbar />
								<Crosshair />
								<Crosshair />
							</div>
						</header>

						<main>
							<div className="frame">{children}</div>
						</main>
					</div>
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				</ClerkProvider>
				<Scripts />
			</body>
		</html>
	);
}

function RootNotFound() {
	return (
		<section className="flex min-h-[50vh] flex-col items-start justify-center gap-4 py-16">
			<p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
				404
			</p>
			<div className="space-y-2">
				<h1 className="text-3xl font-semibold">Page not found</h1>
				<p className="max-w-prose text-muted-foreground">
					The page you requested does not exist or may have moved.
				</p>
			</div>
			<Link
				to="/"
				className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
			>
				Return home
			</Link>
		</section>
	);
}
