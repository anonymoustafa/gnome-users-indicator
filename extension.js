const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

let panelButton;

function init() {
}

function enable() {
    panelButton = new St.Bin({
        style_class: 'panel-button'
    });
    let label = new St.Label({
        text: "Hello, World!",
        y_align: St.Align.MIDDLE
    });
    panelButton.set_child(label);
    Main.panel._rightBox.insert_child_at_index(panelButton, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(panelButton);
}
