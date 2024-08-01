import St from 'gi://St';

import {Extension, gettext as _, ngettext, pgettext} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';


export default class ExampleExtension extends Extension {
    enable() {
        // Create a panel button
        this._indicator = new PanelMenu.Button(0.1, this.metadata.name, false);

        // Add an icon
        const icon = new St.Icon({
            icon_name: 'face-laugh-symbolic',
            style_class: 'system-status-icon',
        });
        this._indicator.add_child(icon);

        // Add the indicator to the panel
        Main.panel.addToStatusArea(this.uuid, this._indicator);

        // A string needing more context is marked with `pgettext()`
        this._indicator.menu.addAction(pgettext('menu item', 'Notify'), () => {
            this._count += 1;

            // A regular translatable string is marked with the `_()` function
            const title = _('Notification');

            // A "countable" string is marked with the `ngettext()` function
            const body = ngettext('You have been notified %d time',
                'You have been notified %d times',
                this._count).format(this._count);

            Main.notify(title, body);
        });

        this._count = 0;
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
    }
}
