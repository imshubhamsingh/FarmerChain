const env = process.env;

export const nodeEnv = env.NODE_ENV || 'developement';

export default {
    port : env.PORT || '3032',
    host: env.HOST || '127.0.0.1',
    get serverUrl(){
        return `http://${this.host}:${this.port}`;
    }
};