import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import ToastPlugin from "vue-toast-notification";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  HiEyeOff,
  HiEye,
  SiSuperuser,
  SiGitbook,
  CoAccountLogout,
  RiAccountPinCircleFill,
  FaPersonBooth,
  MdLogin,
  MdNewlabelTwotone,
  RiMenuFill,
  MdCloseSharp,
  HiInformationCircle,
  BiCheckCircleFill,
  BiXCircleFill,
  GiTakeMyMoney,
  PrUpload,
  MdBookmarkaddRound,
  CoOptions,
  MdNavigatenext,
  MdSkipnext,
  MdNavigatebefore,
  MdSkipprevious 
} from "oh-vue-icons/icons";
addIcons(
  HiEyeOff,
  HiEye,
  SiSuperuser,
  SiGitbook,
  CoAccountLogout,
  RiAccountPinCircleFill,
  FaPersonBooth,
  MdLogin,
  MdNewlabelTwotone,
  RiMenuFill,
  MdCloseSharp,
  HiInformationCircle,
  BiCheckCircleFill,
  BiXCircleFill,
  GiTakeMyMoney,
  PrUpload,
  MdBookmarkaddRound,
  CoOptions,
  MdNavigatenext,
  MdSkipnext,
  MdNavigatebefore,
  MdSkipprevious
);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ToastPlugin, {
  position: "top",
  duration: 3000,
  dismissible: true,
});

app.component("v-icon", OhVueIcon);

app.mount("#app");
