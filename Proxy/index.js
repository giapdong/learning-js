// Reference VueDay2019 - Reactive in vuejs with Proxy
// Keyword: reactive in vuejs

// Creator: giapdong

let watchingFunc = null;

function observe(data) {
    const depends = {};

    return new Proxy(data, {
        get(obj, key) {
            if (watchingFunc) {
                if (!depends[key]) depends[key] = [];
                depends[key].push(watchingFunc);
            }
            return obj[key]
        },
        set(obj, key, value) {
            obj[key] = value;
            if (depends[key]) {
                depends[key].forEach(callback => callback());
            }
        }
    })
}

function watcher(target) {
    watchingFunc = target;
    target();
    watchingFunc = null;
}

const data = observe({
    dinnerPrice: 100,
    tip: 10,
    total: 0
})

watcher(() => {
    data.total = data.dinnerPrice + data.tip + data.tip2 + data.tip3;
})

watcher(function render() {
    console.log(`price: ${data.dinnerPrice} tip: ${data.tip} total: ${data.total}`)
})

/**
 * 
 * data.tip => data.total
 * data.tip => render()
 * 
 * data.dinerPrice => data.total
 * data.dinerPrice => render()
 * 
 * data.total => render()
 * 
 */

data.tip = 20;
data.dinnerPrice = 200;
data.tip = 50;


