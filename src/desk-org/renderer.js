import { createApp } from 'vue'
import App from './App.vue'

import '../utils/spacingjs'

/*
if font-awesome does not work, update vue-fontawesome
*/

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark, faDisplay, faCaretDown, faCaretUp, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faXmark, faDisplay, faCaretDown, faCaretUp, faTrashCan, faPlus)

createApp(App).component('fa-icon', FontAwesomeIcon).mount('#app')