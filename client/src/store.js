import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        me: {},
        registerResponseStatus: "",
        isLoggedIn: false,
        users: null,
        authStatus: "",
        token: localStorage.getItem("token") || "",
        isDev: false,
        firstLook: false,
        successMessage: ""
    },
    plugins: [
        createPersistedState({
            getState: key => Cookies.getJSON(key),
            setState: (key, state) =>
                Cookies.set(key, state, {
                    expires: 3,
                    secure: false
                })
        })
    ],
    mutations: {
        updateMe(state, me) {
            state.me = me;
        },
        userUsers(state, users) {
            state.users = users;
        },
        authSuccess(state, token) {
            state.authStatus = "success";
            state.token = token;
            state.isLoggedIn = true;
        },
        authError(state) {
            state.authStatus = "error";
        },
        logout(state) {
            state.authStatus = "";
            state.token = "";
            state.me = {};
            state.isLoggedIn = false;
        },
        registerResponse(state, responseStatus, user) {
            state.registerResponseStatus = responseStatus;
            state.me = user.username;
        }
    },
    getters: {
        //isDev: state => (state.isDev = process.env.VUE_APP_ENV === "development"),
        me: state => state.me,
        users: state => state.users,
        isLoggedIn: state => !!state.token,
        isAdmin: state => state.me.account_type === "Admin",
        authStatus: state => state.authStatus,
        registerResponseStatus: state => state.registerResponseStatus,
        successMessage: state => state.successMessage
    },
    actions: {
        getUpdatedMe({
            commit
        }, oldMe) {
            fetch(`/users/getById/${oldMe.user_id}`)
                .then(resp => resp.json())
                .then(resp => {
                    commit("updateMe", resp);
                });
        },
        login({
            commit
        }, me) {

            return new Promise((resolve, reject) => {
                fetch("auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(me)
                    })
                    .then(resp => resp.json())
                    .then(resp => {
                        localStorage.setItem("token", resp.token);
                        commit("updateMe", resp.me);
                        commit("authSuccess", resp.token);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("authError");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        register({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                fetch("auth/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                    .then((response) => {
                        commit("registerResponse", response.status, user)
                    })
                    .then(resolve())
                    .catch(err => {
                        commit("authError", err);
                        reject(err);
                    })

            });
        },
        logout({
            commit
        }) {
            return new Promise(resolve => {
                commit("logout");
                localStorage.removeItem("token");
                resolve();
            });
        }
    }
});
