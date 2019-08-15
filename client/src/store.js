import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        me: {},
        unit:{},
        registerResponseStatus: "",
        isLoggedIn: false,
        users: null,
        authStatus: "",
        token: localStorage.getItem("token") || "",
        isDev: false,
        firstLook: false,
        successMessage: "",
        kids: []
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
        updateKids(state,kids){
            state.kids = kids
        },
        updateUnit(state, unit){
            state.unit = unit
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
            state.unit = {};
            state.isLoggedIn = false;
            state.kids = [];
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
        successMessage: state => state.successMessage,
        kids: state => state.kids,
        unit: state=> state.unit
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
                //alert(JSON.stringify(me))
                fetch("auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(me)
                    })
                    .then(resp => resp.json())
                    .then(resp => {
                        //alert(resp.me)
                        localStorage.setItem("token", resp.token);
                        commit("updateMe", resp.me);
                        commit("authSuccess", resp.token);
                        if (resp.me.unit_ID !== "000000000000000000000000") {
                            //alert(resp.me.unit_ID);
                            this.dispatch("getUpdatedUnit", resp.me.unit_ID);
                        }
                        
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
        },
        getKids({commit}){
            return new Promise((resolve,reject)=>{
                fetch("auth/kids/"+this.$store.getters.me._id)
                    .then(resp => resp.json())
                    .then((resp) => {
                        commit("updateKids", resp.kids)
                    })
                    .then(resolve())
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        getUpdatedUnit({
            commit
        }, oldUnit) {
            //alert(oldUnit);
            fetch(`unit/${oldUnit}`)
                .then(resp => resp.json())
                .then(resp => {
                    //alert(resp.unit);
                    commit("updateUnit", resp.unit);
                    
                });
        }
    }
});
