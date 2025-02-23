interface RouteParams {
	route: string;
	title: string;
}

export const routeHeader: RouteParams[] = [
	{
		title: "Developer",
		route: "chat-engine",
	},
	{
		title: "Maze Game",
		route: "maze-game"
	},
	{
		title: "Translator",
		route: "translator"
	},
	{
		title: "TestPage",
		route: "test-page"
	}
]

export const headerLinks = new Set(["chat-engine", "translator"]);