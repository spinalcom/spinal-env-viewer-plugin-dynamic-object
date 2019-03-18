import { spinalContextMenuService } from "spinal-env-viewer-context-menu-service";
import CreateDynamicContextBtn from './classes/CreateContextButton';
import ZoomBtn from './classes/ZoomButton';
import { CreateDynamicObjectBtn, extentionCreateObjectPanel } from './classes/CreateDynamicObject';
import { CreateGroupDynamicBtm, extentionCreateGroupPanel } from './classes/CreateGroupeObject';
import { CustomDynamicObjectBtn, extentionCustomObjectPanel } from './classes/CustomDynamicObject';
import './extensionForge';
import './extensionCustomTool';

const HeaderBarName = "GraphManagerTopBar";
const sidebarName = "GraphManagerSideBar";

const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");

//spinalContextMenuService.registerApp("myHookName", new SpinalDynamicObjectForgeExtention());
spinalContextMenuService.registerApp(HeaderBarName, new CreateDynamicContextBtn(), [3]);
spinalContextMenuService.registerApp(sidebarName, new CreateGroupDynamicBtm(), [3]);
spinalContextMenuService.registerApp(sidebarName, new CreateDynamicObjectBtn(), [3]);
spinalContextMenuService.registerApp(sidebarName, new CustomDynamicObjectBtn(), [3]);
SpinalForgeExtention.registerExtention("CreateGroupPanel", extentionCreateGroupPanel);
SpinalForgeExtention.registerExtention("CreateObjectPanel", extentionCreateObjectPanel);
SpinalForgeExtention.registerExtention("CustomObjectPanel", extentionCustomObjectPanel);



spinalContextMenuService.registerApp(sidebarName, new ZoomBtn(), [3]);
