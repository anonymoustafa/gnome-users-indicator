import GObject from 'gi://GObject';
import St from 'gi://St';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Hello World Indicator'));

        // Add a label with "Hello World" text
        this.label = new St.Label({
            text: 'Hello World',
            style_class: 'hello-world-label',  // Assign a style class
        });
        this.add_child(this.label);

        // Popup menu items
        this._buildMenu();
    }

    _buildMenu() {
        // First menu item
        let showNotificationItem = new PopupMenu.PopupMenuItem(_('Show Notification'));
        showNotificationItem.connect('activate', () => {
            Main.notify(_('Hello from your GNOME extension!'));
        });
        this.menu.addMenuItem(showNotificationItem);

        // Second menu item
        let updateTextItem = new PopupMenu.PopupMenuItem(_('Update Text'));
        updateTextItem.connect('activate', () => {
            this.label.set_text(_('Updated Hello World!'));
        });
        this.menu.addMenuItem(updateTextItem);

        // Separator
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        // Quit menu item
        let quitItem = new PopupMenu.PopupMenuItem(_('Quit'));
        quitItem.connect('activate', () => {
            this._quit();
        });
        this.menu.addMenuItem(quitItem);
    }

    _quit() {
        // Add logic for quitting the extension or cleaning up
        Main.notify(_('Quitting...'));
        // Here you could do more cleanup if necessary
    }
});

// Export the extension for GNOME Shell
export default class MyExtension extends Extension {
    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

