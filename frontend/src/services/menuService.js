import MenuObjectModel from "./menuObjectModel";

const menuObjectService = [
	new MenuObjectModel("Real", "fa-person-booth", "/realcomics"),
	new MenuObjectModel("Animated", "si-gitbook", "/animatedcomics"),
	new MenuObjectModel("Earn Money", "gi-take-my-money", "/earnmoney"),
	new MenuObjectModel("Login", "md-login", "/login"),
	new MenuObjectModel("Sing up", "md-newlabel-twotone", "/signup")
]

export default menuObjectService;