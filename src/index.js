import VueBScroll from 'components/BScroll';
// import merge from './utils/merge';

const version = '2.2.13';
const install = function(Vue) {
    if (install.installed) return;
    Vue.component(VueBScroll.name, VueBScroll);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    install,
    version,
    VueBScroll
};
