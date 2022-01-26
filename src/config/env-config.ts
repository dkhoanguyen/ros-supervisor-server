export type Env = {
    ROS_SUPERVISOR_DB_HOST: string,
    ROS_SUPERVISOR_DB_PORT: string,
    ROS_SUPERVISOR_DB_NAME: string,
    ROS_SUPERVISOR_DB_USER: string,
    ROS_SUPERVISOR_DB_PASSWORD: string,
};

export type Config = {
    DB_HOST: string,
    DB_PORT: string,
    DB_NAME: string,
    DB_USER: string,
    DB_PASSWORD: string,
}

export default function getConfigFromEnvironment(sourceEnv: Partial<Env>): Config {
    const config: Partial<Config> = {
        DB_HOST: sourceEnv.ROS_SUPERVISOR_DB_HOST,
        DB_PORT: sourceEnv.ROS_SUPERVISOR_DB_PORT,
        DB_NAME: sourceEnv.ROS_SUPERVISOR_DB_NAME,
        DB_USER: sourceEnv.ROS_SUPERVISOR_DB_USER,
        DB_PASSWORD: sourceEnv.ROS_SUPERVISOR_DB_PASSWORD,
    }
    return config as Config
}