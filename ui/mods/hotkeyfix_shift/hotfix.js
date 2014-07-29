// redefine all the affected KO objects so that the original active_dictionary never updates

active_maps = ko.observable({});

active_dictionary = ko.computed(function () {
    var result = {};

    _.merge(result, squelch_keybinds);

    _.forIn(active_maps(), function (element, key) {
        if (key === 'camera controls')
            return;

        if (input_maps[key]) {
            var partial = input_maps[key].dictionary;
            _.assign(result, partial);
        }
        else
            console.log('could not find input map: ' + key);
    });
    return result;
});

active_dictionary.subscribe(function () {
    Mousetrap.reset();
    Mousetrap.bind(active_dictionary());
});

active_keymap = ko.computed(function () {
    var result = {};

    _.forIn(active_maps(), function (element, key) {
        if (key !== 'camera controls') {
            if (input_maps[key]) {
                var partial = input_maps[key].keymap;
                _.assign(result, partial);
            }
            else
                console.log('could not find input map: ' + key);
        }
    });

    return result;
});

active_actionmap = ko.computed(function () {
    return _.invert(active_keymap());
});

