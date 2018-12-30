import { remote } from "electron";

export function addContextMenu() {
    let rightClickPosition: {
        x: number;
        y: number;
    };

    const menu = new remote.Menu();
    const menuItem = new remote.MenuItem({
        label: "Inspect Element",
        click: () => {
            remote
                .getCurrentWindow()
                .webContents.inspectElement(
                    rightClickPosition.x,
                    rightClickPosition.y
                );
        },
    });
    menu.append(menuItem);

    window.addEventListener(
        "contextmenu",
        e => {
            e.preventDefault();
            rightClickPosition = { x: e.x, y: e.y };
            menu.popup(remote.getCurrentWindow() as any);
        },
        false
    );
}
