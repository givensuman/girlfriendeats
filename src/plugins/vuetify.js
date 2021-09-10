import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#9c27b0',
                secondary: '#673ab7',
                accent: '#e91e63',
                error: '#f44336',
                warning: '#ff9800',
                info: '#3f51b5',
                success: '#8bc34a'
            }
            
        },
      },
});
