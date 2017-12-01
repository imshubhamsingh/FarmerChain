const env = process.env;

export const nodeEnv = env.NODE_ENV || 'developement';

export default {
    port : env.PORT || '3030',
    host: env.HOST || '0.0.0.0',
    get serverUrl(){
        return `http://${this.host}:${this.port}`;
    }
};