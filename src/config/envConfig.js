"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getConfigFromEnvironment(sourceEnv) {
    const config = {
        DB_HOST: sourceEnv.ROS_SUPERVISOR_DB_HOST,
        DB_PORT: sourceEnv.ROS_SUPERVISOR_DB_PORT,
        DB_NAME: sourceEnv.ROS_SUPERVISOR_DB_NAME,
        DB_USER: sourceEnv.ROS_SUPERVISOR_DB_USER,
        DB_PASSWORD: sourceEnv.ROS_SUPERVISOR_DB_PASSWORD,
    };
    return config;
}
exports.default = getConfigFromEnvironment;
