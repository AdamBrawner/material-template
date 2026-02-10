import { demoMenuItems } from "./NavigationMenu/DemoNavigationMenu";
import UnifyLayout from "./UnifyLayout";

export function DemoLayout() {
	return <UnifyLayout title="Material Demo" menuSections={demoMenuItems} />;
}

export default DemoLayout;
