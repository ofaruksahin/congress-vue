import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';
import { API_URL } from '@/common/config';
import { IS_LOADING } from '@/store/action.type';
import router from '@/router';
import store from '@/store';
import { LOGOUT } from '@/store/action.type';


const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL
    },

    setHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${JwtService.getToken()}`;
    },

    purgeHeader() {
        delete Vue.axios.defaults.headers.common["Authorization"];
    },

    post(resource, params) {
        delete Vue.axios.defaults.headers.post["Content-Type"];
        return new Promise((resolve, reject) => {
            store.dispatch(IS_LOADING);
            Vue.axios.post(`${resource}`, params).then((response) => {
                resolve(response.data);
            }).catch((err) => {
                if (!err.response) {
                    const data = {
                        errMessage: 'Api Bağlantı Hatası'
                    };
                    store.dispatch(LOGOUT);
                    router.push({ path: '/' })
                    reject(data);
                } else {
                    const statusCode = err.response.status;
                    if (statusCode === 401) {
                        store.dispatch(LOGOUT)
                        router.push({ path: '/' });
                        reject(err.response.data);
                    } else if (statusCode === 404) {
                        reject(err.response.data);
                    }
                }
            }).finally(() => {
                store.dispatch(IS_LOADING);
            })
        })
    },

    postFile(resource, params) {
        return new Promise((resolve, reject) => {
            store.dispatch(IS_LOADING);
            Vue.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            let formData = this.getFormData(params);
            Vue.axios.post(`${resource}`, formData).then((response) => {
                resolve(response);
            }).catch((err) => {
                if (!err.response) {
                    const data = {
                        errMessage: 'Api Bağlantı Hatası'
                    };
                    store.dispatch(LOGOUT);
                    router.push({ path: '/' })
                    reject(data);
                } else {
                    const statusCode = err.response.status;
                    if (statusCode === 401) {
                        store.dispatch(LOGOUT)
                        router.push({ path: '/' });
                        reject(err.response.data);
                    } else if (statusCode === 404) {
                        reject(err.response.data);
                    }
                }
            }).finally(() => {
                store.dispatch(IS_LOADING);
            })
        })
    },

    getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
}

export default ApiService;