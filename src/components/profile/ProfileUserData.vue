<template>
    
    <div v-if="isDataLoading" class="preloader-wrap">
        <div class="preloader" ></div>
    </div>
    
    <div v-else-if="isError">
        Произошла ошибка загрузки данных пользователя
    </div>
    
    <div v-else>
        <dl class="params-table">
            <dt><span class="params-table__text">Полное имя:</span></dt>
            <dd><span class="params-table__text">{{displayName}}</span></dd>
    
            <dt><span class="params-table__text">E-mail:</span></dt>
            <dd><span class="params-table__text">{{email}}</span></dd>
            
            <dt><span class="params-table__text">E-mail верифицирован:</span></dt>
            <dd><span class="params-table__text">{{emailVerified ? 'Да' : 'Нет'}}</span></dd>
            
            <dt><span class="params-table__text">Аккаунт создан:</span></dt>
            <dd><span class="params-table__text">{{createdAt}}</span></dd>
            
            <dt><span class="params-table__text">Последний вход:</span></dt>
            <dd><span class="params-table__text">{{lastLoginAt}}</span></dd>
        </dl>
    </div>
</template>

<script>
    import createUrlService from "../../services/createUrlService";
    import textService from "../../services/textService";

    export default {
        components: {
        },
        
        inject: ['showNotification'],
        
        data() {
            return {
                isDataLoading: false,
                isError: false,

                displayName: null,
                email: null,
                emailVerified: null,
                
                createdAt: null,
                lastLoginAt: null,
            }
        },
        
        computed: {
        },

        methods: {
            async loadUserData() {
                
                this.isDataLoading = true;
                try {
                    const url = createUrlService.userInfo;
                    const response = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({
                            idToken: this.$store.getters.token
                        })
                    });
                    if(!response.ok) {
                        throw new Error('Ошибка загрузки данных');
                    }

                    const responseData = await response.json();
                    if(!responseData || !responseData.users || !responseData.users[0]) {
                        throw new Error('Ошибка загрузки данных');
                    }
                    
                    const userData = responseData.users[0];
                    console.log(userData);

                    this.createdAt = textService.getFormattedTime(+userData.createdAt);
                    this.displayName = userData.displayName;
                    this.email = userData.email;
                    this.emailVerified = userData.emailVerified;
                    this.lastLoginAt = textService.getFormattedTime(+userData.lastLoginAt);

                } catch (err) {
                    this.showNotification(err.message, 'error');
                    this.isError = true;
                } finally {
                    this.isDataLoading = false;
                }
            }
        },

        created() {
            this.loadUserData();
        }
    }
</script>

<style lang="less">
    
    @color: #eff4fd;
    
    .params-table {
        background-color: @color;
        width: 500px;
        max-width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 7px 24px 28px;
        border-radius: 4px;
        
        &__text {
            position: relative;
            top: 7px;
            background-color: @color;
            
            font-size: 13px;
            line-height: 1;
        }
        dt {
            align-self: flex-start;
            padding: 10px 0 0;
            border-bottom: 1px dotted #ccc;
            margin: 0;
            
            
            .params-table__text {
                padding-right: 5px;
            }
        }
        dd {
            align-self: flex-end;
            padding: 10px 0 0 5px;
            margin: 0;
        }
    }
    
    
</style>

